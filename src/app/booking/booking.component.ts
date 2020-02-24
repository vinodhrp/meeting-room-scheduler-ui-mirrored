import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { User } from '../_model/user.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  constructor(private authService:AuthService) { }

  user:User;

  ngOnInit() {
    console.log('In Booking Component : Trying to fetch User Info : ')
    this.authService.getUser(localStorage.getItem('user_id')).subscribe(data => {
      this.user= data;
      console.log("In Booking Component : User Info of LoggedIn User : ", this.user);
      localStorage.setItem('full_name',this.user.fullName);
    });
  }

}
