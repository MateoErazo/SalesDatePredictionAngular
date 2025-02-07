import { inject, Injectable } from '@angular/core';
import { CustomerOrderPredictionDTO } from '../DTO/CustomerOrderPredictionDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private http = inject(HttpClient)

  constructor() { }

  public getAllCustomerOrderPredictions(): Observable<CustomerOrderPredictionDTO[]> {

    return this.http.get<CustomerOrderPredictionDTO[]>("https://localhost:7016/api/customers/order-predictions")
  }
}
