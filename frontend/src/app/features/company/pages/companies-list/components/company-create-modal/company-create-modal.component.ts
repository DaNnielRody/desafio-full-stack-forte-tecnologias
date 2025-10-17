import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CnpjMaskDirective } from '../../../../../../shared/directives/cnpj-mask.directive';
import { TranslatePipe } from '@ngx-translate/core';


function cnpjLengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const onlyNumbers = value.replace(/\D/g, '');
  return onlyNumbers.length !== 14 ? { cnpjLength: true } : null;
}

export type CreateCompanyFormValue = { name: string; cnpj: string; };

@Component({
  selector: 'app-company-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CnpjMaskDirective, TranslatePipe],
  templateUrl: './company-create-modal.component.html',
  styleUrls: ['./company-create-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCreateModalComponent {
  private readonly fb = inject(FormBuilder);

  @Output() closeRequest = new EventEmitter<void>();
  @Output() saveRequest = new EventEmitter<CreateCompanyFormValue>();

  readonly companyForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    cnpj: ['', [Validators.required, cnpjLengthValidator]],
  });

  save(): void {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      return;
    }
    this.saveRequest.emit(this.companyForm.getRawValue());
  }
}