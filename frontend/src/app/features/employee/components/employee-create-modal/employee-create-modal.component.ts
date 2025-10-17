import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CpfMaskDirective } from '../../../../shared/directives/cpf-mask-directive';
import { TranslatePipe } from '@ngx-translate/core';

export type CreateEmployeeFormValue = { name: string; email: string; cpf: string; };

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

  @Output() closeRequest = new EventEmitter<void>();
  @Output() saveRequest = new EventEmitter<CreateEmployeeFormValue>();

  readonly createForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required]],
  });

  save(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }
    this.saveRequest.emit(this.createForm.getRawValue());
  }
}