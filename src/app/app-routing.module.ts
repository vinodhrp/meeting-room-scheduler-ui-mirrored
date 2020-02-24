import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BookingComponent } from './booking/booking.component';
import { SearchFormComponent } from './booking/search-form/search-form.component';
import { SearchResultsComponent } from './booking/search-results/search-results.component';
import { AuthGuard } from './_guard/auth-guard';


const routes: Routes = [
  {path:"",component: LoginComponent},
  //{path:"**",component: LoginComponent},
  {path:"login",component: LoginComponent},
  {path:"register",component: RegisterComponent},
  {path:"booking",component: BookingComponent, canActivate: [AuthGuard]},
  {path:"search-form",component: SearchFormComponent, canActivate: [AuthGuard]},
  {path:"search-result",component: SearchResultsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
