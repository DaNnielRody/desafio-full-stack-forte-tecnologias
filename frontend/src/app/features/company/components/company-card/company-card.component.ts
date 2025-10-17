import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Company } from '../../../../core/models/company.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-company-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyCardComponent {
  private router = inject(Router);

  @Input() company: Company | null = null;
  @Output() cardClick = new EventEmitter<void>();

  isDropdownOpen = false;

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToCompany(section: 'details' | 'employees' | 'assets', companyId: string | undefined, event: Event) {
    if(!companyId) return;
    event.stopPropagation();

    let route = `/companies/${companyId}`;
    if (section === 'employees') route += '/employees';
    if (section === 'assets') route += '/assets';

    this.router.navigateByUrl(route);
    this.isDropdownOpen = false;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.isDropdownOpen = false;
  }
}