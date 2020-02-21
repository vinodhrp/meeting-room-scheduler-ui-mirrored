import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_model/user.model';

import { HttpClient, HttpParams } from '@angular/common/http';
import { RestResponse } from '../_model/rest-response.model';
import { OAuth } from '../_model/o-auth.model';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';


  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<RestResponse> {
    console.log('Value Of User in ng : ' ,user);
    return this.httpClient.post<RestResponse>(this.baseUrl + '/openapi/register', user);
  }


  aunthenticate(username: string, password: string): Observable<OAuth> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    const headers = {
      'Authorization': 'Basic ' + btoa('glassdoor:glassdoor'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    console.log('Req Header : ' , headers);
    console.log('Req Body : ' , body);
    return this.httpClient.post<OAuth>(this.baseUrl + '/oauth/token', body, { headers })
      .pipe(tap(token => this.saveAuthDetailsToStorage(token, username)));
  }

  private saveAuthDetailsToStorage(token: OAuth, username: string) {
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('user_id', username);
  }
}
