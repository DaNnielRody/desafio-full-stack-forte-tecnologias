import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, $Enums } from '@prisma/client';
import {
  CreateAsset,
  GetAsset,
  IAssetsRepository,
  UpdateAsset,
} from './assets.repository.interface.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { AssetStatus } from '../entities/status.enum.js';

@Injectable()
export class AssetsRepository implements IAssetsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAsset(data: CreateAsset): Promise<CreateAsset> {
    const { ...createData } = data;
    return (await this.prisma.asset.create({
      data: createData as Prisma.AssetUncheckedCreateInput,
    })) as CreateAsset;
  }

  async findAllAssets(): Promise<GetAsset[]> {
    return (await this.prisma.asset.findMany()) as GetAsset[];
  }

  async findAssetById(id: string): Promise<GetAsset | null> {
    return (await this.prisma.asset.findUnique({
      where: { id },
    })) as GetAsset | null;
  }

  async findAssetsByCompanyId(companyId: string): Promise<GetAsset[]> {
    return (await this.prisma.asset.findMany({
      where: { companyId },
    })) as GetAsset[];
  }

  async findAssetsByEmployeeId(employeeId: string): Promise<GetAsset[]> {
    return (await this.prisma.asset.findMany({
      where: { assignedToId: employeeId },
    })) as GetAsset[];
  }

  async findAssetsByStatus(status: AssetStatus): Promise<GetAsset[]> {
    return (await this.prisma.asset.findMany({
      where: { status: status as $Enums.AssetStatus },
    })) as GetAsset[];
  }

  async updateAsset(
    id: string,
    data: UpdateAsset,
  ): Promise<UpdateAsset | null> {
    const isAssetExists = await this.findAssetById(id);

    if (isAssetExists?.status !== AssetStatus.DISPONIVEL) {
      throw new BadRequestException('Asset is not available for update');
    }

    const updatedAsset = await this.prisma.asset.update({
      where: { id },
      data: { ...data } as Prisma.AssetUncheckedUpdateInput,
    });
    return updatedAsset as UpdateAsset;
  }

  async deleteAsset(id: string): Promise<void> {
    await this.prisma.asset.delete({ where: { id } });
  }

  async assignAssetToEmployee(
    assetId: string,
    employeeId: string,
  ): Promise<GetAsset | null> {
    const asset = await this.prisma.asset.findUnique({
      where: { id: assetId },
    });
    if (!asset) return null;

    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      select: { companyId: true },
    });
    if (!employee) return null;

    if (asset.companyId !== employee.companyId) {
      throw new BadRequestException(
        'Employee cannot be assigned to asset from a different company',
      );
    }

    const updatedAsset = await this.prisma.asset.update({
      where: { id: assetId },
      data: {
        assignedToId: employeeId,
        status: AssetStatus.EM_USO as $Enums.AssetStatus,
      },
    });
    return updatedAsset as GetAsset;
  }

  async unassignAsset(assetId: string): Promise<GetAsset | null> {
    const asset = await this.prisma.asset.findUnique({
      where: { id: assetId },
    });
    if (!asset) return null;

    const employee = await this.prisma.employee.findUnique({
      where: { id: asset.assignedToId ?? '' },
      select: { companyId: true },
    });
    if (!employee?.companyId) return null;

    if (asset.companyId !== employee.companyId) {
      throw new BadRequestException(
        'Employee cannot be unassigned from asset from a different company',
      );
    }

    await this.prisma.asset.update({
      where: { id: assetId },
      data: {
        assignedToId: null,
        status: AssetStatus.DISPONIVEL as $Enums.AssetStatus,
      },
    });
    return asset as GetAsset;
  }
}
