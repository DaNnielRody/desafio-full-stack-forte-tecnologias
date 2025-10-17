import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetStatusPipe } from '../../../../../../shared/pipes/asset-status.pipe';
import { Asset } from '../../../../../../core/models/assets.model';
import { AssetCardComponent } from '../../../../../assets/components/asset-card/asset-card.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-company-assets-card',
  standalone: true,
  imports: [CommonModule, AssetStatusPipe, AssetCardComponent, TranslatePipe],
  templateUrl: './company-assets-card.component.html',
  styleUrls: ['./company-assets-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyAssetsCardComponent {
  @Input() assets: Asset[] | null = [];
  @Output() createClick = new EventEmitter<void>();
}