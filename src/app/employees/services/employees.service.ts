import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { EmployeeDTO } from '../DTO/EmployeeDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private http = inject(HttpClient)
  private urlApi = environment.apiBase + '/employees'

  constructor() { }

  public getAllEmployees(): Observable<EmployeeDTO[]> {
    return this.http.get<EmployeeDTO[]>(this.urlApi)
  }
}
