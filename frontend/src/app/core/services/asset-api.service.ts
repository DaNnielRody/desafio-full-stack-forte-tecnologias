import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { Asset, CreateAssetPayload, UpdateAssetPayload } from '../models/assets.model';

@Injectable({ providedIn: 'root' })
export class AssetApiService extends BaseApiService {

  constructor() {
    super('/assets');
  }
  
  getAllAssets(): Observable<Asset[]> {
    return this.get<{ data: Asset[] }>().pipe(
      map((r) => r?.data ?? [])
    );
  }

  getAssetsByCompany(companyId: string): Observable<Asset[]> {
    return this.get<{ data: Asset[] }>(`/company/${encodeURIComponent(companyId)}`).pipe(
      map((r) => r?.data ?? [])
    );
  }

  getCompanyAvailableAssets(companyId: string): Observable<Asset[]> {
    return this.get<{ data: Asset[] }>(`/company/${encodeURIComponent(companyId)}/available`).pipe(
      map((r) => r?.data ?? [])
    );
  }

  getEmployeeAssets(employeeId: string): Observable<Asset[]> {
    return this.get<{ data: Asset[] }>(`/employee/${encodeURIComponent(employeeId)}`).pipe(
      map((r) => r?.data ?? [])
    );
  }

  createAsset(payload: CreateAssetPayload): Observable<Asset> {
    return this.post<Asset>(payload);
  }

  updateAsset(assetId: string, payload: UpdateAssetPayload): Observable<Asset> {
    return this.put<Asset>(payload, `/${encodeURIComponent(assetId)}`);
  }

  deleteAsset(assetId: string): Observable<void> {
    return this.delete<void>(`/${encodeURIComponent(assetId)}`);
  }

  associateAsset(employeeId: string, assetId: string): Observable<void> {
    return this.post<void>({}, `/${encodeURIComponent(assetId)}/assign/${encodeURIComponent(employeeId)}`);
  }

  disassociateAsset(assetId: string): Observable<void> {
    return this.post<void>({}, `/${encodeURIComponent(assetId)}/unassign`);
  }
}