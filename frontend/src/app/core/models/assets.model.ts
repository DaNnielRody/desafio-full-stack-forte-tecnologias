export type AssetStatus = 'DISPONIVEL' | 'EM_USO' | 'EM_MANUTENCAO';

export interface Asset {
  id: string;
  name: string;
  type: string;
  status: AssetStatus;
  companyId: string;
  assignedToId?: string | null;
}

export interface CreateAssetPayload {
  name: string;
  type: string;
  companyId: string;
}

export interface UpdateAssetPayload {
  name?: string;
  type?: string;
  status?: string;
}