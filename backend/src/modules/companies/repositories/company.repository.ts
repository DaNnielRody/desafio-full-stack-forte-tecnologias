import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  CreateCompany,
  GetCompany,
  ICompanyRepository,
  UpdateCompany,
} from './company.repository.interface.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCompany(data: CreateCompany): Promise<CreateCompany> {
    const { ...createData } = data;
    return await this.prisma.company.create({
      data: createData as Prisma.CompanyUncheckedCreateInput,
    });
  }

  async findAllCompanies(): Promise<GetCompany[]> {
    return await this.prisma.company.findMany();
  }

  async findCompanyById(id: string): Promise<GetCompany | null> {
    return await this.prisma.company.findUnique({ where: { id } });
  }

  async findCompanyByCnpj(cnpj: string): Promise<GetCompany | null> {
    return await this.prisma.company.findUnique({ where: { cnpj } });
  }

  async updateCompany(
    id: string,
    data: UpdateCompany,
  ): Promise<UpdateCompany | null> {
    const updatedCompany = await this.prisma.company.update({
      where: { id },
      data,
    });
    return updatedCompany;
  }

  async deleteCompany(id: string): Promise<void> {
    await this.prisma.company.delete({ where: { id } });
  }
}
