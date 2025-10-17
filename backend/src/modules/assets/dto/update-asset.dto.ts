import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AssetStatus } from '../entities/status.enum.js';

export class UpdateAssetDto {
  @ApiPropertyOptional({ example: 'Monitor LG 24"' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'MONITOR' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ enum: AssetStatus, example: AssetStatus.EM_USO })
  @IsOptional()
  @IsEnum(AssetStatus)
  status?: AssetStatus;

  @ApiPropertyOptional({ example: 'cku9m2f3d0001abcxyz' })
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ example: 'cku9m2f3d0001empid' })
  @IsOptional()
  @IsString()
  assignedToId?: string | null;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
