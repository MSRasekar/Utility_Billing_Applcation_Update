
import { Component, OnInit } from '@angular/core';
import { BillGenerationService } from 'src/app/services/bill-generation.service';


@Component({
  selector: 'app-view-bills',
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css']
})
export class ViewBillsComponent {
  bills: any[] = [];
  constructor(private billService: BillGenerationService) { }

  ngOnInit() {
    this.fetchBills();
  }
  fetchBills() {
    this.billService.getAllBills().subscribe((bills) => {
      this.bills = bills;
    }, (error) => {
      console.error('An error occurred while fetching bills:', error);
    });
  }

  
    
}
