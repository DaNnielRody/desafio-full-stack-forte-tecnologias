import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { Employee } from '../../../../core/models/employee.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-employees-grid',
  standalone: true,
  imports: [CommonModule, EmployeeCardComponent, TranslatePipe],
  templateUrl: './employees-grid.component.html',
  styleUrls: ['./employees-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeGridComponent { 
  @Input() employees: Employee[] | null = [];
}