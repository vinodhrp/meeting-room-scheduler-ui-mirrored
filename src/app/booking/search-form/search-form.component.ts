import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
  minToTime: any;



  searchForm: FormGroup;
  greenTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#80c775',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#2ba318',
    },
    clockFace: {
      clockFaceBackgroundColor: '#2ba318',
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
      if (this.currentMinutes > 55) {
        this.currentTime = ((this.currentHour) + 1) + ":00 am";
      }
      else {
        this.currentTime = (this.currentHour) + ":" + (this.currentMinutes + (5 - this.currentMinutesRemainder)) + " am";
      }
    }
    else if (this.currentHour === 12) {
      if (this.currentMinutes > 55) {
        this.currentTime = "1:00 pm";
      }
      else {
        this.currentTime = (this.currentHour) + ":" + (this.currentMinutes + (5 - this.currentMinutesRemainder)) + " pm";
      }
    }
    else {
      if (this.currentMinutes > 55) {
        this.currentTime = (this.currentHour) + 1 + ":00 pm";
      }
      else {
        this.currentTime = (this.currentHour) + ":" + (this.currentMinutes + (5 - this.currentMinutesRemainder)) + " pm";
      }
    }

  }

  ngOnInit(): void {
    //this.roomList = this.service.fetchRoomList();

  }

 
  fetchBookedData() {
    console.log("search");
    //this.service.fetchBookedData();
  }

  bookRoom() {
    console.log("search");
    //this.service.bookRoom();
  }

  setMinToTime() {
    let selectedMinute = null;//(document.getElementById("fromTime").value).slice(2, 4);
    let maxHour = this.currentHour;
    let maxMinute = parseInt(selectedMinute) + 15;
    if (maxMinute >= 60) {
      maxMinute -= 60;
      maxHour += 1;
    }
    this.minToTime = maxHour + ":" + maxMinute + " pm";
  }

}