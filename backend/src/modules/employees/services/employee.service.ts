import { Injectable } from '@nestjs/common';
import {
  CreateEmployee,
  GetEmployee,
  UpdateEmployee,
} from '../repositories/employee.repository.interface.js';
import { EmployeeRepository } from '../repositories/employee.repository.js';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async create(data: CreateEmployee): Promise<CreateEmployee> {
    return await this.employeeRepository.createEmployee(data);
  }

  async findAll(): Promise<GetEmployee[]> {
    return await this.employeeRepository.findAllEmployees();
  }

  async findAllByCompany(companyId: string): Promise<GetEmployee[]> {
    return await this.employeeRepository.findAllCompanyEmployees(companyId);
  }

  async findOne(id: string): Promise<GetEmployee | null> {
    return await this.employeeRepository.findEmployeeById(id);
  }

  async update(
    id: string,
    data: UpdateEmployee,
  ): Promise<UpdateEmployee | null> {
    return await this.employeeRepository.updateEmployee(id, data);
  }

  async remove(id: string): Promise<void> {
    return await this.employeeRepository.deleteEmployee(id);
  }
}
