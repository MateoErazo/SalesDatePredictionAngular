import { inject, Injectable } from '@angular/core';
import { CustomerOrderPredictionDTO } from '../DTO/CustomerOrderPredictionDTO';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { OrderWithProductCreationDTO } from '../DTO/OrderWithProductCreationDTO';
import { PaginationDTO } from '../../shared/models/paginationDTO';
import { BuildQueryParams } from '../../shared/functions/buildQueryParams';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private http = inject(HttpClient);
  private urlApi = environment.apiBase + '/customers/order-predictions';
  private newOrderUrlApi = environment.apiBase + '/orders';

  constructor() { }

  public getOrderPredictionsPaginated(pagination: PaginationDTO): Observable<HttpResponse<CustomerOrderPredictionDTO[]>> {
    let queryParams = BuildQueryParams(pagination);
    return this.http.get<CustomerOrderPredictionDTO[]>(this.urlApi,{params: queryParams, observe:'response'})
  }

  public addNewOrder(order: OrderWithProductCreationDTO){
    return this.http.post(this.newOrderUrlApi, order);
  }
}
