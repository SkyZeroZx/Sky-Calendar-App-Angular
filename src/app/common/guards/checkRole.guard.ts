import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth/auth.service';
 const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class CheckRole implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate() {
    console.log('Check Role');
    console.log(window.location.href);
    if (JSON.parse(localStorage.getItem('user')) == null) {
      this.router.navigate(["/login"]);
      return false;
    }
    switch (this.authService.getItemToken('role')) {
      case 'admin':
        console.log('Role ' , this.authService.getItemToken('role'));
        if (window.location.href.includes('calendar-view')) {
          //  this.router.navigate(["/calendar-admin"]);
          return false;
        } else {
          return true;
        }
      case 'viewer':
        console.log('Role ' , this.authService.getItemToken('role'));
        if (
          window.location.href.includes('calendar-admin') ||
          window.location.href.includes('users')
        ) {
          //  this.router.navigate(["/calendar-view"]);
          return false;
        } else {
          return true;
        }
      default:
        return false;
    }
  }
}
