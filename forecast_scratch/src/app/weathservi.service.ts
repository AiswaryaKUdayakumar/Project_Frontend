import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Climate } from 'src/model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeathserviService {
  // addFav(cityName: string) {
  //   throw new Error('Method not implemented.');
  // }
    // .set('lang','en');
  // .set('dt','2023-06-16');
  navigate(arg0: string[], navigationExtras: NavigationExtras) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  getWeatherData(cityName: string): Observable<Climate> {
    const headers = new HttpHeaders()
      .set(environments.XRapidAPIHostHeaderName, environments.XRapidAPIHostHeaderValue)
      .set(environments.XRapidAPIKeyHeaderName, environments.XRapidAPIKeyHeaderValue); // Replace 'YOUR_WEATHER_API_KEY' with your actual API key
  
    const params = new HttpParams()
      .set('q', cityName);
      // .set('appid','da0f9c8d90bde7e619c3ec47766a42f4');
      // .set('units', 'metric')
      // .set('mode', 'json')
      // .set('days','3'),
      // .set('lang','en');
      // .set('dt','2023-06-16');
  
    return this.http.get<Climate>(environments.weatherBaseUrl, {
      headers,
      params
    });

  }
}
