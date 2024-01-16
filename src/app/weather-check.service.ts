import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, ReplaySubject, shareReplay} from "rxjs";
import {tap} from "rxjs/operators";
import {WeatherResponse} from "./interfaces/weather-response.interface";

@Injectable({
  providedIn: 'root'
})
export class WeatherCheckService {
  cityInfo: ReplaySubject<WeatherResponse> = new ReplaySubject<WeatherResponse>();
  private cache$: Observable<WeatherResponse> | null = null;

  constructor(private http: HttpClient) { }

  getWeather(value: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("q", value);
    httpParams = httpParams.append("appid", 'caa00109840ebd3f34e0208e82ae3084');

    let oldCity = localStorage.getItem('city');

    if (!this.cache$ || oldCity !== value && oldCity) {
      this.cache$ = this.http.get<WeatherResponse>('https://api.openweathermap.org/data/2.5/weather',
        {
          params: httpParams
        }).pipe(tap(res => {
          this.cityInfo.next(res);
        }),
        shareReplay(5));

      localStorage.setItem('city', value);
    }

    return this.cache$;
  }
}
