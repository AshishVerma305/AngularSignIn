import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Form, FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";


export interface User {
    fullName: string;
    email: string;
    username: string;
    address: string;
    mobile:string;
  }

@Component({
   selector:'app-user-details',
   templateUrl:'./userdetails.component.html',
   styleUrls:['./userdetails.component.css']
})
export class UserDetailComponent implements OnInit{
    displayedColumns: string[] = ['fullName', 'email', 'username', 'address','mobile'];
    dataSource ;
    searchViewActive=false;
    myControl = new FormControl();
  options: User[] = [
  ];
  filteredOptions: Observable<User[]>;

  constructor(private http:HttpClient,private authService:AuthService) { }
  ngOnInit() {
    this.http.get("http://localhost:8000/api/getAllUsers",{
        headers: new HttpHeaders({'Authorization':'Bearer ' +this.authService.getToken()})
    }).subscribe(data=>{
        data['user'].map(user=>{
        const u:User={fullName:user['fullName'],email:user['email'],username:user['username'],address:user['address'],mobile:user['mobile']}
        this.options.push(u);
        });
        console.log(this.options);
        
    },err=>
    {
        console.log(err);
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.email)),
      map(email => (email ? this._filter(email) : this.options.slice()))
    );
  }

  displayFn(user?: User): string | undefined {
    return user ? user.email : undefined;
  }

  private _filter(email: string): User[] {
    const filterValue = email.toLowerCase();

    return this.options.filter(
      option => option.email.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onSearch(userData)
  {
    if(userData.value!=null||userData.value!=undefined)
    {
        console.log(userData.value);
        this.searchViewActive=true;
        let userInfo = this.options.find(o => o.email === userData.value);
        this.dataSource=[{fullName: userInfo.fullName,email: userInfo.email,username: userInfo.username,address: userInfo.address,mobile:userInfo.mobile}];
        console.log(userInfo);
        console.log(this.dataSource);
    }
    else{
        this.searchViewActive=false;
    }
    
  }
}