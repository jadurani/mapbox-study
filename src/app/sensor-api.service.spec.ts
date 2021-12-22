import { TestBed } from '@angular/core/testing';

import { SensorApiService } from './sensor-api.service';

describe('SensorApiService', () => {
  let service: SensorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
