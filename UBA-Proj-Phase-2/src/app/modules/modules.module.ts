import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CarouselComponent } from './components/home/carousel/carousel.component';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ 
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    StepsComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf,
    AdminModule,
    UserModule,
    MatButtonModule
    
  ],
  exports:[NavbarComponent, FooterComponent]
})
export class ModulesModule { }
