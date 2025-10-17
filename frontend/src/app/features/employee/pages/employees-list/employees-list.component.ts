import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, switchMap, shareReplay, startWith } from 'rxjs';
import { EmployeeApiService } from '../../../../core/services/employee-api.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CreateEmployeePayload } from '../../../../core/models/employee.model';
import { CompanyApiService } from '../../../../core/services/company.service';
import { EmployeeCreateModalComponent, CreateEmployeeFormValue } from './components/employee-create-modal/employee-create-modal.component';
import { EmployeesHeaderComponent } from './components/employees-header/employees-header.component';
import { EmployeeGridComponent } from '../../components/employees-grid/employees-grid.component';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesHeaderComponent,
    EmployeeGridComponent,
    EmployeeCreateModalComponent,
  ],
  templateUrl: './employees-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent {
  private readonly employeeApi = inject(EmployeeApiService);
  private readonly companyApi = inject(CompanyApiService);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  private readonly refreshTrigger = new BehaviorSubject<void>(undefined);

  readonly filterForm = this.fb.nonNullable.group({ companyId: [''] });

  readonly companies$ = this.companyApi.getCompanies({ page: 1, limit: 1000 }).pipe(shareReplay(1));

  readonly employees$ = this.refreshTrigger.pipe(
    switchMap(() => this.filterForm.controls.companyId.valueChanges.pipe(
      startWith(this.filterForm.controls.companyId.value))
    ),
    switchMap((companyId) =>
      companyId
        ? this.employeeApi.getCompanyEmployees(companyId)
        : this.employeeApi.getEmployees()
    ),
    shareReplay(1)
  );

  modalOpen = false;

  handleSaveEmployee(formValue: CreateEmployeeFormValue): void {
    const payload: CreateEmployeePayload = { ...formValue };
    
    this.employeeApi.createEmployee(payload).subscribe({
      next: () => {
        this.toast.success('Funcionário criado com sucesso');
        this.modalOpen = false;
        this.refreshTrigger.next();
      },
      error: (err) => this.toast.error((err as Error)?.message ?? 'Erro ao criar funcionário'),
    });
  }
}