import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user.model';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { ConstantService } from '../_service/constant.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private cons: ConstantService, private spinner: NgxSpinnerService) { }

  user: User;

  ngOnInit() {
    this.authService.getUser(localStorage.getItem('user_id')).subscribe(data => {
      this.user = data;
      localStorage.setItem(this.cons.fullName, this.user.fullName);
    });
  }


  logout() {
    this.spinner.show();
    this.authService.logout();
    this.router.navigate['/login'];
    this.spinner.hide();

  }
}
