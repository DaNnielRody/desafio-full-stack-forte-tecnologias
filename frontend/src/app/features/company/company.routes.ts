import { Routes } from "@angular/router";

export const COMPANY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
        import('./pages/companies-list/companies-list.component')
            .then(c => c.CompaniesListComponent)
  },
  {
    path: ':id',
    loadComponent: () => 
        import('./pages/company-detail/company-detail.component')
            .then(c => c.CompanyDetailComponent)
  },
  {
    path: ':id/employees',
    loadComponent: () => 
        import('./pages/company-employees/company-employees.component')
            .then(c => c.CompanyEmployeesComponent)
  },
  {
    path: ':id/assets',
    loadComponent: () => 
        import('./pages/company-assets/company-assets.component')
            .then(c => c.CompanyAssetsComponent)
  },
];