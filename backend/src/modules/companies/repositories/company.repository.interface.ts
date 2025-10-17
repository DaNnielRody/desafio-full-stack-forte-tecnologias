export type CreateCompany = {
  name: string;
  cnpj: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UpdateCompany = Partial<CreateCompany>;

export type GetCompany = {
  name: string;
  cnpj: string;
};

export interface ICompanyRepository {
  createCompany(data: CreateCompany): Promise<CreateCompany>;
  findAllCompanies(): Promise<GetCompany[]>;
  findCompanyById(id: string): Promise<GetCompany | null>;
  findCompanyByCnpj(cnpj: string): Promise<GetCompany | null>;
  updateCompany(id: string, data: UpdateCompany): Promise<UpdateCompany | null>;
  deleteCompany(id: string): Promise<void>;
}
