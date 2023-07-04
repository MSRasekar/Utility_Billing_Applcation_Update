import { Component, OnInit } from '@angular/core';
import { BillGenerationService } from 'src/app/services/bill-generation.service';

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.css']
})
export class BillInfoComponent implements OnInit {
  bills: any[] = []; // Array to store bill information

  constructor(private billGenerationService: BillGenerationService) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    const userId = this.billGenerationService.getUserId(); // Retrieve user ID from the service
  
    if (userId) {
      this.billGenerationService.getAllBills().subscribe(
        (bills) => {
          this.bills = bills.filter((bill) => bill.userId === userId);
        },
        (error) => {
          console.error('An error occurred while retrieving bills:', error);
        }
      );
    }
  }
  

  payBill(billId: string): void {
    // Call the service method to update the bill status
    this.billGenerationService.payBill(billId).subscribe(
      () => {
        // Update the bill status locally
        const bill = this.bills.find((b) => b.id === billId);
        if (bill) {
          bill.isPaid = true;
        }
        alert('Bill Paid Successfully');
      },
      (error) => {
        console.error('An error occurred while paying the bill:', error);
      }
    );
  }
}
