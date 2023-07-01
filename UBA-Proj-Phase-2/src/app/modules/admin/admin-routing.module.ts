import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { AuthGuard } from 'src/app/core/auth.guard';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';


const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate:[AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'userlist', component: UserlistComponent },
            { path: 'application-list', component: ApplicationListComponent },
            { path: 'complaints', component: ComplaintsComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default route
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }