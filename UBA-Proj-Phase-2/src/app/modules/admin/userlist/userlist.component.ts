import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface UserDetails {
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
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],


})


export class UserlistComponent implements OnInit {
  form: FormGroup;
  private _dynamicData: UserDetails[];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this._dynamicData = [];
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNumber: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      maritalStatus: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      connectionType: new FormControl('', Validators.required),
      requiredLoad: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.retrieveDynamicData();
  }

  private retrieveDynamicData(): void {
    this.http
      .get<UserDetails[]>('http://localhost:3000/userDetails')
      .subscribe((data: UserDetails[]) => {
        this._dynamicData = data.filter((user) => user.role === 'user');
      });
  }

  get dynamicData(): UserDetails[] {
    return this._dynamicData;
  }

  toggleEditing(row: UserDetails): void {
    row.isEditing = !row.isEditing;
  }

  saveChanges(data: UserDetails): void {
    this.http
      .put('http://localhost:3000/userDetails/' + data.id, data)
      .subscribe((response) => {
        console.log('Data updated successfully:', response);
        alert('Data stored successfully');
      });

    data.isEditing = false;
  }

  deleteRow(data: UserDetails): void {
    this.http
      .delete('http://localhost:3000/userDetails/' + data.id)
      .subscribe((response) => {
        console.log('Data deleted successfully:', response);
        const index = this.dynamicData.indexOf(data);
        if (index > -1) {
          this.dynamicData.splice(index, 1);
        }
      });
  }
}

