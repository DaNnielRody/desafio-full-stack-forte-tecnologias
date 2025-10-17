import { createId } from '@paralleldrive/cuid2';
import { AssetStatus } from './status.enum.js';

export class Asset {
  id: string;
  name: string;
  type: string;
  status: AssetStatus;

  constructor(
    name: string,
    type: string,
    status: AssetStatus = AssetStatus.DISPONIVEL,
  ) {
    this.id = createId();
    this.name = name;
    this.type = type;
    this.status = status;
  }
}
