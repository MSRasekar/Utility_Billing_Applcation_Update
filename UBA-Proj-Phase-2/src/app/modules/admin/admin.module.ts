import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    DashboardComponent,
    ApplicationListComponent,
    ComplaintsComponent,
    SidebarComponent,
    AdminLayoutComponent,
    UserlistComponent
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule, NgIf, MatButtonModule
  ]
})
export class AdminModule { }
