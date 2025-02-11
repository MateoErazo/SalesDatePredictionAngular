import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ProductDTO } from '../DTO/ProductDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient)
  private urlApi = environment.apiBase + '/products'

  constructor() { }

  public getAllProducts(): Observable<ProductDTO[]>{
    return this.http.get<ProductDTO[]>(this.urlApi)
  }
}
