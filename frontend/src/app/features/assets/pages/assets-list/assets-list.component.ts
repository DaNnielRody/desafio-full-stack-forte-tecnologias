import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { BehaviorSubject, Observable, shareReplay, switchMap, startWith } from "rxjs";
import { Company } from "../../../../core/models/company.model";
import { AssetApiService } from "../../../../core/services/asset-api.service";
import { ToastService } from "../../../../core/services/toast.service";
import { AssetsHeaderComponent } from "./components/assets-header/assets-header.component";
import { AssetCreateModalComponent } from "./components/asset-create-modal/asset-create-modal.component";
import { CompanyApiService } from "../../../../core/services/company.service";
import { Asset, CreateAssetPayload } from "../../../../core/models/assets.model";
import { AssetsGridComponent } from "./components/assets-grid/assets-grid.component";

@Component({
  selector: 'app-assets-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AssetsHeaderComponent,
    AssetsGridComponent,
    AssetCreateModalComponent,
  ],
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsListComponent {
  private readonly assetApi = inject(AssetApiService);
  private readonly companyApi = inject(CompanyApiService);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  
  private readonly refreshTrigger = new BehaviorSubject<void>(undefined);

  readonly filterForm = this.fb.nonNullable.group({
    companyId: [''],
  });

  readonly companies$: Observable<Company[]> = this.companyApi
    .getCompanies({ page: 1, limit: 1000 })
    .pipe(shareReplay(1));

  readonly assets$: Observable<Asset[]> = this.refreshTrigger.pipe(
    switchMap(() => this.filterForm.controls.companyId.valueChanges.pipe(
        startWith(this.filterForm.controls.companyId.value))
    ),
    switchMap((companyId) =>
      companyId
        ? this.assetApi.getAssetsByCompany(companyId)
        : this.assetApi.getAllAssets()
    ),
    shareReplay(1)
  );

  modalOpen = false;

  handleCreateAsset(payload: CreateAssetPayload): void {
    this.assetApi.createAsset(payload).subscribe({
      next: () => {
        this.toast.success('Ativo criado com sucesso');
        this.modalOpen = false;
        this.refreshTrigger.next();
      },
      error: (err: unknown) =>
        this.toast.error((err as Error)?.message ?? 'Falha ao criar ativo'),
    });
  }
}