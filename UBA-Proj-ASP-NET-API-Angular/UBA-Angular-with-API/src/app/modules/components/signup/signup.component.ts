import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistrationDTO } from 'src/app/_models/auth-models/userRegistrationDTO';
import { AuthenticationService } from 'src/app/services/authentication.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  userRegistrationDto!: UserRegistrationDTO;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/), this.startWithLetterValidator]],
      email: ['', [Validators.required, Validators.email, this.domainValidator]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', [Validators.required, Validators.pattern(/^(Male|Female|Other)$/)]],
      state: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      address: ['', Validators.required],
      dob: ['', [Validators.required, this.minimumAgeValidator]],
      maritalStatus: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      requiredLoad: ['', Validators.required],
      connectionType: ['', Validators.required],

     
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Get form field values from the reactive form
      const formData = this.signupForm.value;

      // Create a new UserRegistrationDTO instance and assign form values to it
      this.userRegistrationDto = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        dob: formData.dob,
        maritalStatus: formData.maritalStatus,
        phoneNumber: formData.mobileNumber,
        addressLine: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        requiredLoad: formData.requiredLoad,
        connectionType: formData.connectionType,
      
      };

      // Call the authentication service to register the user route 'api/Authentication/Register'
      this.authenticationService 
        .registerUser('api/Authentication/Register', this.userRegistrationDto)
        .subscribe(
          (response) => {
            console.log('User registered successfully:', response);
            // Optionally reset the form and navigate to another page
            this.signupForm.reset();
            Swal.fire({
              icon: 'success',
              title: 'Registration successful',
              showConfirmButton: false,
              timer: 1500,
            });
            this.router.navigate(['/login']);
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Registration failed',
              text: 'Error registering user',
            });
            console.error('Error registering user:', error);
            // Handle registration errors
          }
        );
    } else {
      // Form is invalid, display error messages
      this.markAllFieldsAsTouched(this.signupForm);
    }
  }

  markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field)!;
      if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string) {
    const control = this.signupForm.get(fieldName);
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
      const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value); // Add your desired special characters here

      if (value.length < 8 || !hasLowercase || !hasUppercase || !hasNumber || !hasSpecialChar) {
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