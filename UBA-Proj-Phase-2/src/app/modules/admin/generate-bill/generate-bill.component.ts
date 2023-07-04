import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillGenerationService } from 'src/app/services/bill-generation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.css']
})
export class GenerateBillComponent implements OnInit {
  generateBillForm!: FormGroup;
  userList: any[] =[]; // Array to store the retrieved user list
  public isDuplicateEntry: any = false;

  constructor(
    private formBuilder: FormBuilder,
    private billService: BillGenerationService,
    private userService: UserService // Inject the user service
  ) {}

  ngOnInit() {
    this.generateBillForm = this.formBuilder.group({
      userId: ['', Validators.required],
      amount: ['', Validators.required],
      billingUnit: ['', Validators.required] // Add a form control for billing unit
      // Add more form controls as needed for other bill details
    });

    this.userService.getUserList().subscribe((users) => {
      this.userList = users;
    });
  }

  onSubmit() {
    if (this.generateBillForm.invalid) {
      // Perform necessary error handling or validation feedback
      return;
    }
  
    const userId = this.generateBillForm.value.userId;
    const amount = this.generateBillForm.value.amount;
    const billingUnit = this.generateBillForm.value.billingUnit;
    // Retrieve other form values as needed for other bill details
  
    const currentDate = new Date(); // Get the current date
    const formattedDate = currentDate.toISOString(); // Format the date as needed
  
    const billData = {
      userId,
      amount,
      billingUnit,
      date: formattedDate,
      isPaid: false // Set the initial isPaid status as false
      // Include other bill details as needed
    };
  
    // Check for duplicate bill entry for the user
    this.billService.checkDuplicateBillEntry(userId)
      .then((isDuplicateEntry) => {
        if (isDuplicateEntry) {
          // Show error message for duplicate entry
          alert(`Bill already generated for user ${userId}`);
        } else {
          // Generate the bill
          this.billService.generateElectricityBill(billData)
            .then(() => {
              // Bill generated successfully, perform necessary actions
              alert("Bill Generated Successfully");
              console.log('Electricity bill generated successfully');
            })
            .catch((error) => {
              console.error('An error occurred while generating the electricity bill:', error);
            });
        }
      })
      .catch((error) => {
        console.error('An error occurred while checking for duplicate bill entry:', error);
      });
  }
  
  
}