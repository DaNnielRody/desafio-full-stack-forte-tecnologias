import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Company } from '../../../../../../core/models/company.model';
import { CpfMaskDirective } from '../../../../../../shared/directives/cpf-mask-directive';

export type CreateEmployeeFormValue = { name: string; email: string; cpf: string; companyId: string; };

@Component({
  selector: 'app-employee-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CpfMaskDirective, TranslatePipe],
  templateUrl: './employee-create-modal.component.html',
  styleUrls: ['./employee-create-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCreateModalComponent {
  private readonly fb = inject(FormBuilder);

  @Input() companies: Company[] | null = [];
  @Output() closeRequest = new EventEmitter<void>();
  @Output() saveRequest = new EventEmitter<CreateEmployeeFormValue>();

  readonly createForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required]],
    companyId: ['', [Validators.required]],
  });

  save(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }
    this.saveRequest.emit(this.createForm.getRawValue());
  }
}
