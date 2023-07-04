import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth.guard';
import { HomeComponent } from '../components/home/home.component';
import { TrackStatusComponent } from './track-status/track-status.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MeterDetailsComponent } from './meter-details/meter-details.component';
import { UserSideBarComponent } from './user-side-bar/user-side-bar.component';
import { RaiseComplaintComponent } from './raise-complaint/raise-complaint.component';
import { BillInfoComponent } from './bill-info/bill-info.component';

const routes: Routes = [
  {
    path: 'user',
    component:UserSideBarComponent,
    
    children: [
      { path: '', component: HomeComponent },
      { path: 'track-status', component: TrackStatusComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'meter-details', component: MeterDetailsComponent },
      { path: 'raise-complaint', component: RaiseComplaintComponent },
      { path: 'bill-info', component: BillInfoComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default route
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
