import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { BehaviorSubject, switchMap, shareReplay } from "rxjs";
import { CreateCompanyPayload } from "../../../../core/models/company.model";
import { CompanyApiService } from "../../../../core/services/company.service";
import { ToastService } from "../../../../core/services/toast.service";
import { PageHeaderComponent } from "../../../../shared/components/page-header/page-header.component";
import { CompanyCreateModalComponent, CreateCompanyFormValue } from "./components/company-create-modal/company-create-modal.component";
import { CompaniesGridComponent } from "../../components/companies-grid/companies-grid.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'app-companies-list',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    CompaniesGridComponent,
    CompanyCreateModalComponent,
    TranslatePipe
  ],
  templateUrl: './companies-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesListComponent {
  private readonly companyApi = inject(CompanyApiService);
  private readonly toast = inject(ToastService);

  private readonly refreshTrigger = new BehaviorSubject<void>(undefined);

  readonly companies$ = this.refreshTrigger.pipe(
    switchMap(() => this.companyApi.getCompanies()),
    shareReplay(1)
  );

  modalOpen = false;

  handleSaveCompany(formValue: CreateCompanyFormValue): void {
    const payload: CreateCompanyPayload = { ...formValue };

    this.companyApi.createCompany(payload).subscribe({
      next: () => {
        this.toast.success('Empresa criada com sucesso');
        this.modalOpen = false;
        this.refreshTrigger.next();
      },
      error: (err) => this.toast.error((err as Error)?.message ?? 'Falha ao criar empresa'),
    });
  }
}