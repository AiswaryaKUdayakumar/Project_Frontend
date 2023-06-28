import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterServiceService {

  constructor(private router:Router) { 

 }

tohome() {
  this.router.navigate(['']);
}
tologin() {
  this.router.navigate(['/fav']);
}
tosignUp(){
  this.router.navigate(['/sign'])
}

}




