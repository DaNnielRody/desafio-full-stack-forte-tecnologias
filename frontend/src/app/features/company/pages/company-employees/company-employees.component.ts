import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, switchMap, shareReplay } from 'rxjs';
import { EmployeeApiService } from '../../../../core/services/employee-api.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CreateEmployeePayload } from '../../../../core/models/employee.model';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { EmployeeCreateModalComponent, CreateEmployeeFormValue } from '../../../employee/components/employee-create-modal/employee-create-modal.component';
import { EmployeeGridComponent } from '../../../employee/components/employees-grid/employees-grid.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-company-employees',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageHeaderComponent,
    EmployeeGridComponent,
    EmployeeCreateModalComponent,
    TranslatePipe
  ],
  templateUrl: './company-employees.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyEmployeesComponent {
  private readonly employeeApi = inject(EmployeeApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);

  private readonly refresh$ = new BehaviorSubject<void>(undefined);
  readonly companyId = this.route.snapshot.paramMap.get('id') ?? '';

  readonly employees$ = this.refresh$.pipe(
    switchMap(() => this.employeeApi.getCompanyEmployees(this.companyId)),
    shareReplay(1)
  );

  modalOpen = false;

  handleSaveEmployee(formValue: CreateEmployeeFormValue): void {
    const payload: CreateEmployeePayload = { ...formValue, companyId: this.companyId };

    this.employeeApi.createEmployee(payload).subscribe({
      next: () => {
        this.toast.success('Funcionário criado com sucesso');
        this.modalOpen = false;
        this.refresh$.next();
      },
      error: (err) => this.toast.error((err as Error)?.message ?? 'Erro ao criar funcionário'),
    });
  }
}