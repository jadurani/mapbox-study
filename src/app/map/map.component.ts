import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: SAMPLE_DATA.map(d => +d.y), label: 'Rainfall Data', fill: false },
  ];
  public lineChartLabels: Label[] = SAMPLE_DATA.map(d => d.x);
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: '',
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(66, 100, 251, 0.8)',
      backgroundColor: 'rgb(66, 100, 251)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private map: MapService) { }

  ngOnInit() {
    this.map.buildMap()
  }

}


const SAMPLE_DATA = [
  {
    "x": "2019-09-05 17:10:50",
    "y": "0.04"
  },
  {
    "x": "2019-09-05 17:21:19",
    "y": "0.05"
  },
  {
    "x": "2019-09-05 17:31:12",
    "y": "0.03"
  },
  {
    "x": "2019-09-05 17:41:12",
    "y": "0.03"
  },
  {
    "x": "2019-09-05 17:51:12",
    "y": "0.03"
  },
  {
    "x": "2019-09-05 18:01:12",
    "y": "0.04"
  },
  {
    "x": "2019-09-05 18:11:12",
    "y": "0.05"
  },
  {
    "x": "2019-09-05 18:21:13",
    "y": "0.05"
  },
  {
    "x": "2019-09-05 18:31:12",
    "y": "0.06"
  },
  {
    "x": "2019-09-05 18:41:12",
    "y": "0.07"
  },
  {
    "x": "2019-09-05 18:51:12",
    "y": "0.08"
  },
  {
    "x": "2019-09-05 19:03:34",
    "y": "0.08"
  },
  {
    "x": "2019-09-05 19:11:12",
    "y": "0.08"
  },
  {
    "x": "2019-09-05 19:21:13",
    "y": "0.08"
  },
  {
    "x": "2019-09-05 19:31:12",
    "y": "0.07"
  },
  {
    "x": "2019-09-05 19:41:12",
    "y": "0.07"
  },
  {
    "x": "2019-09-05 20:01:12",
    "y": "0.08"
  },
  {
    "x": "2019-09-05 20:11:14",
    "y": "0.07"
  },
  {
    "x": "2019-09-05 20:21:12",
    "y": "0.07"
  },
  {
    "x": "2019-09-05 20:32:15",
    "y": "0.08"
  },
  {
    "x": "2019-09-05 20:41:50",
    "y": "0.07"
  },
  {
    "x": "2019-09-05 20:51:12",
    "y": "0.08"
  },
  {
    "x": "2019-09-05 21:01:12",
    "y": "0.07"
  },
  {
    "x": "2019-09-05 21:11:12",
    "y": "0.07"
  }
];
