import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Asset } from '../../../../../../core/models/assets.model';
import { AssetCardComponent } from '../../../../components/asset-card/asset-card.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-assets-grid',
  standalone: true,
  imports: [CommonModule, AssetCardComponent, TranslatePipe],
  templateUrl: './assets-grid.component.html',
  styleUrls: ['./assets-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetsGridComponent {
  @Input() assets: Asset[] | null = [];
}