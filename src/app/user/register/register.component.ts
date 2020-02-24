import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';
import { RestResponse } from 'src/app/_model/rest-response.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
  submitted = false;


  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit() {

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

    console.log(' ??????  ', this.regForm.value);
    this.authService.register(this.regForm.value).subscribe(
      data => this.handleRegisterResonse(data),
      err => console.log('Error in Registration........', err),
      () => console.log('HTTP request completed.')
    );

  }

  private handleRegisterResonse(apiResponse: RestResponse) {
    if (apiResponse.scode === '200') {
      this.regForm.reset();
      console.log('register success..........');
      this.router.navigate(["/login"]);
    }
  }

  redirectLogin() {
    this.regForm.reset();
    this.router.navigate(["/login"]);
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