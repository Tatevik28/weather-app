import { TestBed } from '@angular/core/testing';

import { WeatherCheckService } from './weather-check.service';

describe('WeatherCheckService', () => {
  let service: WeatherCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
