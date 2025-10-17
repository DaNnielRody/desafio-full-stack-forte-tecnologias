import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetStatusPipe } from '../../../../shared/pipes/asset-status.pipe';
import { Asset } from '../../../../core/models/assets.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-asset-card',
  standalone: true,
  imports: [CommonModule, AssetStatusPipe, TranslatePipe],
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetCardComponent {
  @Input() asset: Asset | null = null;
}