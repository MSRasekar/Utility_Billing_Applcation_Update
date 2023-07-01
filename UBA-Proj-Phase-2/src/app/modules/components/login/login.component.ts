import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Add this line
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private authService: LoginService, private router: Router, private formBuilder: FormBuilder) { }
 

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getErrorMessage() {
    const usernameControl = this.loginForm.get('username');
    if (usernameControl && usernameControl.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  isFieldInvalid(fieldName: string) {
    const control = this.loginForm.get(fieldName);
    return control?.invalid && control?.touched;
  }
  

  onSubmit() {
    if (this.loginForm.invalid) {
      // Perform necessary error handling or validation feedback
      return;
    }
  
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
  
    this.authService.login(username, password)
      .then((loggedInUser: any) => {
        if (loggedInUser) {
          // User is authenticated, perform necessary actions based on role
          if (this.authService.isAdmin()) {
            // Navigate to admin page
            this.router.navigate(['/admin']);
          } else {
            // Navigate to home page
            this.router.navigate(['/user']);
          }
  
          // Save user ID in sessionStorage after login
          sessionStorage.setItem('userid', loggedInUser.id.toString());
        } else {
          // Show error message or perform other actions if login fails
        }
      })
      .catch((error) => {
        console.error('An error occurred during login:', error);
      });
  }
  
}
