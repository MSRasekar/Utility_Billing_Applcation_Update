import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-track-status',
  templateUrl: './track-status.component.html',
  styleUrls: ['./track-status.component.css']
})
export class TrackStatusComponent implements OnInit {
  applicationStatusForm!: FormGroup;
  applicationStatus: string | null = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.applicationStatusForm = this.formBuilder.group({
      mobileNumber: ['', [Validators.required]]
    });
  }

  getApplicationStatus(): void {
    if (this.applicationStatusForm.invalid) {
      return;
    }

    const mobileNumber = this.applicationStatusForm.value.mobileNumber;

    this.http.get<any[]>('http://localhost:3000/userDetails').subscribe((userDetails: any[]) => {
      const user = userDetails.find(user => user.mobileNumber === +mobileNumber);
      if (user) {
        this.applicationStatus = user.applicationStatus;
      } else {
        this.applicationStatus = null;
      }
    }, (error) => {
      console.error('An error occurred while fetching user details:', error);
    });
  }
}
