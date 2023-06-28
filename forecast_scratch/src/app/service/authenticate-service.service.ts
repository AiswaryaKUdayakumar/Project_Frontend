import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../modal/login';
import { Signup } from '../modal/signup';
import { map } from 'rxjs/operators';
import { Climate } from 'src/model/weather.model';
import { Favorite } from '../modal/favorite';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateServiceService {

  climate!: Climate;
  private authenticated: boolean = false;
  private token!: string;
  private userId!: number;

  constructor(private httpClient: HttpClient) { }

  addUser(signup: Signup): Observable<Signup> {
    return this.httpClient.post<Signup>('http://localhost:8088/api/v1/user/register', signup);
  }

  getusers(user: Login): Observable<any> {
    console.log("GET USER");
    console.log(user.username);
    console.log(user.password);
    this.authenticated = true;

   return this.httpClient.post<any>(`http://localhost:8088/api/v1/users/login`, user, { headers: new HttpHeaders().set('responseType', 'text') })
      .pipe(
        map(userData => {
          localStorage.setItem('username', user.username);
          this.token = userData.token;
          this.userId = userData.userId;
          console.log("Token string: " + this.token);
          localStorage.setItem('token', this.token);
          console.log('userId', this.userId);
          localStorage.setItem('userId', String(this.userId));
          return userData;
          
        } )
      );

  }

  getUserByUsername(username: string) {
    return this.httpClient.get<any>(`http://localhost:8088/api/v1/user/details/${username}`);
  }

  addFav(favv: Favorite): Observable<any> {
    return this.httpClient.post('http://localhost:8088/api/v1/fav', favv);
  }

  getAllFavorites(userId: number): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8088/api/v1/allfav/${userId}`);
    
  }

  deleteFavourite(favId: number): Observable<any>{
    return this.httpClient.delete<any>(`http://localhost:8088/api/v1/deletefav/${favId}`);
  }

 

  

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  setAuthenticated(status: boolean): void {
    this.authenticated = status;
  }

  setBearerToken(token: string) {
    sessionStorage.setItem('token', token);

  }
}

