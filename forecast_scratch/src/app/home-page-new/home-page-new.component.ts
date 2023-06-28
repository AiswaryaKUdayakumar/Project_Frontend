import { Component, OnInit } from '@angular/core';
import { Climate } from 'src/model/weather.model';
import { WeathserviService } from '../weathservi.service';
import { AuthenticateServiceService } from '../service/authenticate-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Favorite } from '../modal/favorite';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-home-page-new',
  templateUrl: './home-page-new.component.html',
  styleUrls: ['./home-page-new.component.css']
})
export class HomePageNewComponent implements OnInit {


  constructor(private weathserviService: WeathserviService, private authService: AuthenticateServiceService, private router: Router, private route: ActivatedRoute) { }

  climate?: Climate;

  cityName: string = 'Trivandrum';


  ngOnInit(): void {

    this.getWeatherData(this.cityName);
    this.cityName = '';
    this.fav();

  }

  onSubmit() {

    this.getWeatherData(this.cityName);
    this.cityName = '';

    //   const navigationExtras: NavigationExtras = {
    //     state: {
    //       cityName: this.cityName
    //     }
    //   };

    //   this.weathserviService.navigate(['/favorites-page'], navigationExtras);
    // }

  }

  private getWeatherData(cityName: string) {
    this.weathserviService.getWeatherData(cityName).subscribe({
      next: (response: Climate | undefined) => {

        this.climate = response;

        console.log(response);
      }
    })
  }

  getDayOfWeek(dateString: string): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  }

  formattedTime(hourIndex: number): string {
    const hour = this.climate?.forecast?.forecastday[0]?.hour[hourIndex];
    if (hour) {
      const time = hour.time;
      const date = new Date(time);
      const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
      return date.toLocaleTimeString('en-US', options);
    }
    return ''; // or any default value if hour is undefined
  }

  addfav: Location[] = [];
  favv: Favorite = new Favorite();

  fav() {
    const cityName = this.climate?.location.name;
    console.log(this.climate?.location.name);
    if (cityName) {
      const userId = localStorage.getItem('userId');
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId && userId && storedUserId === userId) {
        const isLocationAdded = this.checkIfLocationAdded(cityName, Number(userId));

        if (isLocationAdded) {
          const favv: Favorite = {
            favId: 0,
            cityName: cityName,
            userId: Number(userId)
          };

          this.authService.addFav(favv)
            .subscribe(
              response => {
                this.addfav = response;
                console.log('Location added to favorites:', this.addfav);
              },
              error => {
                console.error('Failed to add:', error);
              }
            );
        } else {
          console.log('Location is already added to favorites');
        }
      }
    }
  }


  checkIfLocationAdded(cityName: string, userId: number): Observable<boolean> {
    return this.authService.getAllFavorites(userId).pipe(
      map(favorites => favorites.some((favorite: { cityName: string; }) => favorite.cityName === cityName))
    );
  }


  favorites() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    else {
      this.router.navigate(['/favorites']);
    }
  }



}
