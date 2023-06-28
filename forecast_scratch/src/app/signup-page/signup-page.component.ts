import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Signup } from '../modal/signup';
import { AuthenticateServiceService } from '../service/authenticate-service.service';
// import { RouterServiceService } from '../service/router-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {

  signup: Signup = new Signup();

  signUpArray: Array<Signup> = [];

  signupForm: FormGroup;



  constructor(private authenticateService: AuthenticateServiceService, private formBuilder: FormBuilder, private router: Router) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // if (sessionStorage.getItem('key') != null) {
    //   this.router.navigate(['/login']);
    // }
    // else {
    //   console.log("hi")
    //   this.signupForm = new FormGroup({

    //     username: new FormControl('', [Validators.required]),
    //     email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    //     password: new FormControl('', [Validators.required]),
    //     confirmpassword: new FormControl('', [Validators.required]),
    //   });
    // }
  }

  // get f() {
  //   return this.signupForm.controls;
  // }

  onSubmit() {
    console.log("Hi");

    this.signup = this.signupForm.value;
    console.log("password== " + this.signup.password);
    console.log("username== " + this.signup.username);
    console.log("email== " + this.signup.email);
    console.log("confirmpassword== " + this.signup.confirmpassword);

    this.signUpArray.push(this.signup);
    this.authenticateService.addUser(this.signup).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/login']);
    },
      (error: any) => {
        console.log(error);
      });
  }

}
