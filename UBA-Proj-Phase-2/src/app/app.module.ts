import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ModulesModule } from './modules/modules.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './core/auth.guard';
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    ModulesModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularToastifyModule,
    NgIf, MatButtonModule
  ],
  providers: [AuthGuard, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
