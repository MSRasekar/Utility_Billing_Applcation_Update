import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-meter-details',
  templateUrl: './meter-details.component.html',
  styleUrls: ['./meter-details.component.css']
})
export class MeterDetailsComponent {
  
  userProfile: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  
    const storedUserId = sessionStorage.getItem('userid') ?? ''; 
    const userId = parseInt(storedUserId, 10); 

    this.http
      .get<any[]>('http://localhost:3000/userDetails')
      .subscribe((usersData: any[]) => {
        // Find the user with the matching userid
        this.userProfile = usersData.find((user) => user.id === userId);
      
      });
  }
}
