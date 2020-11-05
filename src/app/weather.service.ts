import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable()
export class WeatherService {
  apiKey = "92a1ffe3dd28bcfae6b087f3662e3336"; //TODO : I have to keep apiKey in someother place later
  constructor(private http: HttpClient) {}
  getCurrentWeather(city: any) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        this.apiKey
      }&units=metric
`
    );
  }
}
