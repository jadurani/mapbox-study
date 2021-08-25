import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


type SensorType =
 | 'arg' // Auomated Rain Gauge
 | 'wlms' // Water LEvel Monitoring System
 | 'aws' // Automated Weather Stations
 | 'wlmsarg' // Waterlevel & Rain

@Injectable({
  providedIn: 'root'
})
export class SensorApiService {
  private BASE_URL = 'http://202.90.159.72:8000';

  constructor(private http: HttpClient) { }

  getSensors(type: SensorType) {
    const param = type ? `?sensor_type=${type}` : '';
    return this.http.get(`${this.BASE_URL}/api/sensors/${param}`);
  }

  getSensorData(id: number) {
    return this.http.get(`${this.BASE_URL}/api/sensor-data/?sensor=${id}`);
  }
}
