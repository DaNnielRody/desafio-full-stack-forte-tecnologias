import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Company } from '../../../../../../core/models/company.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-employees-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './employees-header.component.html',
  styleUrls: ['./employees-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesHeaderComponent {
  @Input({ required: true }) filterControl!: FormControl;
  @Input() companies: Company[] | null = [];
  @Output() createClick = new EventEmitter<void>();
}