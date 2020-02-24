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

  constructor(private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder) { }
    
 
  ngOnInit() {
    var isLogged = this.authService.isAuthenticated();
    if (isLogged) {
      this.router.navigate(["/booking"]);
      return;
    }
    this.buildForm();
  }


  registerUser(form: any) {
    console.log(' ??????  ',this.regForm.value);
    this.authService.register(this.regForm.value).subscribe(
      data => this.handleRegisterResonse(data),
      err => console.log('Error in Registration........', err),
      () => console.log('HTTP request completed.')
    );

  }

  private handleRegisterResonse(apiResponse: RestResponse) {
    if (apiResponse.scode === '200') {
      this.regForm.reset();
      console.log('register sucess..........');
      this.router.navigate(["/login"]);
    }
  }

  redirectLogin() {
    this.regForm.reset();
    this.router.navigate(["/login"]);
  }

  buildForm() {
    this.regForm = this.formBuilder.group({
      fullName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      usrEmpId: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{6}')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    });
  }

  validationMessages = {
    'fullName': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minlength', message: 'Name must be at least 3 characters long.' }
    ],
    'usrEmpId': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'pattern', message: 'Password:min 5 chars,1 uppercase/lowercase/number.' }
    ],
  };

}
