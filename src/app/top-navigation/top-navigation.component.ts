import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user.model';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  user: User;

  ngOnInit() {
    console.log('In TopNavigationComponent : Trying to fetch User Info : ')
    this.authService.getUser(localStorage.getItem('user_id')).subscribe(data => {
      this.user = data;
      console.log("In TopNavigationComponent : User Info of LoggedIn User : ", this.user);
      localStorage.setItem('full_name', this.user.fullName);
    });
  }


  logout(){
    this.authService.logout();
    this.router.navigate['/login'];
  }

}
