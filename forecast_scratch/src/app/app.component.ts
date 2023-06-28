import { Component } from '@angular/core';
import { Climate } from 'src/model/weather.model';
import { WeathserviService } from './weathservi.service';
import { Observable, Subscription, interval } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {

  private autoRefreshSubscription: Subscription | undefined;

  // title = 'forecast_scratch';

  title(title: any) {
    throw new Error('Method not implemented.');
  }


  constructor(private weathserviService: WeathserviService) { }

  climate?: Climate;

  cityName: string = '';


  // cityName: string = 'Berlin';

  ngOnInit(): void {

    this.getWeatherData(this.cityName);
    this.cityName = '';

    this.autoRefreshSubscription = interval(5 * 60 * 1000).subscribe(() => {
      this.getWeatherData(this.cityName);
    });

    // throw new Error('Method not implemented.');
  }

  onSubmit() {

    this.getWeatherData(this.cityName);
    this.cityName = '';

  }

  private getWeatherData(cityName: string) {
    this.weathserviService.getWeatherData(cityName).subscribe({
      next: (response) => {

        this.climate = response;

        console.log(response);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.autoRefreshSubscription) {
      this.autoRefreshSubscription.unsubscribe();
    }
  }

}
