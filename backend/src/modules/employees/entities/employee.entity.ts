import { createId } from '@paralleldrive/cuid2';

export class Employee {
  id: string;
  name: string;
  email: string;
  cpf: string;

  constructor(name: string, email: string, cpf: string) {
    this.id = createId();
    this.name = name;
    this.email = email;
    this.cpf = cpf;
  }
}
