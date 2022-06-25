import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class CheckLogin implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    console.log('Auth Guard Check Login');
    if (localStorage.getItem('user') !== null) {
      if (helper.decodeToken(JSON.parse(localStorage.getItem('user')).token.firstLogin)) {
        localStorage.clear();
        return true;
      }
      console.log('El rol es ', this.authService.getItemToken('role'));
      switch (this.authService.getItemToken('role')) {
        case 'admin':
          console.log('Entre aca admin');
          this.router.navigate(['/calendar-admin']);
          break;
        case 'viewer':
          console.log('Entre aca viewer');
     
          this.router.navigate(['/calendar-view']);
          break;
      }
    } else {
      localStorage.clear();
      return true;
    }
 
  }
}
