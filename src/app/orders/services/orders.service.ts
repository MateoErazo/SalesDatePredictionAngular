import { inject, Injectable } from '@angular/core';
import { CustomerOrderPredictionDTO } from '../DTO/CustomerOrderPredictionDTO';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { OrderWithProductCreationDTO } from '../DTO/OrderWithProductCreationDTO';
import { PaginationDTO } from '../../shared/models/paginationDTO';
import { BuildQueryParams } from '../../shared/functions/buildQueryParams';
import { OrderPredictionFilterDTO } from '../DTO/OrderPredictionFilterDTO';
import { OrderFilterDTO } from '../DTO/OrderFilterDTO';
import { OrderDTO } from '../DTO/OrderDTO';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private http = inject(HttpClient);
  private urlApi = environment.apiBase + '/customers/order-predictions';
  private newOrderUrlApi = environment.apiBase + '/orders';
  private orderPredictionsUrlApi = environment.apiBase + '/customers/order-predictions/filters'
  private ordersUrlApi = environment.apiBase + '/orders/filters'

  constructor() { }

  public getOrdersByOrderFilter(orderFilters: OrderFilterDTO): Observable<HttpResponse<OrderDTO[]>> {
    let queryParams = BuildQueryParams(orderFilters);
    return this.http.get<OrderDTO[]>(this.ordersUrlApi, {params: queryParams, observe:'response'});
  }

  public getOrderPredictionsPaginated(pagination: PaginationDTO): Observable<HttpResponse<CustomerOrderPredictionDTO[]>> {
    let queryParams = BuildQueryParams(pagination);
    return this.http.get<CustomerOrderPredictionDTO[]>(this.urlApi,{params: queryParams, observe:'response'})
  }

  public getOrderPredictionsFiltered(orderFilters: OrderPredictionFilterDTO): Observable<HttpResponse<CustomerOrderPredictionDTO[]>> {
    let queryParams = BuildQueryParams(orderFilters);
    return this.http.get<CustomerOrderPredictionDTO[]>(this.orderPredictionsUrlApi,{params: queryParams, observe:'response'})
  }

  public addNewOrder(order: OrderWithProductCreationDTO){
    return this.http.post(this.newOrderUrlApi, order);
  }
}
