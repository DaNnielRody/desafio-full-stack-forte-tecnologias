import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  CreateEmployee,
  GetEmployee,
  IEmployeeRepository,
  UpdateEmployee,
} from './employee.repository.interface.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(data: CreateEmployee): Promise<CreateEmployee> {
    const { ...createData } = data;
    return await this.prisma.employee.create({
      data: createData as Prisma.EmployeeUncheckedCreateInput,
    });
  }

  async findAllEmployees(): Promise<GetEmployee[]> {
    return await this.prisma.employee.findMany();
  }

  async findAllCompanyEmployees(companyId: string): Promise<GetEmployee[]> {
    return await this.prisma.employee.findMany({ where: { companyId } });
  }

  async findEmployeeById(id: string): Promise<GetEmployee | null> {
    return await this.prisma.employee.findUnique({ where: { id } });
  }

  async updateEmployee(
    id: string,
    data: UpdateEmployee,
  ): Promise<UpdateEmployee | null> {
    const updatedEmployee = await this.prisma.employee.update({
      where: { id },
      data,
    });
    return updatedEmployee;
  }

  async deleteEmployee(id: string): Promise<void> {
    await this.prisma.employee.delete({ where: { id } });
  }
}
