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
      height: 700
    },
    title: {
      text: 'Monthly Average Temperature'
    },
    credits: {
      enabled: false
    },

    xAxis: {
      categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    },
    series: [
         {
            name: 'Ahmedabad',
            data: [3.0, 15.9, 19.5, 16.5, 25.2, 21.5, 25.2,26.5, 23.3, 18.3, 13.9, 9.6]
         },
         {
            name: 'Nadiad',
            data: [5.2, 2.8, 5.7, 11.3, 17.0, 22.0, 24.8,24.1, 20.1, 14.1, 8.6, 2.5]
         },
         {
            name: 'Surat',
            data: [4.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
         },
         {
            name: 'Mumbai',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
         }
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
