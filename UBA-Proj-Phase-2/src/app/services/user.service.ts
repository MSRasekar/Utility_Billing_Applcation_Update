import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userListUrl = 'http://localhost:3000/userDetails';

  constructor(private http: HttpClient) {}

  getUserList(): Observable<any[]> {
    return this.http.get<any[]>(this.userListUrl);
  }
}
