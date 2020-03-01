import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
import { Booking } from 'src/app/_model/booking.model';
import { BookingService } from 'src/app/_service/booking.service';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  bookingList: Booking[];
  userID: string;
  searchClick: boolean;


  constructor(private authService: AuthService, private bookingService: BookingService) {

  }

  ngOnInit() {
    this.bookingService.currentMessage.subscribe(data => {
      console.log('Data in Result Form ' + data);
      this.bookingList = data;
      console.log(this.bookingList)
    })

  }

  sameUser(empID: string) {
    this.userID = this.authService.empId;
    if (this.userID === empID)
      return true;
    else
      return true;
  }

}