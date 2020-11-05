import { Component, OnDestroy,  OnInit } from "@angular/core";
import { Subscription, timer } from "rxjs";
import { flatMap} from "rxjs/operators";
import { WeatherService } from "../weather.service";

@Component({
  selector: "app-weather-details",
  templateUrl: "./weather-details.component.html",
  styleUrls: ["./weather-details.component.css"]
})
export class WeatherDetailsComponent implements OnInit,OnDestroy {
  city: any;
  weatherData: any;
  isError: boolean = false;
  isFound: boolean = false;
  subscription: Subscription;
  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {}
  getWeatherData() {
    console.log("get")
    this.subscription = timer(0,30*1000)
    .pipe(
        flatMap(() => this.weatherService.getCurrentWeather(this.city))
    )
 .subscribe((data: any) => {
      this.weatherData = data;
      console.log(data);
      this.findBackgroundImg();
      this.isError = false;
      this.isFound = true;
      console.log("city updsated")
      localStorage.setItem(`city-${this.city}`,JSON.stringify(this.weatherData));
    },(error)=> {
      if(error.status === 404) {
      this.isError = true;
      }
      else if(!navigator.onLine) {
      this.weatherData= localStorage.getItem(`city-${this.city}`) ? JSON.parse(localStorage.getItem(`city-${this.city}`)): "";
      }
    });
  }
  findBackgroundImg() {
    if(this.weatherData) {
      switch (this.weatherData?.weather[0]?.main) {
      case "Clear":
        return "url('https://www.4freephotos.com/medium/batch/Clud-on-bright-blue-sky1469.jpg')";
        case "Rain":
        return "url('https://wallpaperaccess.com/full/688287.jpg')";
        case "Clouds":
        return "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')";
                case "Thunderstorm":
        return "url('https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')";
                        case "Drizzle":
        return "url('https://image.freepik.com/free-photo/rain-drops-window-rainy-day-drops-glass-window-texture-street-rain_109427-14.jpg')";
                                case "Snow":
        return "url('https://images.unsplash.com/photo-1457269449834-928af64c684d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max')";
        default:
            return "url('https://wallpapercave.com/wp/qQa5Pd7.jpg')";    
    }
    }
    else {
      return "url('https://www.wallpapertip.com/wmimgs/173-1739030_wallpaper-hd-cloudy-weather-unique-hd-wallpapers-hd.jpg')";   
    }
  }

  clear() {
    this.city = "";
    this.isError = false;
    this.weatherData = "";
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
  this.subscription?.unsubscribe();
}
}
