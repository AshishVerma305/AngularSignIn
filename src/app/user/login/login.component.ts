import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { post } from '../post.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formInvalid:boolean=false;
  formError:boolean=false;
  error;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.formError=false;
    if(this.authService.isLoggedIn())
    {
      console.log("userDetails page");
      this.router.navigate(['/userDetails']);
    }
  }
  onSubmit(form:NgForm)
  {

    this.formError=false;
    if(this.formInvalid)
    {
      return;
    }
    const post:post={
      email:form.value.email,
      passWord:form.value.password
    }
    this.authService.logIn(post).subscribe(data=>
    {
      this.authService.status.next(true);
     console.log("---------------data",data);
     this.authService.setToken(data['token']);
     this.router.navigateByUrl('/userDetails');
    },err=>
    {
      this.error=err.error.message;
      this.formError=true;
    })
    console.log(post);
  }

}
