import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserData {
  username: string;
  email: string;
  mobileNumber: number;
  dob: string;
  gender: string;
  maritalStatus: string;
  address: string;
  city: string;
  state: string;
  connectionType: string;
  requiredLoad: string;
  role: string;
  isEditing: boolean;
  id: number;
  applicationStatus: string;
}

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent {
  private _dynamicData: UserData[];
  searchStatus: string = '';
  filteredData: any[];

  constructor(private http: HttpClient) {
    this._dynamicData = [];
    this.filteredData = [];
  }

  ngOnInit(): void {
    this.retrieveDynamicData();
  }

  private retrieveDynamicData(): void {
    fetch('http://localhost:3000/userDetails')
      .then((response) => response.json())
      .then((data: UserData[]) => {
        this._dynamicData = data.filter((user) => user.role === 'user');
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

      this.createAndPopulateCell(newRow, 'Username', data.username);
      this.createAndPopulateCell(newRow, 'Email', data.email);
      this.createAndPopulateCell(
        newRow,
        'MobileNumber',
        data.mobileNumber.toString()
      );
      this.createAndPopulateCell(newRow, 'DateOfBirth', data.dob);
      this.createAndPopulateCell(newRow, 'Gender', data.gender);
      this.createAndPopulateCell(newRow, 'MaritalStatus', data.maritalStatus);
      this.createAndPopulateCell(newRow, 'Address', data.address);
      this.createAndPopulateCell(newRow, 'City', data.city);
      this.createAndPopulateCell(newRow, 'State', data.state);

      tableBody.appendChild(newRow);
    });
    this.filteredData = this._dynamicData;
  }

  get dynamicData(): UserData[] {
    return this._dynamicData;
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

  // Function to filter the data based on the search term
  filterData() {
    if (this.searchStatus) {
      this.filteredData = this._dynamicData.filter((data) =>
        data.applicationStatus.toLowerCase().includes(this.searchStatus.toLowerCase())
      );
      this.searchStatus = '';
    } else {
      this.filteredData = this._dynamicData;
    }
  }

  toggleEditing(row: UserData): void {
    row.isEditing = !row.isEditing;
  }

  saveChanges(data: any) {
    // Toggle off the editing mode
    data.isEditing = false;
    // Send the updated data to the server or API for storage
    this.http
      .put('http://localhost:3000/userDetails/' + data.id, data)
      .subscribe((response) => {
        // Optionally, handle the response from the server
        console.log('Data updated successfully:', response);
      });
  }
}
