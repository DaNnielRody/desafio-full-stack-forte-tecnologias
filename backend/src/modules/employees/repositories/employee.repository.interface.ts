export type CreateEmployee = {
  name: string;
  email: string;
  cpf: string;
  companyId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UpdateEmployee = Partial<CreateEmployee>;

export type GetEmployee = {
  name: string;
  email: string;
  cpf: string;
};

export interface IEmployeeRepository {
  createEmployee(data: CreateEmployee): Promise<CreateEmployee>;
  findAllEmployees(): Promise<GetEmployee[]>;
  findEmployeeById(id: string): Promise<GetEmployee | null>;
  findAllCompanyEmployees(companyId: string): Promise<GetEmployee[]>;
  updateEmployee(
    id: string,
    data: UpdateEmployee,
  ): Promise<UpdateEmployee | null>;
  deleteEmployee(id: string): Promise<void>;
}
