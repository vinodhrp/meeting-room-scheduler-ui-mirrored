import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private authService: AuthService
  ) { }




  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authService.isAuthenticated();
    if (currentUser) {
      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.authService.logout();
    this.router.navigate(["/login"]);
    return false;
  }

}
