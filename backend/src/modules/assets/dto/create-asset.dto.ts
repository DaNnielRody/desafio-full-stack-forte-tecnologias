import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssetStatus } from '../entities/status.enum.js';

export class CreateAssetDto {
  @ApiProperty({ example: 'Notebook Dell Latitude' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'NOTEBOOK' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiPropertyOptional({ enum: AssetStatus, example: AssetStatus.DISPONIVEL })
  @IsOptional()
  @IsEnum(AssetStatus)
  status?: AssetStatus;

  @ApiProperty({ example: 'cku9m2f3d0001abcxyz' })
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  @IsString()
  assignedToId?: string | null;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
