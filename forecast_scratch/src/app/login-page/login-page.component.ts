import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../modal/login';
import { AuthenticateServiceService } from '../service/authenticate-service.service';
import { RouterServiceService } from '../service/router-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  login: Login = new Login();
  loginForm!: FormGroup;
  submitMessage!: string;
  flag: boolean = false;
  private isAuthenticated = false;


  constructor(
    // private routerService: RouterServiceService,
    private authService: AuthenticateServiceService,
    private router: Router
  ) {
    
      
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
    // this.initializeLoginForm();
    this.onSubmit();
  }

  initializeLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    console.log("Hi from login submit");
  
    this.login.username = this.loginForm.value.username;
    this.login.password = this.loginForm.value.password;
  
    console.log("Login Submit: ", this.login.username);
  
    this.authService.getusers(this.login).subscribe(
      (data) => {
        this.authService.setBearerToken(data.token);
  
        console.log(data);
  
        if (data != null) {
          sessionStorage.setItem("key", this.login.username);
          this.flag = true;
  
          this.authService.getUserByUsername(this.login.username).subscribe(
            (response: any) => {
              if(response.token){
                this.setAuthenticated(true);
              }
              this.router.navigate(['/homepage']);
            },
            (error: any) => { // Specify the type as 'any' or the appropriate type for the error object
              console.log(error);
              // alert("An error occurred while retrieving user data.");
            }
          );
          // this.routerService.tohome(); // Navigate to the home route
        } else {
          console.log("Error");
        }
      },
      (error: any) => { // Specify the type as 'any' or the appropriate type for the error object
        console.log(error);
      }
    );
  }
  
  isAuthenticate(): boolean {
    return this.isAuthenticated;
  }

  setAuthenticated(status: boolean): void{
    this.isAuthenticated = status;
  }
  
}
