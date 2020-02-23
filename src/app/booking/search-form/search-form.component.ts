import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/_service/booking.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  selectedDate: any;
  currentHour: any;
  currentMinutes: any;
  currentTime: any;
  currentMinutesRemainder: any;


  searchForm: FormGroup;
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff'
    }
  };

  public roomList: any[];
  constructor(private service: BookingService, private formBuilder: FormBuilder) {

    this.searchForm = this.formBuilder.group({});

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear, currentMonth, currentDay);
    this.maxDate = new Date(currentYear, currentMonth, currentDay + 6);
    this.currentHour = new Date().getHours();
    this.currentMinutes = new Date().getMinutes();
    this.currentMinutesRemainder = this.currentMinutes % 5;

    if (this.currentHour < 12) {
      this.currentTime = this.currentHour + ":" + this.currentMinutes + " am";
    }
    else {
      this.currentTime = (this.currentHour - 12) + ":" + (this.currentMinutes + (5 - this.currentMinutesRemainder)) + " pm";
    }

  }

  ngOnInit(): void {
    //this.roomList = this.service.fetchRoomList();


  }

  selectDate(date: any) {
    this.selectedDate = date;
    console.log(this.selectedDate);
  }
  fetchBookedData() {
    console.log("search");
    //this.service.fetchBookedData();
  }

  bookRoom() {
    console.log("search");
    //this.service.bookRoom();
  }

log(){
  console.log("Hii");
}

}