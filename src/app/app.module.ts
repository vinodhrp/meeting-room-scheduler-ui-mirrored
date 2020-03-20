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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BookingService } from './_service/booking.service';
import { ConstantService } from './_service/constant.service';
import { RouterModule } from '@angular/router';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { DateTimeFormatPipe } from './date-time-format-pipe';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerComponent } from './spinner/spinner.component';
import{ jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler'; 
import { BookingSchedulerComponent } from './booking-scheduler/booking-scheduler.component';
import { BookingSchedulerComponentCopy } from './booking-scheduler-copy/booking-scheduler-copy.component';
import {MatRadioModule} from '@angular/material/radio';
import { NgxAaaDatepickerModule } from 'ngx-aaa-datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { DatepickerDialogueComponent } from './datepicker-dialogue/datepicker-dialogue.component';
import { 
  OwlDateTimeModule, 
  OwlNativeDateTimeModule 
} from 'ng-pick-datetime';
import { BookingSchedulerComponentUpdate } from './booking-scheduler-update/booking-scheduler-update.component';
import { jqxExpanderModule }   from 'jqwidgets-ng/jqxexpander';




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
    LeftNavigationComponent,
    BottomNavigationComponent,
    DateTimeFormatPipe,
    SpinnerComponent,
    BookingSchedulerComponent,
    jqxSchedulerComponent,
    DatepickerDialogueComponent,
    BookingSchedulerComponentCopy,
    BookingSchedulerComponentUpdate
  ],
  entryComponents: [
    DatepickerDialogueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    NgxMaterialTimepickerModule,
    NgxSpinnerModule,
    MatRadioModule,
    NgxAaaDatepickerModule,
    MatDialogModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatChipsModule,
    jqxExpanderModule
    
  ],
  providers: [
    AuthService,
    BookingService,
    ConstantService,
    RouterModule,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptService, multi: true },
    {provide : LocationStrategy , useClass: HashLocationStrategy}
    
  ],
  bootstrap: [AppComponent]

})

export class AppModule { }
