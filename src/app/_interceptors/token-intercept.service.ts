import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../_service/auth.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ConstantService } from '../_service/constant.service';
import { ErrorHandlerService } from '../_service/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptService implements HttpInterceptor {

  public errObj = false;

  constructor(private auth: AuthService,
    private router: Router,
    private cons: ConstantService,
    private errorService: ErrorHandlerService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isAuthenticated = this.auth.isAuthenticated();

    if (!isAuthenticated) {
      return next.handle(request).pipe(
        catchError((err) => this.handleAuthHTTPErrorResponse(err)));
    }

    request = this.addTokenToAuthenticatedRequest(request);
    return next.handle(request).pipe(
      catchError((err) => this.handleAuthHTTPErrorResponse(err)));

  }

  addTokenToAuthenticatedRequest(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem(this.cons.accessToken)}`
      }
    });
  }

  handleAuthHTTPErrorResponse(error: any) {
    console.error(error + ' In Interceptor Error Code is :  ' + error);
   // console.error(error + ' In Interceptor Error Code is :  ' + error && error.error.error ? error.error.error : 'Something went wrong !!!');


    if (error instanceof HttpErrorResponse) {
      if (error.status === 401 && (error.error != null && error.error.error != 'Unauthorized')) {
        console.log('Token Invalid Excpetion thrown..........')
        this.tokenExpiredHandler(); //Invalid token
      } else {
        this.errorService.errorObj.next(true);
        //return the error to the method that called it
        let data = {};
        data = {
          message: error && error.error ? error.error.message : 'Something went wrong !!!',
          reason: error && error.error ? error.error.error : 'Something went wrong !!!',
          status: error.status
        };
        console.log('Error thrown to component : ' +JSON.stringify(data));
        return throwError(data);
      }
    } else {
      this.tokenExpiredHandler();
    }
  }

  tokenExpiredHandler() {
    this.auth.logout();
    this.auth.showAuthError = true;
    this.router.navigate(["/login"]);
  }

}
