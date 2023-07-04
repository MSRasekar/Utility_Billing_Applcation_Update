import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillGenerationService {

  private billsUrl = 'http://localhost:3000/bills';

  constructor(private http: HttpClient) {}

  generateElectricityBill(billData: any): Promise<any> {
    return this.http.post(this.billsUrl, billData).toPromise();
  }

  checkDuplicateBillEntry(userId: string): Promise<boolean> {
    const params = { userId };

    return this.http.get<any[]>(this.billsUrl, { params })
      .toPromise()
      .then((bills) => {
        return bills!.some((bill) => !bill.isPaid); // Check if any unpaid bill exists for the user
      })
      .catch((error) => {
        console.error('An error occurred while checking for duplicate bill entry:', error);
        return false;
      });
  }
}
