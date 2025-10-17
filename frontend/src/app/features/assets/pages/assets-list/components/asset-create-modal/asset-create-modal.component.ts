import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

export type CreateAssetFormValue = { 
  name: string; 
  type: string; 
  companyId: string; 
};

export type Company = { id: string; name: string };

@Component({
  selector: 'app-asset-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './asset-create-modal.component.html',
  styleUrls: ['./asset-create-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetCreateModalComponent {
  private readonly fb = inject(FormBuilder);

  @Input() companies: Company[] | null = [];
  @Output() closeRequest = new EventEmitter<void>();
  @Output() saveRequest = new EventEmitter<CreateAssetFormValue>();

  readonly createForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    type: ['', [Validators.required, Validators.minLength(2)]],
    companyId: ['', [Validators.required]],
  });

  isInvalid(controlName: string): boolean {
    const control = this.createForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  save(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }
    this.saveRequest.emit(this.createForm.getRawValue());
  }
}