import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getAllBills(): Observable<any[]> {
    return this.http.get<any[]>(this.billsUrl);
  }

  getBillForUser(userId: string): Observable<any> {
    const userBillUrl = `${this.billsUrl}?userId=${userId}`;

    return this.http.get<any>(userBillUrl);
  }

  payBill(billId: string): Observable<any> {
    const payBillUrl = `${this.billsUrl}/${billId}`;

    // Update the bill status to "Paid" in the API
    return this.http.patch(payBillUrl, { isPaid: true });
  }

  getUserId(): string | null {
    // Implement your logic to retrieve the user ID
    // This can be from session storage, local storage, or any authentication mechanism you have in place
    // For example, if you are storing the user ID in session storage, you can use:
    return sessionStorage.getItem('userid');
  }
}
