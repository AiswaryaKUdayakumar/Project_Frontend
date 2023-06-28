import { Component } from '@angular/core';
import { AuthenticateServiceService } from '../service/authenticate-service.service';
import { Favorite } from '../modal/favorite';
import { WeathserviService } from '../weathservi.service';
import { Router } from '@angular/router';
import { Climate } from 'src/model/weather.model';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent {
  climate?: Climate;
  location?: Location;
  selectedCity: string | null = null;
  favorites: string[] = []; // Array to store favorite locations

  constructor(private authService: AuthenticateServiceService, private weatherService: WeathserviService, private router: Router) { }

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.fetchFavorites(userId);
  }

  getFavoriteLocations(): any[] {
    return this.favorites.filter(favorite => typeof favorite === 'object');
  }

  fetchFavorites(userId: number) {
    this.authService.getAllFavorites(userId).subscribe(
      response => {
        this.favorites = response;
        console.log(this.favorites);
      },
      error => {
        console.error('Failed to fetch favorites', error);
      }
    );
  }

  deleteFav(favorite: Favorite): void {
    this.authService.deleteFavourite(favorite.favId).subscribe(
      () => {
        console.log('successfully deleted');
        window.location.reload();
      },
      error => {
        // Handle error, show error message, or perform any necessary error handling
        console.error('failed to delete');
      }
    );
  }


  viewFav(favorite: Favorite): void {
    const cityName = favorite.cityName;
    this.weatherService.getWeatherData(cityName).subscribe(
      response => {
        this.climate = response;
        console.log('Weather data:', response);
        // this.router.navigate(['/homepage'], { queryParams: { cityName: cityName } });
      },
      error => {
        console.error('Failed to get weather data:', error);
      }
    );
  }


}




