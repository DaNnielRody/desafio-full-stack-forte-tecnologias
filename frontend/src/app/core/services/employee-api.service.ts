import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Employee, CreateEmployeePayload } from '../models/employee.model';
import { BaseApiService } from './base-api.service';

@Injectable({ providedIn: 'root' })
export class EmployeeApiService extends BaseApiService {
  constructor() {
    super('/employees');
  }

  getEmployees(): Observable<Employee[]> {
    return this.get<{ data: Employee[] }>().pipe(
      map((response) => response?.data ?? [])
    );
  }

  getCompanyEmployees(companyId: string): Observable<Employee[]> {
    return this.get<{ data: Employee[] }>(
      `/company/${encodeURIComponent(companyId)}`
    ).pipe(map((response) => response?.data ?? []));
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.get<Employee>(`/${encodeURIComponent(id)}`);
  }

  createEmployee(payload: CreateEmployeePayload): Observable<Employee> {
    return this.post<Employee>(payload);
  }
}
