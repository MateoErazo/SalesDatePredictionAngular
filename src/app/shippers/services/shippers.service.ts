import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ShipperDTO } from '../DTO/ShipperDTO';

@Injectable({
  providedIn: 'root'
})
export class ShippersService {

  private http = inject(HttpClient)
  private urlApi = environment.apiBase + '/shippers'

  constructor() { }

  public getAllShippers() : Observable<ShipperDTO[]> {
    return this.http.get<ShipperDTO[]>(this.urlApi);
  }
}
