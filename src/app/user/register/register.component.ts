import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';
import { RestResponse } from 'src/app/_model/rest-response.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
  submitted = false;
  regErrorMsg: String;
  showError: boolean;


  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.showError = false;
    var isLogged = this.authService.isAuthenticated();
    if (isLogged) {
      this.router.navigate(["/booking"]);
      return;
    }

    this.regForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      usrEmpId: ['', [Validators.required, Validators.pattern("[0-9]*")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]

    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.regForm.controls; }

  registerUser(form: any) {
    this.submitted = true;
    if (this.regForm.invalid) {
      return;
    }

    console.log(' Reg Form Values :   ', this.regForm.value);
    this.authService.register(this.regForm.value).subscribe(
      data => this.handleRegisterResonse(data),
      err => {
        console.log('Error in Registration........', err);
        this.handleInvalidReg(err);
      }
    );

  }

  private handleRegisterResonse(apiResponse: HttpResponse<RestResponse>) {
    console.log('register success..........', apiResponse.status);
    if (apiResponse.status == 201) {
      this.authService.showMessage = true;
      this.router.navigate(["/login"]);
    } else {
      this.showError = true;
      this.regErrorMsg = 'Error In Registration  !!!';
      this.router.navigate(["/register"]);
    }
  }

  redirectLogin() {
    this.regForm.reset();
    this.router.navigate(["/login"]);
  }

  handleInvalidReg(err: HttpErrorResponse) {
    this.showError = true;
    this.regErrorMsg = err.error.message + '  !!!';
    console.log('err ' + err);
    this.router.navigate(["/register"]);
  }


  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}