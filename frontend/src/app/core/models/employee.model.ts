import { Asset } from "./assets.model";

export interface Employee {
  id: string;
  name: string;
  email: string;
  cpf: string;
  companyId: string;
  assets?: Asset[];
}

export interface CreateEmployeePayload {
  name: string;
  email: string;
  cpf: string;
  companyId: string;
}