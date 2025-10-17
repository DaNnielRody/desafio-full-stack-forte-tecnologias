import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../../../../core/models/employee.model';
import { EmployeeCardComponent } from '../../../../../employee/components/employee-card/employee-card.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-company-employees-card',
  standalone: true,
  imports: [CommonModule, EmployeeCardComponent, TranslatePipe],
  templateUrl: './company-employees-card.component.html',
  styleUrls: ['./company-employees-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyEmployeesCardComponent {
  @Input() employees: Employee[] | undefined | null = [];
  @Output() createClick = new EventEmitter<void>();
}