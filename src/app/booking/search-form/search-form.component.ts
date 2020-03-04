import { Component, OnInit, PipeTransform, ViewChild, ElementRef } from '@angular/core';
import { BookingService } from 'src/app/_service/booking.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Room } from 'src/app/_model/room.model';
import { RoomService } from 'src/app/_service/room.service';
import { Booking } from 'src/app/_model/booking.model';
import { DateTimeFormatPipe } from "../../date-time-format-pipe"
import { Subscription } from 'rxjs';
import { ConstantService } from 'src/app/_service/constant.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/_service/error-handler.service';
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
  currentTime = "00:00 am";
  currentMinutesRemainder: any;
  minToTime: any;
  fromState: boolean = true;
  toState: boolean = true;
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
  errorThrown: boolean;
  fTime: any;
  toTime: any;
  bookingForm: FormGroup;
  formFieldValues: Booking;
  errorMsg: any;

  @ViewChild('ft', { static: true }) FT: ElementRef;
  @ViewChild('tt', { static: true }) TT: ElementRef;
  @ViewChild('dt', { static: true }) DATE: ElementRef;
  @ViewChild('purpose', { static: true }) PURPOSE: ElementRef;
  @ViewChild('rId', { static: true }) ID: ElementRef;




  constructor(private service: BookingService, private formBuilder: FormBuilder, private roomService: RoomService,
    private cons: ConstantService, private router: Router, private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService) {

    this.searchForm = this.formBuilder.group({});
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear, currentMonth, currentDay);
    this.maxDate = new Date(currentYear, currentMonth, currentDay + 6);
    this.currentHour = new Date().getHours();
    this.currentMinutes = new Date().getMinutes();
    this.currentMinutesRemainder = this.currentMinutes % 5;

  }

  ngOnInit(): void {
    this.fullName = localStorage.getItem(this.cons.fullName);
    this.usrEmpId = Number(localStorage.getItem(this.cons.userId));
    this.roomService.getAllRooms().subscribe(rooms => {
      this.roomList = rooms;
    })

    // this.errorHandler.errorObj.asObservable().subscribe(error => {
    //   console.log('Errror in Search Form : ' + error); // will return false if http error
    //   this.errorThrown = error;
    // });

  }

  calculateDate(date) {
    let asim = new DateTimeFormatPipe(date);
    this.fromState = false;
    this.FT.nativeElement.value = "";
    this.TT.nativeElement.value = "";

    let da = asim.transform2(new Date().toLocaleDateString());
    if (date.value == da) {
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
    else {
      this.currentTime = "00:00 am";
    }
  }

  calculateTime(time) {
    if (time.length > 0) {
      if (time.substr(time.length - 2) == "PM") {
        if (time.substr(0, time.indexOf(":")) != "12") {
          this.fTime = (12 + parseInt(time.substr(0, time.indexOf(':')))) + ":" + time.substr(time.indexOf(':') + 1, 2) + ":00"
        }
        else {
          this.fTime = time.substr(0, time.length - 3) + ":00"
        }
      } else {
        if (time.substr(0, time.indexOf(':')).length === 2) {
          return (time.substr(0, time.length - 3) + ":00");
        }
        else {
          return ("0" + time.substr(0, time.length - 3) + ":00");
        }
      }
    }
  }
  fetchBookedData(roomId: any, date: any, fTime: any, toTime: any, reason: any) {
    fTime = fTime.value;
    toTime = toTime.value;
    date = date.value;
    reason = reason.value;
    roomId = roomId.value;
    if (date == "") {
      this.errorMsg = "Date is mandatory";

    }
    else {
      this.errorMsg = "";
      let asim = new DateTimeFormatPipe(date);
      var bookDate = asim.transform(date);
      this.fTime = this.calculateTime(fTime);
      this.toTime = this.calculateTime(toTime);

      console.log('Search Values... : ', +roomId + ' ' + this.fTime + ' ' + this.toTime + ' ' + date + ' ' + reason);
      let searchInfo = new Booking(roomId, this.usrEmpId, this.fullName, bookDate, fTime, toTime, reason);
      this.service.getAllLists(searchInfo).subscribe(
        data => this.handleSearchData(data),
        error => this.handleError(error)
      )
    }
  }
  
  
  handleSearchData(data: Booking[]) {
    console.log('Data : ' + data.length);
    if (data.length > 0) {
      this.service.changeMessage(data);
    } else {
      this.service.changeMessage([]);
    }
  }


   handleSearchData(data:Booking[]){
    console.log('Data : ' + data.length);
    if (data.length > 0) {
      this.service.changeMessage(data);
    } else {
      this.service.changeMessage([]);
    }
  }

  bookRoom(roomId: any, date: any, fTime: any, toTime: any, reason: any) {
    fTime = fTime.value;
    toTime = toTime.value;
    date = date.value;
    reason = reason.value;
    roomId = roomId.value;
    if (fTime == "" || toTime == "" || date == "" || roomId == "") {
      this.errorMsg = "All Fields are mandatory";
    }
    else {
      this.errorMsg = "";
      let asim = new DateTimeFormatPipe(date);
      var bookDate = asim.transform(date);

      this.fTime = this.calculateTime(fTime);
      this.toTime = this.calculateTime(toTime);
      console.log('Booking Values... : ', +roomId + ' ' + fTime + ' ' + toTime + ' ' + date + ' ' + reason);
      let bookingDetail = new Booking(roomId, this.usrEmpId, this.fullName, bookDate, this.fTime, this.toTime, reason);

      this.service.bookRoom(bookingDetail)
        .subscribe(
          data => this.handleBookedRoomData(data, bookingDetail),
          err => this.handleError(err)
        )

    let asim = new DateTimeFormatPipe(date);
    var bookDate = asim.transform(date);

    if (fTime.substr(fTime.length - 2) == "PM") {
      fTime = (parseInt(fTime.substr(0, fTime.indexOf(':'))) + 12) + ":" + parseInt(fTime.substr(fTime.indexOf(':') + 1, 3)) + ":00";
    } else {
      fTime = fTime.substr(0, fTime.length - 3) + ":00";
    }
  }

  handleBookedRoomData(data: any, bookingDetail: Booking) {
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
        data => this.handleBookedRoomData(data,bookingDetail),
        err => this.handleError(err) 
      )
  }

  handleBookedRoomData(data:any,bookingDetail:Booking){
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
  }


  handleError(err: HttpErrorResponse) {
    console.log('Error in Book/Search........', JSON.stringify(err));
  }

  reset() {
    console.log('reset.............')
    this.FT.nativeElement.value = "";
    this.TT.nativeElement.value = "";
    this.DATE.nativeElement.value = "";
    this.PURPOSE.nativeElement.value = "";    
    this.router.navigate(['/booking'], { relativeTo: this.route });
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