import { Module } from '@nestjs/common';
import { EmployeeModule } from './modules/employees/employee.module.js';
import { CompanyModule } from './modules/companies/company.module.js';
import { AssetsModule } from './modules/assets/assets.module.js';

@Module({
  imports: [EmployeeModule, CompanyModule, AssetsModule],
})
export class AppModule {}
