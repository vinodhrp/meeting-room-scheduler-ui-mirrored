import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BookingComponent } from './booking/booking.component';
import { SearchFormComponent } from './booking/search-form/search-form.component';
import { SearchResultsComponent } from './booking/search-results/search-results.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { LeftNavigationComponent } from './left-navigation/left-navigation.component';
import { AuthService } from './_service/auth.service';
import { TokenInterceptService } from './_interceptors/token-intercept.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BookingComponent,
    SearchFormComponent,
    SearchResultsComponent,
    NavbarComponent,
    TopNavigationComponent,
    LeftNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptService, multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
