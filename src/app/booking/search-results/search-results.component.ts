import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
import { Booking } from 'src/app/_model/booking.model';
import { BookingService } from 'src/app/_service/booking.service';
import { ConstantService } from 'src/app/_service/constant.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  bookingList: Booking[];
  userID: string;
  searchClick: boolean;

  message:String;
  showMessge:boolean;

  constructor(private authService: AuthService, private bookingService: BookingService,
              private cons:ConstantService) {

  }

  ngOnInit() {
    this.bookingService.currentMessage.subscribe(data => {
      console.log('Data in Result Form ' + data);
      this.bookingList = data;
      console.log(this.bookingList)
    })

  }

  cancelBookedRoom(booking:Booking){
    console.log('Cancel Booking For : ' +booking);
    //if(booking.)
    var bookID = 18;
    this.bookingService. cancelBooking(Number(bookID)).subscribe(
      data => this.handleCanceledData(data),
      err=>this.handleError(err)
    )

  }

  handleCanceledData(data:any){
    console.log('Cancelled Success : ' +JSON.stringify(data))
  }


  handleError(err: HttpErrorResponse) {
    console.log('Error in Cancel........', JSON.stringify(err));
  }

  doCancelButtonEnabled(empID: string) {
    empID = '821386'; // hardcode for now---
    this.userID = localStorage.getItem(this.cons.userId)//this.authService.empId;
    if (this.userID === empID){
      return true;
    }
    else{
      return false;
    }
  }

}