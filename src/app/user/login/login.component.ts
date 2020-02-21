
import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';
import { OAuth } from 'src/app/_model/o-auth.model';
import { Login } from 'src/app/_model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modelLogin = new Login(null, null);

  

  loginForm = new FormGroup({
    Username: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    Password: new FormControl('', [Validators.required, this.noWhitespaceValidator])
  });
 

  constructor(private authService:AuthService,
              private router:Router ) { }

  ngOnInit(): void {
  }

  onSubmit1(heroForm): void {
    console.log('onsubmit');
    console.log(this.UserName.value);
    console.log(this.Password.value);
  }


  onSubmit(form: any) {//of Type NgForm
    this.loginForm.markAllAsTouched();
    this.authService.aunthenticate(this.UserName.value, this.Password.value)
        .subscribe(
            data => (this.redirecToDashBoard(data)),
            err => console.log('Bad Credentials........', err)
    )
  }

  redirecToDashBoard(oauth: OAuth) {
    console.log('Login Success with User Id ........', this.UserName.value)
    if (oauth != null && oauth.access_token != null) {
      this.router.navigate(["/booking"]);
    }
  }

  get UserName() {
    return this.loginForm.get('Username');
  }

  get Password() {
    return this.loginForm.get('Password');
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

}
