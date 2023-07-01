import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticated = false;
  private username = '';
  private role = '';

  constructor(private http: HttpClient, private router: Router) { }

  async login(username: string, password: string): Promise<any> {
    const loginData = { username, password };
    const loginUrl = 'http://localhost:3000/userDetails';

    try {
      const response: any = await this.http.get(loginUrl).toPromise();
      const matchingUser = response.find((user: any) => user.username === username && user.password === password);

      if (matchingUser) {
        this.isAuthenticated = true;
        this.username = username;
        this.role = matchingUser.role; // Set the user's role
        return matchingUser; // Return the logged-in user object
      }
      return null;
    } catch (error) {
      console.error('An error occurred during login:', error);
      return null;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.username = '';
    this.role = '';
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUsername(): string {
    return this.username;
  }

  getRole(): string {
    return this.role;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }
}
