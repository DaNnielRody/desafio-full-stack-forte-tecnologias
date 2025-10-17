import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { BehaviorSubject, switchMap, shareReplay } from "rxjs";
import { CreateAssetPayload } from "../../../../core/models/assets.model";
import { CreateEmployeePayload } from "../../../../core/models/employee.model";
import { AssetApiService } from "../../../../core/services/asset-api.service";
import { CompanyApiService } from "../../../../core/services/company.service";
import { EmployeeApiService } from "../../../../core/services/employee-api.service";
import { ToastService } from "../../../../core/services/toast.service";
import { PageHeaderComponent } from "../../../../shared/components/page-header/page-header.component";
import { AssetCreateModalComponent, CreateAssetFormValue } from "../../../assets/components/asset-create-modal/asset-create-modal.component";
import { EmployeeCreateModalComponent, CreateEmployeeFormValue } from "../../../employee/components/employee-create-modal/employee-create-modal.component";
import { CompanyAssetsCardComponent } from "./components/company-assets-card/company-assets-card.component";
import { CompanyEmployeesCardComponent } from "./components/company-employees-card/company-employees-card.component";
import { CompanyInfoCardComponent } from "./components/company-info-card/company-info-card.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageHeaderComponent,
    CompanyInfoCardComponent,
    CompanyEmployeesCardComponent,
    CompanyAssetsCardComponent,
    EmployeeCreateModalComponent,
    AssetCreateModalComponent,
    TranslatePipe
  ],
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDetailComponent {
  private readonly companyApi = inject(CompanyApiService);
  private readonly employeeApi = inject(EmployeeApiService);
  private readonly assetApi = inject(AssetApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);

  isEmployeeModalOpen = false;
  isAssetModalOpen = false;

  private readonly refreshTrigger = new BehaviorSubject<void>(undefined);
  private readonly companyId = this.route.snapshot.paramMap.get('id') ?? '';

  readonly employees$ = this.refreshTrigger.pipe(
    switchMap(() => this.employeeApi.getCompanyEmployees(this.companyId)),
    shareReplay(1)
  );

  readonly company$ = this.refreshTrigger.pipe(
    switchMap(() => this.companyApi.getCompanyById(this.companyId)),
    shareReplay(1)
  );

  readonly assets$ = this.refreshTrigger.pipe(
    switchMap(() => this.assetApi.getAssetsByCompany(this.companyId)),
    shareReplay(1)
  );

  handleCreateEmployee(formValue: CreateEmployeeFormValue): void {
    const payload: CreateEmployeePayload = { ...formValue, companyId: this.companyId };
    
    this.employeeApi.createEmployee(payload).subscribe({
      next: () => {
        this.toast.success('Funcionário criado com sucesso');
        this.isEmployeeModalOpen = false;
        this.refreshTrigger.next();
      },
      error: (err) => this.toast.error((err as Error)?.message ?? 'Erro ao criar funcionário'),
    });
  }

  handleCreateAsset(formValue: CreateAssetFormValue): void {
    const payload: CreateAssetPayload = { ...formValue, companyId: this.companyId };

    this.assetApi.createAsset(payload).subscribe({
      next: () => {
        this.toast.success('Ativo criado com sucesso');
        this.isAssetModalOpen = false;
        this.refreshTrigger.next();
      },
      error: (err) => this.toast.error((err as Error)?.message ?? 'Erro ao criar ativo'),
    });
  }
}