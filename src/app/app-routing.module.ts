import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './user/auth/auth.guard';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { UserDetailComponent } from './user/userdetails/userdetails.component';
import { UserProfileComponent } from './user/userprofile/userprofile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userProfile', component: UserProfileComponent,canActivate:[AuthGuard] },
  { path: 'userDetails', component: UserDetailComponent,canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }