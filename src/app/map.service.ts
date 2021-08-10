import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
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
    })
   this.map.addControl(new mapboxgl.NavigationControl());

   fromEvent(this.map, 'load')
    .subscribe(() => {
      this.showDataPoints();
    })
  }

  showDataPoints() {
    const _this = this;
    SENSOR_DATA .features.forEach(function (marker) {
      // create a HTML element for each feature
      // const el = document.createElement('div');
      // el.className = 'marker';

      // make a marker for each feature and add to the map
      // new mapboxgl.Marker()
      //   .setLngLat(marker.geometry.coordinates as [number, number])
      //   .addTo(_this.map);
      // console.log(marker);
      new mapboxgl.Marker()
        .setLngLat(marker.geometry.coordinates as [number, number])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `
          <div>
            <div>#${marker.properties.station_id} - ${marker.properties.location}</div>
            <small>Rain Value Sum: ${marker.properties.rain_value_sum}</small>
          </div>
        `
          )
        )
        .addTo(_this.map);
    });
  }

}
