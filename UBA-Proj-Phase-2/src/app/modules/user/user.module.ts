import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackStatusComponent } from './track-status/track-status.component';
import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MeterDetailsComponent } from './meter-details/meter-details.component';
import { UserSideBarComponent } from './user-side-bar/user-side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { RaiseComplaintComponent } from './raise-complaint/raise-complaint.component';
import { BillInfoComponent } from './bill-info/bill-info.component';


@NgModule({
  declarations: [
    TrackStatusComponent,
    UserProfileComponent,
    MeterDetailsComponent,
    UserSideBarComponent,
    RaiseComplaintComponent,
    BillInfoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
