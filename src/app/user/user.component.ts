import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy{

  loginStatus:boolean;
  private loginObserv:Subscription;
  constructor(private authService:AuthService,private router:Router) { }
  ngOnInit() {
    this.loginObserv=this.authService.status.subscribe(data=>{
      this.loginStatus=data;
    })
  }
  onLogout()
  {
    console.log("clicked on logout");
    this.authService.deleteToken();
    console.log("after delete token");
    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
      this.loginObserv.unsubscribe();
  }

}
