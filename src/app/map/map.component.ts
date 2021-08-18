import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public options: any = {
    chart: {
      type: 'spline',
    },
    title: {
      text: `#${SAMPLE_DATA.dev_id} - ${SAMPLE_DATA.location}`
    },
    credits: {
      enabled: false
    },

    xAxis: {
      categories: SAMPLE_DATA.data.map(d => d.dateTimeRead)

    },
    series: [
         {
            name: 'Rain Cumulative',
            data: SAMPLE_DATA.data.map(d => +d.rain_cum)
         },
         {
            name: 'Air Pressure',
            data: SAMPLE_DATA.data.map(d => +d.air_pressure)
         },
         {
            name: 'Rain Value',
            data: SAMPLE_DATA.data.map(d => +d.rain_value)
         },
      ]
  }

  constructor(private map: MapService) { }

  ngOnInit() {
    this.map.buildMap();
    Highcharts.chart('graph-dom', this.options);
  }

}


const SAMPLE_DATA = {
  "dev_id": 166,
  "location": "PALAWAN STATE UNIVERSITY-QUEZON",
  "barangay": null,
  "municipality": "QUEZON",
  "congressional": "Palawan District 2",
  "province": "Palawan",
  "region": "4-B",
  "latitude": "9.446230",
  "longitude": "118.392942",
  "elevation": "0",
  "type_name": "Rain2",
  "status_description": "OPERATIONAL",
  "date_installed": "2012-04-29",
  "data": [
      {
          "dateTimeRead": "2021-08-18 16:00:04",
          "rain_cum": "0.0",
          "air_pressure": "1005.43",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 15:45:04",
          "rain_cum": "0.0",
          "rain_value": "0.0",
          "air_pressure": "1005.48"
      },
      {
          "dateTimeRead": "2021-08-18 15:30:04",
          "air_pressure": "1005.64",
          "rain_cum": "0.0",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 15:15:04",
          "air_pressure": "1005.47",
          "rain_cum": "0.0",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 15:00:04",
          "rain_value": "0.0",
          "rain_cum": "0.0",
          "air_pressure": "1005.7"
      },
      {
          "dateTimeRead": "2021-08-18 14:45:04",
          "air_pressure": "1005.86",
          "rain_value": "0.0",
          "rain_cum": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 14:30:04",
          "rain_cum": "0.0",
          "air_pressure": "1006.09",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 14:15:04",
          "rain_cum": "0.0",
          "air_pressure": "1006.21",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 14:00:04",
          "rain_cum": "0.0",
          "air_pressure": "1006.28",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 13:45:03",
          "air_pressure": "1006.43",
          "rain_value": "0.0",
          "rain_cum": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 13:30:04",
          "rain_value": "0.0",
          "rain_cum": "0.0",
          "air_pressure": "1006.38"
      },
      {
          "dateTimeRead": "2021-08-18 13:15:04",
          "air_pressure": "1006.72",
          "rain_cum": "0.0",
          "rain_value": "0.0"
      }
  ]
};
