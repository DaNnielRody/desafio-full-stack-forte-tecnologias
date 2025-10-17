import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../../../../core/models/employee.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-employee-info-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './employee-info-card.component.html',
  styleUrls: ['./employee-info-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoCardComponent {
  @Input() employee: Employee | null = null;
}