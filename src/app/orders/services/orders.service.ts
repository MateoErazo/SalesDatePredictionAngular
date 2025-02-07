import { Injectable } from '@angular/core';
import { CustomerOrderPredictionDTO } from '../DTO/CustomerOrderPredictionDTO';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }

  public getAllCustomerOrderPredictions(): CustomerOrderPredictionDTO[] | null {

    return null
  }
}
