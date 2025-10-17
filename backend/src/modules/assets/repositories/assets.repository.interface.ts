import { AssetStatus } from '../entities/status.enum.js';

export type CreateAsset = {
  name: string;
  type: string;
  status?: AssetStatus;
  companyId: string;
  assignedToId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UpdateAsset = Partial<CreateAsset>;

export type GetAsset = {
  name: string;
  type: string;
  status: AssetStatus;
  companyId: string;
  assignedToId?: string | null;
};

export interface IAssetsRepository {
  createAsset(data: CreateAsset): Promise<CreateAsset>;
  findAllAssets(): Promise<GetAsset[]>;
  findAssetById(id: string): Promise<GetAsset | null>;
  findAssetsByCompanyId(companyId: string): Promise<GetAsset[]>;
  findAssetsByEmployeeId(employeeId: string): Promise<GetAsset[]>;
  findAssetsByStatus(status: AssetStatus): Promise<GetAsset[]>;
  updateAsset(id: string, data: UpdateAsset): Promise<UpdateAsset | null>;
  deleteAsset(id: string): Promise<void>;
  assignAssetToEmployee(
    assetId: string,
    employeeId: string,
  ): Promise<GetAsset | null>;
  unassignAsset(assetId: string): Promise<GetAsset | null>;
}
