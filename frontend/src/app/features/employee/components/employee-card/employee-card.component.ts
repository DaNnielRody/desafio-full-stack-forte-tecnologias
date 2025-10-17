import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Employee } from '../../../../core/models/employee.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCardComponent {
  @Input() employee: Employee | null = null;
}