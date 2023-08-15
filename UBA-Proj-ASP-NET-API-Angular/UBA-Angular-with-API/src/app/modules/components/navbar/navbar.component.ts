import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service'; // Update the service import

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(public authService: AuthenticationService,    private router: Router,) {} // Update the service instance name

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getDashboardLink(): string {
    if (this.authService.isUserAdmin()) {
      return '/admin';
    } else {
      return '/user';
    }
  }
}
