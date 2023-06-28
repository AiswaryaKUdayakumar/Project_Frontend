import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { HomePageNewComponent } from './home-page-new/home-page-new.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
  {path: '', component: HomePageNewComponent},
  {path: 'landingpage', component: LandingPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'homepage', component: HomePageNewComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'favorites', component: FavoritesPageComponent},
  {path: 'about', component: AboutPageComponent },
  {path: 'navbar', component: NavbarComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
