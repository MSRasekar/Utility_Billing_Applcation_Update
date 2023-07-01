import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ModulesRoutingModule } from './modules-routing.module';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { StepsComponent } from './components/steps/steps.component';

@NgModule({
  declarations: [ 
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    StepsComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    AppRoutingModule
  ],
  exports:[NavbarComponent, FooterComponent]
})
export class ModulesModule { }
