import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { post } from "../post.model";
import { signup } from "../signup.model";

@Injectable({providedIn:'root'})
export class AuthService{
    constructor(private http:HttpClient,private router:Router)
    {

    }
    status=new BehaviorSubject(false);
    signUp(signup:signup)
    {
        return this.http.post('http://localhost:8000/api/register',signup);
    }
    logIn(logIn:post)
    {
        return this.http.post('http://localhost:8000/api/authenticate',logIn);
    }
    setToken(token: string) {
        localStorage.setItem('token', token);
    }
    getUserProfile(){
        return this.http.get("http://localhost:8000/api/userProfile",{
            headers: new HttpHeaders({'Authorization':'Bearer ' +this.getToken()})
        })
    }

    updateUserProfile(user) {
        return this.http.put("http://localhost:8000/api/userProfile", user,{
            headers: new HttpHeaders({'Authorization':'Bearer ' +this.getToken()})
        });
      }
    
    getToken() {
    return localStorage.getItem('token');
    }

    deleteToken() {
    console.log("inside delete token");
    localStorage.removeItem('token');
    this.status.next(false);
    }

    getUserPayload() {
        var token = this.getToken();
        console.log("Inside getUserPayload",token);
        if (token) {
          var userPayload = atob(token.split('.')[1]);
          return JSON.parse(userPayload);
        }
        else
          return null;
      }
      isLoggedIn() {
        console.log("Inside is login")
        var userPayload = this.getUserPayload();
        if (userPayload!=null)
        {
          console.log("token",userPayload);
          this.status.next(true);
          if(userPayload.exp > Date.now() / 1000)
          {
              return true;
          }
          else{
              this.deleteToken();
              this.status.next(false);
              return false;
          }
        }
        else
        {
            console.log("no token");
            this.status.next(false);
            return false;
        }
      }
}