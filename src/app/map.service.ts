import { Injectable } from '@angular/core';
import mapboxgl, { Marker } from 'mapbox-gl';
import { environment } from "../environments/environment";
import SENSOR_DATA from '../assets/sensors.json';
import { fromEvent } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';
import CheapRuler, { Point } from 'cheap-ruler';
import TYPHOON_PATH from '../assets/typhoon-path.json';
import * as turf from '@turf/turf';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 27.296997030678092;
  lng = 138.72896087442456;
  zoom = 5;
  graphShown = false;

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    fromEvent(this.map, 'load')
      .subscribe(() => {
        this._handleTyphoonPath();
      });
  }

  showDataPoints() {
    const graphDiv = document.getElementById("graph-dom");
    let popUp = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false
    })

    this.map.addLayer({
      id: 'sensors-bbsddb',
      type: 'circle',
      source: {
        type: 'vector',
        url: 'mapbox://jadurani.asse9xyo',
      },
      'source-layer': 'sensors-bbsddb',
      paint: {
        'circle-color': '#4264fb',
        'circle-radius': 6,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#ffffff'
      }
    });

    const _this = this;
    this.map.on('mouseover', 'sensors-bbsddb', (e) => {

       _this.map.getCanvas().style.cursor = 'pointer';

      const coordinates = (e.features[0].geometry as any).coordinates.slice();
      const location = e.features[0].properties.location;
      const stationID = e.features[0].properties.station_id;
      const rainValueSum = e.features[0].properties.rain_value_sum;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      popUp.setLngLat(coordinates).setHTML(
        `
          <div style="color: #333333;">
            <div><strong>#${stationID} - ${location}</strong></div>
            <div>Rain Value Sum: ${rainValueSum}</div>
          </div>
        `
      ).addTo(_this.map);
    });

    this.map.on('click', 'sensors-bbsddb', function(e) {
      graphDiv.hidden = false;
      _this.map.flyTo({
        center: (e.features[0].geometry as any).coordinates.slice(),
        zoom: 11,
        essential: true,
      });

      popUp
        .setDOMContent(graphDiv)
        .setMaxWidth("900px");

      _this.graphShown = true;
    });

    popUp.on('close', () => _this.graphShown = false);

    this.map.on('mouseleave', 'sensors-bbsddb', function() {
      if (_this.graphShown) return;

      _this.map.getCanvas().style.cursor = '';
      popUp.remove();
    });

  }

  getData(stationId: string): Promise<Sensor> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('noahweb:noaHw3b1116')}`
      })
    }

    return this.http.get<Sensor>(
      `https://philsensors.asti.dost.gov.ph/api/data?station_id=${stationId}`,
      httpOptions
    ).pipe(first()).toPromise();
  }

  private _handleTyphoonPath() {
    const pointsAndPolygons = TYPHOON_PATH.features.map (feature => {
      const lng = feature.geometry.coordinates[0];
      const lat = feature.geometry.coordinates[1];
      const errorRadiusDeg = feature.properties.radius;

      // const ruler = new CheapRuler(lat, 'nauticalmiles');
      // const errorRadiusKm = ruler.distance([lng, lat], [lng + errorRadiusDeg, lat]);
      // console.log({lat, ruler, errorRadiusDeg, errorRadiusKm});
      const circle = turf.circle([lng, lat], errorRadiusDeg, {steps: 32, units: 'kilometers'});

      return {
        circle,
        errorRadius: errorRadiusDeg,
        coords: feature.geometry.coordinates as Point
      }
    });


    const fc = turf.featureCollection(pointsAndPolygons.map(pp => pp.circle));

    // let combinedCircles = pointsAndPolygons[0].circle as any;
    // for (let i=1; i<pointsAndPolygons.length; i++) {
    //   combinedCircles = turf.union(combinedCircles, pointsAndPolygons[i].circle);
      // var fc = turf.featureCollection([
      //   turf.point([19.026432, 47.49134]),
      //   turf.point([19.074497, 47.509548])
      // ]);

      // var combined = turf.combine(fc);
    // }

    // console.log(JSON.stringify(combinedCircles))
    // console.log(JSON.stringify(fc));
    this.map.addLayer({
      id: 'circles',
      type: 'fill',
      source: {
        type: 'geojson',
        data: fc,
      },
      paint: {
        'fill-color': '#000000',
        'fill-opacity': 0.4,
      }
    });

    const polygons = [];

    pointsAndPolygons.forEach((pp, index) => {
      if (index + 1 >= pointsAndPolygons.length) return;
      const currentPoint = pp.coords;
      const nextPP = pointsAndPolygons[index + 1];
      const nextPoint = nextPP.coords;
      const errorRadius = pp.errorRadius;

      const ruler = new CheapRuler(currentPoint[1], 'kilometers');
      let bearing = ruler.bearing(currentPoint, nextPoint);
      let p1 = ruler.destination(nextPoint, errorRadius, bearing + 90);
      const radius = index === 0 ? errorRadius : pointsAndPolygons[index - 1].errorRadius
      let p2 = ruler.destination(currentPoint, radius, bearing + 90);
      let p3 = ruler.destination(currentPoint, radius, bearing - 90);
      let p4 = ruler.destination(nextPoint, errorRadius, bearing - 90);
      const polygon = turf.polygon([[p1, p2, p3, p4, p1]]);
      polygons.push(polygon);
    });


    const maw = polygons.concat(...pointsAndPolygons.map(pp => pp.circle))
    let polygonUnion = maw[0] as any;
    for (let i = 1; i < maw.length; i++) {
      polygonUnion = turf.union(polygonUnion, maw[i]);
    }

    console.log({polygonUnion});


    this.map.addLayer({
      id: 'typhoon-path',
      type: 'fill',
      source: {
        type: 'geojson',
        data: polygonUnion
      },
      paint: {
        'fill-outline-color': '#6e6e6e',
        'fill-color': '#ffffff',
        'fill-opacity': 0.4,
      }
    })
  }
}

type Sensor = {
  dev_id: number;
  location: string;
  barangay: string | null;
  municipality: string;
  congressional: string;
  province: string;
  region: string;
  latitude: string;
  longitude: string;
  elevation: string;
  type_name: string;
  status_description: string;
  date_installed: string;
  data: SensorData[];
}

type SensorData = {
  air_pressure: string | number;
  dateTimeRead: string;
  rain_cum: string | number;
  rain_value: string | number;
}
