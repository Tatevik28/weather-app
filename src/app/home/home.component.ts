import {Component, ViewChild} from '@angular/core';
import {WeatherCheckService} from "../weather-check.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  errorMessage: string = '';
  isLoading: boolean = false;
  @ViewChild('weatherForm') form: any;
  constructor(private weatherCheckService: WeatherCheckService) {
  }
  checkWeather() {
    this.isLoading = true;
    this.weatherCheckService.getWeather(this.form.value.weather).subscribe(() => {
      this.isLoading = false;
      this.form.reset();
    },
      error => {
        this.isLoading = false;
        this.errorMessage = error.error.message;
      });
  }
}
