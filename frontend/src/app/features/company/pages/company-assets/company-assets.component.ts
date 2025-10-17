import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, switchMap, shareReplay } from "rxjs";
import { CreateAssetPayload } from "../../../../core/models/assets.model";
import { AssetApiService } from "../../../../core/services/asset-api.service";
import { ToastService } from "../../../../core/services/toast.service";
import { PageHeaderComponent } from "../../../../shared/components/page-header/page-header.component";
import { AssetCreateModalComponent, CreateAssetFormValue } from "../../../assets/components/asset-create-modal/asset-create-modal.component";
import { AssetsGridComponent } from "../../../assets/pages/assets-list/components/assets-grid/assets-grid.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'app-company-assets',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    AssetsGridComponent,
    AssetCreateModalComponent,
    TranslatePipe
  ],
  templateUrl: './company-assets.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyAssetsComponent {
  private readonly assetApi = inject(AssetApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);

  private readonly refresh$ = new BehaviorSubject<void>(undefined);
  readonly companyId = this.route.snapshot.paramMap.get('id') ?? '';

  readonly assets$ = this.refresh$.pipe(
    switchMap(() => this.assetApi.getAssetsByCompany(this.companyId)),
    shareReplay(1)
  );

  modalOpen = false;

  handleSaveAsset(formValue: CreateAssetFormValue): void {
    const payload: CreateAssetPayload = {
      ...formValue,
      companyId: this.companyId,
    };

    this.assetApi.createAsset(payload).subscribe({
      next: () => {
        this.toast.success('Ativo criado com sucesso');
        this.modalOpen = false;
        this.refresh$.next();
      },
      error: (err) =>
        this.toast.error((err as Error)?.message ?? 'Erro ao criar ativo'),
    });
  }
}