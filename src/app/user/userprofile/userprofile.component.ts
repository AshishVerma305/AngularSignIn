import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth/auth.service';

@Component({
  selector:'app-user-profile',
  templateUrl:'./userprofile.component.html',
  styleUrls:['./userprofile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  showEdit=false;
  showSucessMessage: boolean;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
      }
    );
  }

  updateProfile() {
    this.authService.updateUserProfile(this.userDetails).subscribe(
        res => {
          this.authService.getUserProfile().subscribe(
              res => {
                this.userDetails = res['user'];
              },
              err => {
                console.log(err);

              }
          );
          this.showSucessMessage = true;
        },
        err => {
          console.log(err);

        }
    );
  }

  onLogout(){
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }
}