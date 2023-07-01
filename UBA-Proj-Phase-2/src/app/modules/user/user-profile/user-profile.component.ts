import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userProfile: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // const userId = sessionStorage.getItem('userid'); // Retrieve the userid from sessionStorage
    // const userId = 1;
    const storedUserId = sessionStorage.getItem('userid') ?? ''; // Retrieve as a string, provide an empty string as the default value if null
    const userId = parseInt(storedUserId, 10); // Parse the string to a number

    this.http
      .get<any[]>('http://localhost:3000/userDetails')
      .subscribe((usersData: any[]) => {
        // Find the user with the matching userid
        this.userProfile = usersData.find((user) => user.id === userId);
      });
  }
}
