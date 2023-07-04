import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { SignupService } from '../../../services/signup.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private signupService: SignupService, private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/), this.startWithLetterValidator]],
      email: ['', [Validators.required, Validators.email, this.domainValidator]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', [Validators.required, Validators.pattern(/^(Male|Female)$/)]],
      state: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      address: ['', Validators.required],
      dob: ['', [Validators.required, this.minimumAgeValidator]],
      maritalStatus: ['', Validators.required],
      requiredLoad: ['', Validators.required],
      connectionType: ['', Validators.required]
    });
  }

  

  onSubmit() {
    if (this.registrationForm.valid) {
      // Get the form data and assign it to a variable (e.g., userData)
      const userData = this.registrationForm.value;
  
      // Assign the role as "user" to the userData object
      userData.role = "user";
      userData.applicationStatus = "new";
      
      this.signupService.saveUserData(userData).subscribe(
        response => {
          // Handle the response from the server
          console.log('User data saved successfully!', response);
          this.registrationForm.reset();
          // Form is valid, perform form submission
          alert('User Registered successfully!');
          // Redirect to the login page
          this.router.navigate(['/login']);
        },
        error => {
          // Handle errors, if any
          console.error('Error saving user data:', error);
        }
      );
    } else {
      // Form is invalid, display error messages
      this.markAllFieldsAsTouched(this.registrationForm);
    }
  }
  


  markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field)!;
      if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string) {
    const control = this.registrationForm.get(fieldName);
    return control && control.invalid && control.touched;
  }
  

  startWithLetterValidator(control: AbstractControl) {
    if (control && !/^[A-Za-z]/.test(control.value)) {
      return { startWithLetter: true };
    }
    return null;
  }

  passwordValidator(control: AbstractControl) {
    if (control && control.value) { 
      const value = control.value;
      const hasLowercase = /[a-z]/.test(value);
      const hasUppercase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);

      if (value.length < 8 || !hasLowercase || !hasUppercase || !hasNumber) {
        return { passwordRequirements: true };
      }
    }
    return null;
  }

  minimumAgeValidator(control: AbstractControl) {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    const yearsDiff = currentDate.getFullYear() - selectedDate.getFullYear();
    const isOldEnough = yearsDiff >= 18;

    if (!isOldEnough) {
      return { minimumAge: true };
    }
    return null;
  }

  domainValidator(control: AbstractControl) {
    if (control) {
      const value = control.value;
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

      if (!emailRegex.test(value)) {
        return { invalidEmail: true };
      }
    }
    return null;
  }
}
