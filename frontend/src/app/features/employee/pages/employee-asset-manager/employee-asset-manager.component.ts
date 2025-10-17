import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable, switchMap, shareReplay } from 'rxjs';
import { AssetApiService } from '../../../../core/services/asset-api.service';
import { EmployeeApiService } from '../../../../core/services/employee-api.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Asset } from '../../../../core/models/assets.model';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { AssociatedAssetsCardComponent } from './components/associated-asset-card/associated-asset-card.component';
import { AvailableAssetsCardComponent } from './components/available-assets-card/available-assets-card.component';
import { EmployeeInfoCardComponent } from './components/employee-info-card/employee-info-card.component';
import { Employee } from '../../../../core/models/employee.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-employee-asset-manager',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    AssociatedAssetsCardComponent,
    AvailableAssetsCardComponent,
    EmployeeInfoCardComponent,
    TranslatePipe
  ],
  templateUrl: './employee-asset-manager.component.html',
  styleUrls: ['./employee-asset-manager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeAssetManagerComponent {
  private readonly assetApi = inject(AssetApiService);
  private readonly employeeApi = inject(EmployeeApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly location = inject(Location);

  private readonly refreshTrigger = new BehaviorSubject<void>(undefined);
  private readonly employeeId: string = this.route.snapshot.paramMap.get('id') ?? '';

  readonly employee$ = this.refreshTrigger.pipe(
    switchMap(() => this.employeeApi.getEmployeeById(this.employeeId)),
    shareReplay(1)
  )

  readonly associatedAssets$: Observable<Asset[]> = this.refreshTrigger.pipe(
    switchMap(() => this.assetApi.getEmployeeAssets(this.employeeId)),
    shareReplay(1)
  );

  readonly availableAssets$: Observable<Asset[]> = this.refreshTrigger.pipe(
    switchMap(() => this.employeeApi.getEmployeeById(this.employeeId)),
    switchMap((emp) => this.assetApi.getCompanyAvailableAssets(emp.companyId)),
    shareReplay(1)
  );

  goBack(): void {
    this.location.back();
  }

  handleAssociate(assetId: string): void {
    if (!assetId) return;
    this.assetApi.associateAsset(this.employeeId, assetId).subscribe({
      next: () => {
        this.toast.success('Ativo associado com sucesso');
        this.refreshTrigger.next();
      },
      error: (err) => this.toast.error((err as Error)?.message ?? 'Falha ao associar ativo'),
    });
  }

  handleDisassociate(assetId: string): void {
    this.assetApi.disassociateAsset(assetId).subscribe({
      next: () => {
        this.toast.success('Ativo desassociado com sucesso');
        this.refreshTrigger.next();
      },
      error: (err) => this.toast.error((err as Error)?.message ?? 'Falha ao desassociar ativo'),
    });
  }
}