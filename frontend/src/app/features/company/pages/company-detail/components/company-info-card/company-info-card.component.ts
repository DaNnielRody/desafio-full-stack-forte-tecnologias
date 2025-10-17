import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Company } from '../../../../../../core/models/company.model';

@Component({
  selector: 'app-company-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-info-card.component.html',
  styleUrls: ['./company-info-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyInfoCardComponent {
  @Input() company: Company | null = null;
}