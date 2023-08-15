import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserAuthenticationDTO } from 'src/app/_models/auth-models/userAuthenticationDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  isFieldInvalid(fieldName: string) {
    const control = this.loginForm.get(fieldName);
    return control?.invalid && control?.touched;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    const userAuthDto: UserAuthenticationDTO = { email, password };

    this.authService.loginUser('api/Authentication/Login', userAuthDto).subscribe(
      (response) => {
        if (response.isAuthSuccessful) {
          localStorage.setItem('token', response.token);

          // Redirect to appropriate page based on role or other conditions
          if (this.authService.isUserAdmin()) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }

          // Display success message using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User logged in successfully',
          });
        } else {
          // Show error message using SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Login failed: ' + response.errorMessage,
          });
        }
      },
      (error) => {
        console.error('An error occurred during login:', error);
        // Display error message using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    );
  }
}
