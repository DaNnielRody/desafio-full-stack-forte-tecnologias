import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asset } from '../../../../../../core/models/assets.model';
import { AssetStatusPipe } from '../../../../../../shared/pipes/asset-status.pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-available-assets-card',
  standalone: true,
  imports: [CommonModule, FormsModule, AssetStatusPipe, TranslatePipe],
  templateUrl: './available-assets-card.component.html',
  styleUrls: ['./available-assets-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailableAssetsCardComponent {
  @Input() assets: Asset[] | null = [];
  @Output() associate = new EventEmitter<string>();

  selectedAssetId: string | null = null;

  submit(): void {
    if (this.selectedAssetId) {
      this.associate.emit(this.selectedAssetId);
      // Reseta o select após a emissão
      this.selectedAssetId = null; 
    }
  }
}