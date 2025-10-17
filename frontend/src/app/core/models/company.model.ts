import { Employee } from './employee.model';

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  employees?: Employee[];
}

export interface CreateCompanyPayload {
  name: string;
  cnpj: string;
}