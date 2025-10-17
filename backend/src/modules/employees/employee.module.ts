import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee.controller.js';
import { EmployeeService } from './services/employee.service.js';
import { EmployeeRepository } from './repositories/employee.repository.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository, PrismaService],
  exports: [EmployeeRepository],
})
export class EmployeeModule {}
