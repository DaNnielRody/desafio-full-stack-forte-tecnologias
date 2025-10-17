import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, Input, inject } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { CompanyCardComponent } from "../company-card/company-card.component";
import { Company } from "../../../../core/models/company.model";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'app-companies-grid',
  standalone: true,
  imports: [CommonModule, RouterModule, CompanyCardComponent, TranslatePipe],
  templateUrl: './companies-grid.component.html',
  styleUrls: ['./companies-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesGridComponent {
  @Input() companies: Company[] | null = [];
  
  private readonly router = inject(Router);

  viewCompanyDetails(companyId: string): void {
    this.router.navigate(['/companies', companyId]);
  }
}