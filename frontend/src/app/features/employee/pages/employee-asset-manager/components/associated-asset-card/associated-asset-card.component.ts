import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Asset } from '../../../../../../core/models/assets.model'
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-associated-assets-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './associated-asset-card.component.html',
  styleUrls: ['./associated-asset-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssociatedAssetsCardComponent {
  @Input() assets: Asset[] | null = [];
  @Output() disassociate = new EventEmitter<string>();
}