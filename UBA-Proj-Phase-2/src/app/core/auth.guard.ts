import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginService, private router: Router) { }

  canActivate(): Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      return Promise.resolve(true);
    } else {
      // Redirect to the login page if not authenticated
      this.router.navigate(['/login']);
      return Promise.resolve(false);
    }
  }
}
