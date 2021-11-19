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
      // type: 'area',
      type: 'spline',
    },
    title: {
      text: `#${SAMPLE_DATA_2.dev_id} - ${SAMPLE_DATA_2.location}`
    },
    credits: {
      enabled: false
    },

    xAxis: {
      categories: SAMPLE_DATA_2.data.map(d => d.dateTimeRead),
      tickInterval: 10,
    },
    yAxis: {
      plotBands: [
        {
          from: 1000,
          to: 1002.5,
          color: 'rgba(68, 170, 213, 0.1)',
          label: {
            text: 'Light air',
            style: {
              color: '#606060'
            }
          }
        },
      ],
    },
    series: [
         {
            name: 'Rain Cumulative',
            data: SAMPLE_DATA_2.data.map(d => +d.rain_cum)
         },
        //  {
        //     name: 'Air Pressure',
        //     data: SAMPLE_DATA_2.data.map(d => +d.air_pressure)
        //  },
         {
            name: 'Rain Value',
            data: SAMPLE_DATA_2.data.map(d => +d.rain_value)
         },
      ]
  }

  constructor(private map: MapService) { }

  ngOnInit() {
    this.map.buildMap();
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


const SAMPLE_DATA_2 = {
  "dev_id": 792,
  "location": "GUIMBA TOWN HALL",
  "barangay": "",
  "municipality": "GUIMBA",
  "congressional": "Nueva Ecija District 1",
  "province": "Nueva Ecija",
  "region": "3",
  "latitude": "15.66",
  "longitude": "120.767194",
  "elevation": "0",
  "type_name": "Rain2",
  "status_description": "OPERATIONAL",
  "date_installed": "2013-07-31",
  "data": [
      {
          "dateTimeRead": "2021-08-18 18:00:06",
          "rain_cum": "1.2",
          "rain_value": "0.0",
          "air_pressure": "1005.52"
      },
      {
          "dateTimeRead": "2021-08-18 17:50:06",
          "rain_cum": "1.2",
          "air_pressure": "1005.45",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 17:40:07",
          "rain_cum": "1.2",
          "air_pressure": "1005.56",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 17:30:06",
          "air_pressure": "1005.42",
          "rain_value": "0.0",
          "rain_cum": "1.2"
      },
      {
          "dateTimeRead": "2021-08-18 17:20:06",
          "air_pressure": "1005.18",
          "rain_value": "0.0",
          "rain_cum": "1.2"
      },
      {
          "dateTimeRead": "2021-08-18 17:10:06",
          "air_pressure": "1005.07",
          "rain_value": "0.2",
          "rain_cum": "1.2"
      },
      {
          "dateTimeRead": "2021-08-18 17:00:06",
          "air_pressure": "1004.98",
          "rain_value": "0.0",
          "rain_cum": "1.0"
      },
      {
          "dateTimeRead": "2021-08-18 16:50:06",
          "rain_value": "0.0",
          "rain_cum": "1.0",
          "air_pressure": "1004.77"
      },
      {
          "dateTimeRead": "2021-08-18 16:40:06",
          "rain_cum": "1.0",
          "air_pressure": "1004.66",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 16:30:06",
          "air_pressure": "1004.54",
          "rain_cum": "1.0",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 16:20:07",
          "rain_value": "0.0",
          "air_pressure": "1004.86",
          "rain_cum": "1.0"
      },
      {
          "dateTimeRead": "2021-08-18 16:10:06",
          "rain_cum": "1.0",
          "rain_value": "0.0",
          "air_pressure": "1004.92"
      },
      {
          "dateTimeRead": "2021-08-18 16:00:07",
          "rain_cum": "1.0",
          "rain_value": "0.0",
          "air_pressure": "1004.82"
      },
      {
          "dateTimeRead": "2021-08-18 15:50:06",
          "rain_value": "0.2",
          "rain_cum": "1.0",
          "air_pressure": "1004.75"
      },
      {
          "dateTimeRead": "2021-08-18 15:40:06",
          "rain_cum": "0.8",
          "rain_value": "0.0",
          "air_pressure": "1004.62"
      },
      {
          "dateTimeRead": "2021-08-18 15:30:06",
          "rain_value": "0.0",
          "rain_cum": "0.8",
          "air_pressure": "1004.76"
      },
      {
          "dateTimeRead": "2021-08-18 15:20:07",
          "rain_value": "0.0",
          "rain_cum": "0.8",
          "air_pressure": "1004.87"
      },
      {
          "dateTimeRead": "2021-08-18 15:10:06",
          "rain_value": "0.0",
          "rain_cum": "0.8",
          "air_pressure": "1005.06"
      },
      {
          "dateTimeRead": "2021-08-18 15:00:06",
          "rain_cum": "0.8",
          "air_pressure": "1005.03",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 14:50:06",
          "rain_value": "0.0",
          "rain_cum": "0.8",
          "air_pressure": "1005.02"
      },
      {
          "dateTimeRead": "2021-08-18 14:40:06",
          "rain_cum": "0.8",
          "air_pressure": "1005.0",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 14:30:06",
          "rain_value": "0.0",
          "air_pressure": "1005.14",
          "rain_cum": "0.8"
      },
      {
          "dateTimeRead": "2021-08-18 14:20:06",
          "rain_value": "0.0",
          "rain_cum": "0.8",
          "air_pressure": "1005.42"
      },
      {
          "dateTimeRead": "2021-08-18 14:10:06",
          "rain_cum": "0.8",
          "air_pressure": "1005.5",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 14:00:06",
          "rain_cum": "0.8",
          "rain_value": "0.2",
          "air_pressure": "1005.65"
      },
      {
          "dateTimeRead": "2021-08-18 13:50:07",
          "rain_cum": "0.6",
          "air_pressure": "1005.86",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 13:40:06",
          "rain_cum": "0.6",
          "rain_value": "0.0",
          "air_pressure": "1006.14"
      },
      {
          "dateTimeRead": "2021-08-18 13:30:06",
          "rain_cum": "0.6",
          "air_pressure": "1006.3",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 13:20:06",
          "rain_value": "0.0",
          "air_pressure": "1006.43",
          "rain_cum": "0.6"
      },
      {
          "dateTimeRead": "2021-08-18 13:10:07",
          "air_pressure": "1006.59",
          "rain_value": "0.0",
          "rain_cum": "0.6"
      },
      {
          "dateTimeRead": "2021-08-18 13:00:07",
          "air_pressure": "1006.73",
          "rain_cum": "0.6",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 12:50:06",
          "rain_value": "0.0",
          "rain_cum": "0.6",
          "air_pressure": "1006.8"
      },
      {
          "dateTimeRead": "2021-08-18 12:40:07",
          "rain_cum": "0.6",
          "rain_value": "0.0",
          "air_pressure": "1007.08"
      },
      {
          "dateTimeRead": "2021-08-18 12:30:07",
          "rain_value": "0.0",
          "air_pressure": "1007.27",
          "rain_cum": "0.6"
      },
      {
          "dateTimeRead": "2021-08-18 12:20:06",
          "rain_value": "0.2",
          "air_pressure": "1007.34",
          "rain_cum": "0.6"
      },
      {
          "dateTimeRead": "2021-08-18 12:10:06",
          "rain_cum": "0.4",
          "air_pressure": "1007.7",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 12:00:07",
          "rain_value": "0.0",
          "rain_cum": "0.4",
          "air_pressure": "1007.92"
      },
      {
          "dateTimeRead": "2021-08-18 11:50:07",
          "rain_cum": "0.4",
          "rain_value": "0.0",
          "air_pressure": "1008.06"
      },
      {
          "dateTimeRead": "2021-08-18 11:40:06",
          "rain_value": "0.0",
          "air_pressure": "1008.08",
          "rain_cum": "0.4"
      },
      {
          "dateTimeRead": "2021-08-18 11:30:06",
          "rain_value": "0.0",
          "rain_cum": "0.4",
          "air_pressure": "1008.39"
      },
      {
          "dateTimeRead": "2021-08-18 11:20:07",
          "rain_cum": "0.4",
          "air_pressure": "1008.34",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 11:10:06",
          "rain_value": "0.0",
          "air_pressure": "1008.58",
          "rain_cum": "0.4"
      },
      {
          "dateTimeRead": "2021-08-18 11:00:07",
          "air_pressure": "1008.57",
          "rain_cum": "0.4",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 10:50:06",
          "air_pressure": "1008.74",
          "rain_cum": "0.4",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 10:40:07",
          "rain_cum": "0.4",
          "air_pressure": "1008.59",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 10:30:06",
          "air_pressure": "1008.82",
          "rain_value": "0.0",
          "rain_cum": "0.4"
      },
      {
          "dateTimeRead": "2021-08-18 10:20:07",
          "air_pressure": "1008.71",
          "rain_value": "0.0",
          "rain_cum": "0.4"
      },
      {
          "dateTimeRead": "2021-08-18 10:10:06",
          "rain_value": "0.2",
          "rain_cum": "0.4",
          "air_pressure": "1008.97"
      },
      {
          "dateTimeRead": "2021-08-18 10:00:06",
          "rain_cum": "0.2",
          "rain_value": "0.0",
          "air_pressure": "1009.0"
      },
      {
          "dateTimeRead": "2021-08-18 09:50:06",
          "rain_cum": "0.2",
          "rain_value": "0.0",
          "air_pressure": "1008.95"
      },
      {
          "dateTimeRead": "2021-08-18 09:40:06",
          "air_pressure": "1009.12",
          "rain_value": "0.0",
          "rain_cum": "0.2"
      },
      {
          "dateTimeRead": "2021-08-18 09:30:07",
          "rain_cum": "0.2",
          "air_pressure": "1009.13",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 09:20:07",
          "air_pressure": "1009.21",
          "rain_cum": "0.2",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 09:10:07",
          "rain_value": "0.0",
          "rain_cum": "0.2",
          "air_pressure": "1009.29"
      },
      {
          "dateTimeRead": "2021-08-18 09:00:06",
          "rain_cum": "0.2",
          "rain_value": "0.0",
          "air_pressure": "1009.3"
      },
      {
          "dateTimeRead": "2021-08-18 08:50:06",
          "air_pressure": "1009.19",
          "rain_value": "0.2",
          "rain_cum": "0.2"
      },
      {
          "dateTimeRead": "2021-08-18 08:40:06",
          "rain_cum": "0.0",
          "rain_value": "0.0",
          "air_pressure": "1009.01"
      },
      {
          "dateTimeRead": "2021-08-18 08:30:07",
          "air_pressure": "1009.12",
          "rain_value": "0.0",
          "rain_cum": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 08:20:06",
          "rain_cum": "0.0",
          "air_pressure": "1009.19",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 08:10:06",
          "air_pressure": "1009.28",
          "rain_value": "0.0",
          "rain_cum": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 08:00:06",
          "rain_cum": "4.4",
          "air_pressure": "1009.46",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 07:50:06",
          "rain_value": "0.0",
          "rain_cum": "4.4",
          "air_pressure": "1009.5"
      },
      {
          "dateTimeRead": "2021-08-18 07:40:07",
          "air_pressure": "1009.3",
          "rain_cum": "4.4",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 07:30:06",
          "rain_value": "0.0",
          "rain_cum": "4.4",
          "air_pressure": "1009.2"
      },
      {
          "dateTimeRead": "2021-08-18 07:20:06",
          "rain_cum": "4.4",
          "rain_value": "0.0",
          "air_pressure": "1009.33"
      },
      {
          "dateTimeRead": "2021-08-18 07:10:07",
          "rain_value": "0.2",
          "rain_cum": "4.4",
          "air_pressure": "1009.16"
      },
      {
          "dateTimeRead": "2021-08-18 07:00:06",
          "rain_value": "0.0",
          "air_pressure": "1009.06",
          "rain_cum": "4.2"
      },
      {
          "dateTimeRead": "2021-08-18 06:50:06",
          "air_pressure": "1008.72",
          "rain_value": "0.0",
          "rain_cum": "4.2"
      },
      {
          "dateTimeRead": "2021-08-18 06:40:06",
          "rain_value": "0.0",
          "air_pressure": "1008.52",
          "rain_cum": "4.2"
      },
      {
          "dateTimeRead": "2021-08-18 06:30:06",
          "rain_value": "0.0",
          "rain_cum": "4.2",
          "air_pressure": "1008.44"
      },
      {
          "dateTimeRead": "2021-08-18 06:20:06",
          "rain_cum": "4.2",
          "air_pressure": "1008.36",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 06:10:06",
          "air_pressure": "1008.44",
          "rain_value": "0.0",
          "rain_cum": "4.2"
      },
      {
          "dateTimeRead": "2021-08-18 06:00:07",
          "air_pressure": "1008.42",
          "rain_value": "0.0",
          "rain_cum": "4.2"
      },
      {
          "dateTimeRead": "2021-08-18 05:50:06",
          "rain_cum": "4.2",
          "air_pressure": "1008.35",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 05:40:06",
          "air_pressure": "1008.51",
          "rain_cum": "4.2",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 05:30:06",
          "rain_cum": "4.2",
          "rain_value": "0.0",
          "air_pressure": "1008.55"
      },
      {
          "dateTimeRead": "2021-08-18 05:20:06",
          "rain_value": "0.2",
          "air_pressure": "1008.5",
          "rain_cum": "4.2"
      },
      {
          "dateTimeRead": "2021-08-18 05:10:06",
          "rain_value": "0.0",
          "air_pressure": "1008.51",
          "rain_cum": "4.0"
      },
      {
          "dateTimeRead": "2021-08-18 05:00:06",
          "rain_cum": "4.0",
          "rain_value": "0.0",
          "air_pressure": "1008.55"
      },
      {
          "dateTimeRead": "2021-08-18 04:50:06",
          "rain_value": "0.0",
          "air_pressure": "1008.45",
          "rain_cum": "4.0"
      },
      {
          "dateTimeRead": "2021-08-18 04:40:06",
          "air_pressure": "1008.41",
          "rain_value": "0.0",
          "rain_cum": "4.0"
      },
      {
          "dateTimeRead": "2021-08-18 04:30:07",
          "rain_value": "0.0",
          "air_pressure": "1008.28",
          "rain_cum": "4.0"
      },
      {
          "dateTimeRead": "2021-08-18 04:20:06",
          "rain_value": "0.0",
          "air_pressure": "1008.21",
          "rain_cum": "4.0"
      },
      {
          "dateTimeRead": "2021-08-18 04:10:07",
          "rain_cum": "4.0",
          "air_pressure": "1008.24",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 04:00:06",
          "air_pressure": "1008.11",
          "rain_cum": "4.0",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 03:50:06",
          "rain_cum": "4.0",
          "rain_value": "0.0",
          "air_pressure": "1008.08"
      },
      {
          "dateTimeRead": "2021-08-18 03:40:06",
          "rain_cum": "4.0",
          "rain_value": "0.0",
          "air_pressure": "1008.02"
      },
      {
          "dateTimeRead": "2021-08-18 03:30:07",
          "rain_cum": "4.0",
          "air_pressure": "1007.92",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 03:20:07",
          "air_pressure": "1007.88",
          "rain_value": "0.2",
          "rain_cum": "4.0"
      },
      {
          "dateTimeRead": "2021-08-18 03:10:06",
          "air_pressure": "1007.82",
          "rain_value": "0.0",
          "rain_cum": "3.8"
      },
      {
          "dateTimeRead": "2021-08-18 03:00:07",
          "air_pressure": "1007.82",
          "rain_cum": "3.8",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 02:50:07",
          "air_pressure": "1007.84",
          "rain_cum": "3.8",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 02:40:06",
          "rain_cum": "3.8",
          "air_pressure": "1007.88",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 02:30:06",
          "rain_cum": "3.8",
          "rain_value": "0.0",
          "air_pressure": "1007.95"
      },
      {
          "dateTimeRead": "2021-08-18 02:20:07",
          "rain_cum": "3.8",
          "air_pressure": "1008.02",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 02:10:06",
          "air_pressure": "1008.08",
          "rain_value": "0.0",
          "rain_cum": "3.8"
      },
      {
          "dateTimeRead": "2021-08-18 02:00:06",
          "rain_value": "0.0",
          "rain_cum": "3.8",
          "air_pressure": "1008.2"
      },
      {
          "dateTimeRead": "2021-08-18 01:50:06",
          "air_pressure": "1008.27",
          "rain_value": "0.0",
          "rain_cum": "3.8"
      },
      {
          "dateTimeRead": "2021-08-18 01:40:06",
          "rain_cum": "3.8",
          "rain_value": "0.2",
          "air_pressure": "1008.46"
      },
      {
          "dateTimeRead": "2021-08-18 01:30:06",
          "air_pressure": "1008.54",
          "rain_value": "0.0",
          "rain_cum": "3.6"
      },
      {
          "dateTimeRead": "2021-08-18 01:20:06",
          "rain_value": "0.0",
          "air_pressure": "1008.6",
          "rain_cum": "3.6"
      },
      {
          "dateTimeRead": "2021-08-18 01:10:06",
          "air_pressure": "1008.77",
          "rain_value": "0.0",
          "rain_cum": "3.6"
      },
      {
          "dateTimeRead": "2021-08-18 01:00:06",
          "rain_cum": "3.6",
          "rain_value": "0.0",
          "air_pressure": "1008.83"
      },
      {
          "dateTimeRead": "2021-08-18 00:50:06",
          "air_pressure": "1008.89",
          "rain_cum": "3.6",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 00:40:07",
          "air_pressure": "1008.9",
          "rain_cum": "3.6",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 00:30:06",
          "rain_cum": "3.6",
          "air_pressure": "1008.97",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-18 00:20:06",
          "rain_cum": "3.6",
          "air_pressure": "1008.87",
          "rain_value": "0.2"
      },
      {
          "dateTimeRead": "2021-08-18 00:10:06",
          "rain_value": "0.0",
          "air_pressure": "1008.81",
          "rain_cum": "3.4"
      },
      {
          "dateTimeRead": "2021-08-18 00:00:06",
          "air_pressure": "1008.83",
          "rain_value": "0.0",
          "rain_cum": "3.4"
      },
      {
          "dateTimeRead": "2021-08-17 23:50:06",
          "rain_cum": "3.4",
          "rain_value": "0.0",
          "air_pressure": "1008.96"
      },
      {
          "dateTimeRead": "2021-08-17 23:40:06",
          "rain_cum": "3.4",
          "air_pressure": "1008.88",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 23:30:07",
          "air_pressure": "1008.99",
          "rain_cum": "3.4",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 23:20:06",
          "rain_cum": "3.4",
          "air_pressure": "1009.17",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 23:10:06",
          "rain_value": "0.2",
          "air_pressure": "1009.31",
          "rain_cum": "3.4"
      },
      {
          "dateTimeRead": "2021-08-17 23:00:06",
          "air_pressure": "1009.5",
          "rain_cum": "3.2",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 22:50:06",
          "rain_value": "0.0",
          "air_pressure": "1009.57",
          "rain_cum": "3.2"
      },
      {
          "dateTimeRead": "2021-08-17 22:40:06",
          "rain_cum": "3.2",
          "rain_value": "0.0",
          "air_pressure": "1009.59"
      },
      {
          "dateTimeRead": "2021-08-17 22:30:06",
          "rain_cum": "3.2",
          "rain_value": "0.0",
          "air_pressure": "1009.63"
      },
      {
          "dateTimeRead": "2021-08-17 22:20:07",
          "rain_value": "0.0",
          "rain_cum": "3.2",
          "air_pressure": "1009.57"
      },
      {
          "dateTimeRead": "2021-08-17 22:10:06",
          "rain_value": "0.0",
          "rain_cum": "3.2",
          "air_pressure": "1009.6"
      },
      {
          "dateTimeRead": "2021-08-17 22:00:07",
          "rain_cum": "3.2",
          "rain_value": "0.0",
          "air_pressure": "1009.54"
      },
      {
          "dateTimeRead": "2021-08-17 21:40:06",
          "rain_cum": "3.0",
          "air_pressure": "1009.37",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 21:30:06",
          "air_pressure": "1009.4",
          "rain_cum": "3.0",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 21:20:06",
          "rain_value": "0.0",
          "rain_cum": "3.0",
          "air_pressure": "1009.25"
      },
      {
          "dateTimeRead": "2021-08-17 21:10:06",
          "rain_value": "0.0",
          "air_pressure": "1009.01",
          "rain_cum": "3.0"
      },
      {
          "dateTimeRead": "2021-08-17 21:00:06",
          "rain_cum": "3.0",
          "air_pressure": "1009.01",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 20:50:06",
          "rain_cum": "3.0",
          "air_pressure": "1008.93",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 20:40:07",
          "air_pressure": "1008.94",
          "rain_value": "0.2",
          "rain_cum": "3.0"
      },
      {
          "dateTimeRead": "2021-08-17 20:30:06",
          "air_pressure": "1008.73",
          "rain_cum": "2.8",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 20:20:06",
          "rain_value": "0.0",
          "rain_cum": "2.8",
          "air_pressure": "1008.72"
      },
      {
          "dateTimeRead": "2021-08-17 20:10:07",
          "air_pressure": "1008.63",
          "rain_cum": "2.8",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 20:00:07",
          "rain_cum": "2.8",
          "air_pressure": "1008.63",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 19:50:06",
          "rain_value": "0.0",
          "air_pressure": "1008.69",
          "rain_cum": "2.8"
      },
      {
          "dateTimeRead": "2021-08-17 19:40:06",
          "air_pressure": "1008.7",
          "rain_cum": "2.8",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 19:30:07",
          "air_pressure": "1008.52",
          "rain_cum": "2.8",
          "rain_value": "0.2"
      },
      {
          "dateTimeRead": "2021-08-17 19:20:06",
          "rain_cum": "2.6",
          "rain_value": "0.0",
          "air_pressure": "1008.36"
      },
      {
          "dateTimeRead": "2021-08-17 19:10:06",
          "air_pressure": "1008.33",
          "rain_value": "0.0",
          "rain_cum": "2.6"
      },
      {
          "dateTimeRead": "2021-08-17 19:00:07",
          "air_pressure": "1008.5",
          "rain_value": "0.0",
          "rain_cum": "2.6"
      },
      {
          "dateTimeRead": "2021-08-17 18:50:06",
          "air_pressure": "1008.24",
          "rain_cum": "2.6",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 18:40:07",
          "rain_cum": "2.6",
          "air_pressure": "1007.99",
          "rain_value": "0.0"
      },
      {
          "dateTimeRead": "2021-08-17 18:30:06",
          "air_pressure": "1007.91",
          "rain_cum": "2.6",
          "rain_value": "0.2"
      },
      {
          "dateTimeRead": "2021-08-17 18:20:06",
          "rain_value": "0.0",
          "air_pressure": "1007.77",
          "rain_cum": "2.4"
      },
      {
          "dateTimeRead": "2021-08-17 18:10:07",
          "rain_cum": "2.4",
          "rain_value": "0.0",
          "air_pressure": "1007.78"
      }
  ]
};
