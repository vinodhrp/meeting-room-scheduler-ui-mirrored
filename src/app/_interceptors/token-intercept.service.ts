import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../_service/auth.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ConstantService } from '../_service/constant.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptService implements HttpInterceptor {

  constructor(private auth: AuthService,
              private router: Router,
              private cons: ConstantService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isAuthenticated = this.auth.isAuthenticated();

    if (!isAuthenticated) {
      return next.handle(request).pipe(
        catchError((err) => this.handleAuthHTTPErrorResponse(err)));
    }

    request = this.addTokenToAuthenticatedRequest(request);
    return next.handle(request);

  }

  addTokenToAuthenticatedRequest(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem(this.cons.accessToken)}`
      }
    });
  }

  handleAuthHTTPErrorResponse(err: any) {
    console.error(err + ' In Auth ' +err.status);
    this.tokenExpiredHandler();
    return throwError(err);

  }

  tokenExpiredHandler(){
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

}
