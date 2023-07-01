import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Complaint {
  userid: number;
  description: string;
  date: Date;
  status: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent {

  fetchedComplaints: any;
  private _dynamicData: Complaint[];
  searchStatus: string = '';
  filteredData: any[];
  applySelectedOption: any[];
  selectedCategory = ''; // Default selected category is empty
  constructor(private http: HttpClient) {
    this._dynamicData = [];
    this.filteredData = [];

    this.applySelectedOption = [];
  }

  ngOnInit(): void {
    this.retrieveDynamicData();
  }

  private createTableRow(): HTMLElement {
    return document.createElement('tr');
  }

  private createAndPopulateCell(
    row: HTMLElement,
    cellClass: string,
    cellData: string
  ): void {
    const cell = document.createElement('td');
    cell.innerHTML = `<h6 class="fw-semibold mb-0">${cellData}</h6>`;
    cell.classList.add(cellClass);
  }
  private retrieveDynamicData(): void {
    fetch('http://localhost:3000/complaints')
      .then((response) => response.json())
      .then((data: Complaint[]) => {
        this._dynamicData = data;
        console.log(this._dynamicData);
        this.renderDynamicData();
      })
      .catch((error) => console.log(error));
  }
  private renderDynamicData(): void {
    const tableBody = document.querySelector('.table tbody');
    if (!tableBody) return;

    this._dynamicData.forEach((data) => {
      const newRow = this.createTableRow();

      this.createAndPopulateCell(newRow, 'UserId', `${data.userid}`);
      this.createAndPopulateCell(newRow, 'Description', data.description);
      this.createAndPopulateCell(newRow, 'Date', data.date.toString());
      this.createAndPopulateCell(newRow, 'Status', data.status);

      tableBody.appendChild(newRow);
    });
    this.filteredData = this._dynamicData;
    this.fetchedComplaints = this.filteredData;
  }
  toggleEditing(row: Complaint): void {
    row.isEditing = !row.isEditing;
  }

  saveChanges(data: any) {
    // Toggle off the editing mode
    data.isEditing = false;
    // Send the updated data to the server or API for storage
    this.http
      .put('http://localhost:3000/complaints/' + data.id, data)
      .subscribe((response) => {
        // Optionally, handle the response from the server
        console.log('Data updated successfully:', response);
      });
  }
  filterComplaints() {
    if (!this.selectedCategory) {
      this.filteredData = this.fetchedComplaints; // Return all complaints if no category is selected
    } else {
      this.filteredData = this.fetchedComplaints.filter(
        (complaint: { description: string | string[] }) =>
          complaint.description.includes(this.selectedCategory)
      );
    }
  }
}

