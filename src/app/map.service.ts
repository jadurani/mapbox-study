import { Injectable } from '@angular/core';
import mapboxgl, { Marker } from 'mapbox-gl';
import { environment } from "../environments/environment";
import SENSOR_DATA from '../assets/sensors.json';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 12.599512;
  lng = 120.984222;
  zoom = 5;

  constructor() {
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
      this.showDataPoints();
    })
  }

  showDataPoints() {
    const graphDiv = document.getElementById("graph-dom");
    let popUp = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })
    // .setDOMContent(graphDiv);

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
    })



    const _this = this;
    // SENSOR_DATA.features.forEach((marker) => {
    //   const newMarker: Marker = new mapboxgl.Marker()
    //     .setLngLat(marker.geometry.coordinates as [number, number])
    //     .addTo(_this.map);
    // });




    this.map.on('mouseover', 'sensors-bbsddb', (e) => {

       _this.map.getCanvas().style.cursor = 'pointer';

      const coordinates = (e.features[0].geometry as any).coordinates.slice();
      const location = e.features[0].properties.location;
      const stationID = e.features[0].properties.station_id;
      const rainValueSum = e.features[0].properties.rain_value_sum;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      console.log(e)

      //  console.log('hello', new Date().getTime());
      //  newMarker.setPopup(popUp)
      popUp.setLngLat(coordinates).setHTML(
        `
          <div>
            <div>#${stationID} - ${location}</div>
            <small>Rain Value Sum: ${rainValueSum}</small>
          </div>
        `
      ).addTo(_this.map);
    // newMarker.on('click', () => console.log('click'));
    });

    this.map.on('mouseleave', 'sensors-bbsddb', function() {
      _this.map.getCanvas().style.cursor = '';
      popUp.remove();
    });

  }
}
