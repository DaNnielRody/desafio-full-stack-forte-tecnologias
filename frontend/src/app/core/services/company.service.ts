import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Company, CreateCompanyPayload } from '../models/company.model';
import { BaseApiService } from './base-api.service';

type PaginatedCompanyResponse = Company[] | { items?: Company[]; data?: Company[] };

@Injectable({ providedIn: 'root' })
export class CompanyApiService extends BaseApiService {
  
  constructor() {
    super('/companies'); 
  }

  getCompanies(params?: { page?: number; limit?: number }): Observable<Company[]> {
    const httpParams = new HttpParams({
      fromObject: {
        page: params?.page?.toString() ?? '1',
        limit: params?.limit?.toString() ?? '100',
      },
    });
    
    return this.get<PaginatedCompanyResponse>('', httpParams).pipe(
      map((response: PaginatedCompanyResponse) => {
        return Array.isArray(response) ? response : response?.items ?? response?.data ?? [];
      })
    );
  }

  getCompanyById(id: string): Observable<Company> {
    return this.get<Company>(`/${encodeURIComponent(id)}`);
  }

  createCompany(payload: CreateCompanyPayload): Observable<Company> {
    return this.post<Company>(payload);
  }
}