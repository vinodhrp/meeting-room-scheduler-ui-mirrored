import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BookingComponent } from './booking/booking.component';
import { SearchFormComponent } from './booking/search-form/search-form.component';
import { SearchResultsComponent } from './booking/search-results/search-results.component';


const routes: Routes = [
  {path:"",component: LoginComponent},
  {path:"login",component: LoginComponent},
  {path:"register",component: RegisterComponent},
  {path:"booking",component: BookingComponent},
  {path:"search-form",component: SearchFormComponent},
  {path:"search-result",component: SearchResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
