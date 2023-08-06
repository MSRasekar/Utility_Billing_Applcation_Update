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
  userList: any[] = [];
  public isDuplicateEntry: any = false;

  constructor(
    private formBuilder: FormBuilder,
    private billService: BillGenerationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.generateBillForm = this.formBuilder.group({
      userId: ['', Validators.required],
      billingUnit: ['', Validators.required],
      amount: [] // Initialize amount field as disabled with a default value of 0
    });

    this.userService.getUserList().subscribe((users) => {
      this.userList = users;
    });
  }

  calculateAmount() {
    const billingUnit = this.generateBillForm.value.billingUnit;
    const amount = billingUnit * 8.5; // Replace with your actual calculation logic
    this.generateBillForm.patchValue({ amount }); // Update the amount field in the form
  }

  onSubmit() {
    if (this.generateBillForm.invalid) {
      return;
    }

    const userId = this.generateBillForm.value.userId;
    const billingUnit = this.generateBillForm.value.billingUnit;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    

    const billData = {
      userId,
      amount: this.generateBillForm.value.amount, // Get the amount from the form field
      billingUnit,
      date: formattedDate,
      isPaid: false
    };


    this.billService
      .checkDuplicateBillEntry(userId)
      .then((isDuplicateEntry) => {
        if (isDuplicateEntry) {
          alert(`Bill already generated for user ${userId}`);
        } else {
          this.billService
            .generateElectricityBill(billData)
            .then(() => {
              alert('Bill Generated Successfully');
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
