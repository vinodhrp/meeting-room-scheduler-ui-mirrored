import { Component, OnInit} from '@angular/core';
import { BookingService } from 'src/app/_service/booking.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Room } from 'src/app/_model/room.model';
import { RoomService } from 'src/app/_service/room.service';
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  roomList: Room[];
  minDate: Date;
  maxDate: Date;
  selectedDate: any;
  currentHour: any;
  currentMinutes: any;
  currentTime: any;
  currentMinutesRemainder: any;
  minToTime: any;
  toState  = true

  searchForm: FormGroup;
  blueTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#3591ab',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#46cdf2',
    },
    clockFace: {
      clockFaceBackgroundColor: '#46cdf2',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff'
    }
  };

  constructor(private service: BookingService, private formBuilder: FormBuilder, private roomService: RoomService) {

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
    this.roomService.getAllRooms().subscribe((data: Room[]) => {
      this.roomList = [...data]
    })

  }


  fetchBookedData() {
    console.log("search");
    //this.service.fetchBookedData();
  }

  bookRoom() {
    console.log("search");
    //this.service.bookRoom();
  }

  setMinToTime(minute: HTMLInputElement) {
    let selectedTime = (minute.value);
    let maxHour = parseInt(selectedTime.substr(0, selectedTime.indexOf(':')));
    let maxMinute = parseInt(selectedTime.substr(selectedTime.indexOf(':') + 1, 3)) + 15;
    let type = selectedTime.substr(selectedTime.length - 2);
    if (maxMinute >= 60) {
      maxMinute -= 60;
      maxHour += 1;
      if (maxHour === 12) {
        if (type === "pm") {
          type = "am";
        }
        else {
          type = "pm"
        }
      }
    }
    this.minToTime = maxHour + ":" + maxMinute + " " + type;
    this.toState = false;

  }

}