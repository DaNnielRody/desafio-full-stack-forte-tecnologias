import { Injectable } from '@nestjs/common';
import {
  CreateCompany,
  GetCompany,
  UpdateCompany,
} from '../repositories/company.repository.interface.js';
import { CompanyRepository } from '../repositories/company.repository.js';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(data: CreateCompany): Promise<CreateCompany> {
    return await this.companyRepository.createCompany(data);
  }

  async findAll(): Promise<GetCompany[]> {
    return await this.companyRepository.findAllCompanies();
  }

  async findOne(id: string): Promise<GetCompany | null> {
    return await this.companyRepository.findCompanyById(id);
  }

  async findByCnpj(cnpj: string): Promise<GetCompany | null> {
    return await this.companyRepository.findCompanyByCnpj(cnpj);
  }

  async update(id: string, data: UpdateCompany): Promise<UpdateCompany | null> {
    return await this.companyRepository.updateCompany(id, data);
  }

  async remove(id: string): Promise<void> {
    return await this.companyRepository.deleteCompany(id);
  }
}
