import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller.js';
import { CompanyRepository } from './repositories/company.repository.js';
import { CompanyService } from './services/company.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository, PrismaService],
  exports: [CompanyRepository],
})
export class CompanyModule {}
