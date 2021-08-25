import { Injectable } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from "../environments/environment";
import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators'
import * as Highcharts from 'highcharts';
import { SensorApiService } from './sensor-api.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 14.351555328261005;
  lng = 121.0537785476316;
  zoom = 12;
  // lat = 12.599512;
  // lng = 120.984222;
  // zoom = 5;
  graphShown = false;

  sensorLayers = [];

  constructor(private sensorApi: SensorApiService) {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });

   this.map.addControl(new mapboxgl.NavigationControl());

  //  fromEvent(this.map, 'load')
  //   .subscribe(() => {
  //     this.showDataPoints();
  //   })
  }

  /**
   * Adds both source and layer to the map
   */
  addSensorLayer(sensorType: string, data: GeoJSON.FeatureCollection<GeoJSON.Geometry>) {
    // this.map.addSource(sensorType, );
    this.map.addLayer({
      id: sensorType,
      type: 'circle',
      source: {
        type: 'geojson',
        data
      },
      paint: {
        'circle-color': 'red',
        'circle-radius': 6,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#ffffff'
      }
    });

    this.sensorLayers.push(sensorType);
    this.showDataPoints(sensorType);
  }

  showDataPoints(sensorLayer: string) {
    const graphDiv = document.getElementById("graph-dom");
    let popUp = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false
    })

    // this.map.addLayer({
    //   id: 'sensors-bbsddb',
    //   type: 'circle',
    //   source: {
    //     type: 'vector',
    //     url: 'mapbox://jadurani.asse9xyo',
    //   },
    //   'source-layer': 'sensors-bbsddb',
    //   paint: {
    //     'circle-color': '#4264fb',
    //     'circle-radius': 6,
    //     'circle-stroke-width': 1,
    //     'circle-stroke-color': '#ffffff'
    //   }
    // });
    const _this = this;
    this.map.on('mouseover', sensorLayer, (e) => {
      console.log(e);
       _this.map.getCanvas().style.cursor = 'pointer';

      const coordinates = (e.features[0].geometry as any).coordinates.slice();
      const location = e.features[0].properties.location;
      const stationID = e.features[0].properties.station_id;
      const typeName = e.features[0].properties.type_name;
      const status = e.features[0].properties.status_description;
      const dateInstalled = e.features[0].properties.date_installed;
      const province = e.features[0].properties.province;


      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      popUp.setLngLat(coordinates).setHTML(
        `
          <div style="color: #333333;">
            <div><strong>#${stationID} - ${location}</strong></div>
            <div>Type: ${typeName}</div>
            <div>Status: ${status}</div>
            <div>Date Installed: ${dateInstalled}</div>
            <div>Province: ${province}</div>
          </div>
        `
      ).addTo(_this.map);
    });

    this.map.on('click', sensorLayer, function(e) {
      graphDiv.hidden = false;
      _this.map.flyTo({
        center: (e.features[0].geometry as any).coordinates.slice(),
        zoom: 11,
        essential: true,
      });

      const stationID = e.features[0].properties.station_id;
      const location = e.features[0].properties.location;
      const pk = e.features[0].properties.pk;

      popUp
        .setDOMContent(graphDiv)
        .setMaxWidth("900px");

      _this.showChart(+pk, location, sensorLayer)

      _this.graphShown = true;
    });

    popUp.on('close', () => _this.graphShown = false);

    this.map.on('mouseleave', sensorLayer, function() {
      if (_this.graphShown) return;

      _this.map.getCanvas().style.cursor = '';
      popUp.remove();
    });
  }

  showChart(stationID: number, location: string, sensorType: string) {
    const options: any = {
      chart: {
        type: 'area',
      },
      title: {
        text: `#${stationID} - ${location}`
      },
      credits: {
        enabled: false
      },
      yAxis: {
        alignTicks: false,
        tickInterval: 0.5,
      },
      series: [
        {
          name: 'Waterlevel',
          data: []
        },
      ]
    }

    const chart = Highcharts.chart('graph-dom', options)
    chart.showLoading();

    this.sensorApi.getSensorData(stationID)
      .pipe(first())
      .toPromise()
      .then((response: any) => {
        chart.hideLoading()
        // chart.series.push({
        //   name: 'Waterlevel',
        //   data: response.results.map(d => +d.waterlevel)
        // })
        chart.series[0].setData(response.results.map(d => +d.waterlevel), true);

        // chart.addAxis({
        //   categories: response.results.map(d => d.dateTimeRead),
        //   tickInterval: 10,
        // }, true, true);

        // chart.xAxis[0].setCategories(response.results.map(d => d.dateTimeRead))
        chart.xAxis[0].update({
          categories: response.results.map(d => d.dateTimeRead),
          tickInterval: 2
        }, true)
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
