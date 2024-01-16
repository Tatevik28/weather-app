import {Component, OnInit} from '@angular/core';
import {WeatherCheckService} from "../weather-check.service";
import {CityName} from "../interfaces/city.interface";
import {map, Observable, of} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cities: CityName[] = [];
  cities$: Observable<CityName[]> = of([]);

  constructor(private weatherCheckService: WeatherCheckService) {

  }

  ngOnInit() {
    this.cities$ = this.weatherCheckService.cityInfo.pipe(map(res => {

          this.cities.push({
            name: res.name,
            degree: (res.main.temp_min - 273,15),
            country: res.sys.country,
            windSpeed: res.wind.speed
          })

      return this.cities
    }))
  }
}
