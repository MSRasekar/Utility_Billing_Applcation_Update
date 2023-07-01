import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public loginService: LoginService) {}

  logout(): void {

    this.loginService.logout();
    // Remove user id from session storage on logout
    sessionStorage.removeItem('userid');
  }
}
