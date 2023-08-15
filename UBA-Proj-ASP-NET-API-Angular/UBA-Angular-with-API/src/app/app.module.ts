import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ModulesModule } from './modules/modules.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './core/auth.guard';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AdminModule } from './modules/admin/admin.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ErrorHandlerService } from './services/error-handler.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}
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
    NgIf, MatButtonModule,
    AdminModule, JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7057'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [AuthGuard,  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerService,
    multi: true,
  }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }



