import { inject, Injectable } from '@angular/core';
import { CustomerOrderPredictionDTO } from '../DTO/CustomerOrderPredictionDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { OrderWithProductCreationDTO } from '../DTO/OrderWithProductCreationDTO';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private http = inject(HttpClient)
  private urlApi = environment.apiBase + '/customers/order-predictions'
  private newOrderUrlApi = environment.apiBase + '/customers'

  constructor() { }

  public getAllCustomerOrderPredictions(): Observable<CustomerOrderPredictionDTO[]> {

    return this.http.get<CustomerOrderPredictionDTO[]>(this.urlApi)
  }

  public addNewOrder(order: OrderWithProductCreationDTO){
    return this.http.post(this.newOrderUrlApi, order);
  }
}
