import { Pipe, PipeTransform } from '@angular/core';
import { Asset } from '../../core/models/assets.model';

@Pipe({ name: 'assetStatusLabel', standalone: true })
export class AssetStatusPipe implements PipeTransform {
  transform(status: Asset['status'] | string | undefined | null): string {
    switch ((status ?? '').toString().toUpperCase()) {
      case 'DISPONIVEL':
      case 'AVAILABLE':
        return 'Disponível';
      case 'EM_USO':
      case 'IN_USE':
        return 'Em Uso';
      case 'EM_MANUTENCAO':
      case 'IN_MAINTENANCE':
        return 'Em Manutenção';
      default:
        return String(status ?? '');
    }
  }
}
