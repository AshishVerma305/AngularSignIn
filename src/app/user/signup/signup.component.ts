import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { signup } from '../signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  formError:boolean=false;
  error;
  ngOnInit() {
    this.formError=false;
    if(this.authService.isLoggedIn())
    {
      console.log()
      this.router.navigate(['/userDetails']);
    }
  }

  signUp(form:NgForm)
  {
    this.formError=false;
    const fullName=form.value.fname;
    const username=form.value.username;
    const address=form.value.address;
    const email=form.value.email;
    const password=form.value.password;
    const mobile=form.value.mobile;
    console.log(email);
    const signupData:signup={
      fullName:fullName,
      username:username,
      address:address,
      email:email,
      password:password,
      mobile:mobile
    }
    this.authService.signUp(signupData).subscribe(resData=>
      {
        console.log(resData)
      },err=>{
        console.log(err.error);
        this.error=err.error;
        this.formError=true;
      });
    console.log(signupData);
    form.reset()
  }
}
