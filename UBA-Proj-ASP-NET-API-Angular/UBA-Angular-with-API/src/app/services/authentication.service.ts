import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserRegistrationDTO } from '../_models/auth-models/userRegistrationDTO';
import { RegistrationResponseDTO } from '../_models/auth-models/registrationResponseDTO';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAuthenticationDTO } from '../_models/auth-models/userAuthenticationDTO';
import { AuthResponseDTO } from '../_models/auth-models/authResponseDTO';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();

  constructor(
    private http: HttpClient,
    private envUrl:EnvironmentUrlService ,
    private jwtHelper: JwtHelperService
  ) {}

  public registerUser = (route: string, body: UserRegistrationDTO) => {
    debugger;
    var data = this.http.post<RegistrationResponseDTO>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      body
    );

    return data;
  };

  public loginUser = (route: string, body: UserAuthenticationDTO) => {
    var data = this.http.post<AuthResponseDTO>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      body
    );
    return data;
  };

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  };

  public forgotPassword = (route: string, body: any) => {
    return this.http.post(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      body
    );
  };

  public resetPassword = (route: string, body: any) => {
    return this.http.post(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      body
    );
  };

  public logout = () => {
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification(false);
    
  };

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');

    if (!token) {
      return false; // No token, so not authenticated
    }

    return !this.jwtHelper.isTokenExpired(token);
  };

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem('token');

    if (!token) {
      return false; // No token, so not an admin
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    return role === 'Admin' || role === 'SuperAdmin'; // Check for both 'Admin' and 'SuperAdmin'
  };

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };
}
