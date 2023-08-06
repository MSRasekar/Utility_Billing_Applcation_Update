import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-raise-complaint',
  templateUrl: './raise-complaint.component.html',
  styleUrls: ['./raise-complaint.component.css']
})
export class RaiseComplaintComponent implements OnInit {
  complaintForm!: FormGroup;
  complaints: any[] = [];
  userId: number | null = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.complaintForm = this.formBuilder.group({
      complaintType: ['', Validators.required],
      complaintDetails: ['', Validators.required]
    });

    // Retrieve userid from session storage
    const userId = sessionStorage.getItem('userid');
    if (userId) {
      this.userId = +userId; // Convert string to number
    }
  }

  submitComplaint(): void {
    if (this.userId) {
      const complaintData = {
        userid: this.userId,
        description: this.complaintForm.value.complaintType,
        date: new Date().toISOString(),
        status: 'OPEN'
      };

      // Save the complaint to the server
      this.http.post('http://localhost:3000/complaints', complaintData)
        .subscribe((response: any) => {
          console.log('Complaint saved successfully:', response);
          // Reset the form
          this.complaintForm.reset();
        }, (error: any) => {
          console.error('Error saving complaint:', error);
        });
    }
  }
}
