import { Injectable } from '@nestjs/common';
import {
  CreateAsset,
  GetAsset,
  UpdateAsset,
} from '../repositories/assets.repository.interface.js';
import { AssetsRepository } from '../repositories/assets.repository.js';
import { AssetStatus } from '../entities/status.enum.js';

@Injectable()
export class AssetsService {
  constructor(private readonly assetsRepository: AssetsRepository) {}

  async create(data: CreateAsset): Promise<CreateAsset> {
    return await this.assetsRepository.createAsset(data);
  }

  async findAll(): Promise<GetAsset[]> {
    return await this.assetsRepository.findAllAssets();
  }

  async findOne(id: string): Promise<GetAsset | null> {
    return await this.assetsRepository.findAssetById(id);
  }

  async findByCompany(companyId: string): Promise<GetAsset[]> {
    return await this.assetsRepository.findAssetsByCompanyId(companyId);
  }

  async findCompanyAvailable(companyId: string): Promise<GetAsset[]> {
    const companyAssets =
      await this.assetsRepository.findAssetsByCompanyId(companyId);
    return companyAssets.filter((a) => a.status === AssetStatus.DISPONIVEL);
  }

  async findByEmployee(employeeId: string): Promise<GetAsset[]> {
    return await this.assetsRepository.findAssetsByEmployeeId(employeeId);
  }

  async findByStatus(status: AssetStatus): Promise<GetAsset[]> {
    return await this.assetsRepository.findAssetsByStatus(status);
  }

  async update(id: string, data: UpdateAsset): Promise<UpdateAsset | null> {
    return await this.assetsRepository.updateAsset(id, data);
  }

  async remove(id: string): Promise<void> {
    return await this.assetsRepository.deleteAsset(id);
  }

  async assign(assetId: string, employeeId: string): Promise<GetAsset | null> {
    return await this.assetsRepository.assignAssetToEmployee(
      assetId,
      employeeId,
    );
  }

  async unassign(assetId: string): Promise<GetAsset | null> {
    return await this.assetsRepository.unassignAsset(assetId);
  }
}
