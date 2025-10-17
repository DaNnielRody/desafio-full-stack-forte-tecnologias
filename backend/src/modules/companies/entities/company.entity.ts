import { createId } from '@paralleldrive/cuid2';

export class Company {
  id: string;
  name: string;
  cnpj: string;
  updatedAt: Date;

  constructor(name: string, cnpj: string) {
    this.id = createId();
    this.name = name;
    this.cnpj = cnpj;
  }
}
