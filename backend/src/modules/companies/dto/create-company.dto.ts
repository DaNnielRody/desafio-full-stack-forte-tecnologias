import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Empresa Forte LTDA' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '11222333000144',
    description: 'Somente dígitos; aceita formatado na entrada',
  })
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/\D/g, '') : '',
  )
  @Matches(/^\d{14}$/, { message: 'CNPJ deve conter 14 dígitos numéricos' })
  cnpj: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
