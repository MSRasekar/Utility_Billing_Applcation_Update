import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewAndPayBillService {
  private billsUrl = 'http://localhost:3000/bills';

  constructor(private http: HttpClient) {}

  getUserBills(userId: string): Observable<any[]> {
    const params = new HttpParams().set('userId', userId);

    return this.http.get<any[]>(this.billsUrl, { params });
  }

  payBill(id: string): Observable<any> {
    const payUrl = `${this.billsUrl}/${id}`;
    const params = new HttpParams().set('isPaid', 'true');

    return this.http.put<any>(payUrl, null, { params });
  }
}
