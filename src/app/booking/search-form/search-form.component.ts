import { Component, OnInit, PipeTransform } from '@angular/core';
import { BookingService } from 'src/app/_service/booking.service';
import { FormGroup, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { Room } from 'src/app/_model/room.model';
import { RoomService } from 'src/app/_service/room.service';
import { Booking } from 'src/app/_model/booking.model';
import { Time, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ConstantService } from 'src/app/_service/constant.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
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
  toState: boolean = true
  searchClick: boolean;
  roomId: number;
  ftime: any;
  searchForm: FormGroup;
  bookingFailedMesg: string;
  subscription: Subscription;
  bookingSuccessMsg: String;
  showSuccess: boolean;
  fullName: String;
  usrEmpId: number;


  constructor(private service: BookingService, private formBuilder: FormBuilder, private roomService: RoomService,
    private cons: ConstantService,private router:Router,private route:ActivatedRoute) {

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
      } else {
        this.currentTime = (this.currentHour) + ":" + (this.currentMinutes + (5 - this.currentMinutesRemainder)) + " am";
      }
    } else if (this.currentHour === 12) {
      if (this.currentMinutes > 55) {
        this.currentTime = "1:00 pm";
      } else {
        this.currentTime = (this.currentHour) + ":" + (this.currentMinutes + (5 - this.currentMinutesRemainder)) + " pm";
      }
    } else {
      if (this.currentMinutes > 55) {
        this.currentTime = (this.currentHour) + 1 + ":00 pm";
      } else {
        this.currentTime = (this.currentHour) + ":" + (this.currentMinutes + (5 - this.currentMinutesRemainder)) + " pm";
      }
    }

  }

  ngOnInit(): void {
    this.fullName = localStorage.getItem(this.cons.fullName);
    this.usrEmpId = Number(localStorage.getItem(this.cons.userId));
    this.roomService.getAllRooms().subscribe(rooms => {
      this.roomList = rooms;
    })
  }


  fetchBookedData(roomId: any, date: any, fTime: any, toTime: any, reason: any) {
    fTime = fTime.value;
    toTime = toTime.value;
    date = date.value;
    reason = reason.value;
    roomId = roomId.value;


    class DateTimeFormatPipe extends DatePipe implements PipeTransform {
      transform(inputDate: any): any {
        var datePipe = new DatePipe("en-US");
        return datePipe.transform(inputDate, 'yyyy-MM-dd');
      }
    }

    let asim = new DateTimeFormatPipe(date);
    var bookDate = asim.transform(date);

    if (fTime.length > 0) {
      if (fTime.substr(fTime.length - 2) == "PM") {
        fTime = (parseInt(fTime.substr(0, fTime.indexOf(':'))) + 12) + ":" + parseInt(fTime.substr(fTime.indexOf(':') + 1, 3)) + ":00";
      } else {
        fTime = toTime.substr(0, fTime.length - 3) + ":00";
      }
    }

    if (toTime.length > 0) {
      if (toTime.substr(toTime.length - 2) == "PM") {
        toTime = (parseInt(toTime.substr(0, toTime.indexOf(':'))) + 12) + ":" + parseInt(toTime.substr(toTime.indexOf(':') + 1, 3)) + ":00";
      } else {
        console.log("TO TIME " + toTime);
        toTime = toTime.substr(0, toTime.length - 3) + ":00";
      }
    }

    console.log('Search Values... : ', +roomId + ' ' + fTime + ' ' + toTime + ' ' + date + ' ' + reason);
    let searchInfo = new Booking(roomId, this.usrEmpId, this.fullName, bookDate, fTime, toTime, reason);
    this.service.getAllLists(searchInfo).subscribe(data => {
      console.log('Data : ' + data.length);
      if (data.length > 0) {
        this.service.changeMessage(data);
      } else {
        this.service.changeMessage([]);
      }

    });

  }



  bookRoom(roomId: any, date: any, fTime: any, toTime: any, reason: any) {
    fTime = fTime.value;
    toTime = toTime.value;
    date = date.value;
    reason = reason.value;
    roomId = roomId.value;

    class DateTimeFormatPipe extends DatePipe implements PipeTransform {
      transform(inputDate: any): any {
        var datePipe = new DatePipe("en-US");
        return datePipe.transform(inputDate, 'yyyy-MM-dd');
      }
    }

    let asim = new DateTimeFormatPipe(date);
    var bookDate = asim.transform(date);

    if (fTime.substr(fTime.length - 2) == "PM") {
      fTime = (parseInt(fTime.substr(0, fTime.indexOf(':'))) + 12) + ":" + parseInt(fTime.substr(fTime.indexOf(':') + 1, 3)) + ":00";
    } else {
      fTime = fTime.substr(0, fTime.length - 3) + ":00";
    }

    if (toTime.substr(toTime.length - 2) == "PM") {
      toTime = (parseInt(toTime.substr(0, toTime.indexOf(':'))) + 12) + ":" + parseInt(toTime.substr(toTime.indexOf(':') + 1, 3)) + ":00";
    } else {
      console.log("TO TIME " + toTime);
      toTime = toTime.substr(0, toTime.length - 3) + ":00";
    }
    console.log('Booking Values... : ', +roomId + ' ' + fTime + ' ' + toTime + ' ' + date + ' ' + reason);
    let bookingDetail = new Booking(roomId, this.usrEmpId, this.fullName, bookDate, fTime, toTime, reason);

    this.service.bookRoom(bookingDetail)
      .subscribe(
        data => {
          if (data.status == 200) {
            this.bookingSuccessMsg = "Booked Successfully !!!";
            this.showSuccess = true;
            this.service.getAllLists(bookingDetail).subscribe(data => {
              if (data.length > 0) {
                this.service.changeMessage(data);
              } else {
                this.service.changeMessage([]);
              }
        
            });
          }
        });
    err => {
      this.handleError(err);
    }
  }


  handleError(err: HttpErrorResponse) {
    console.log('Error in Book/Search........', err)
  }

  reset() {
    console.log('reset.............')
    this.router.navigate(['/booking'],{relativeTo: this.route});
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