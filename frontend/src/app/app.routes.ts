// app.routes.ts (CORRIGIDO)
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'companies',
        pathMatch: 'full',
      },
      {
        path: 'companies', 
        loadChildren: () =>
          import('./features/company/company.routes')
            .then((r) => r.COMPANY_ROUTES),
      },
      {
        path: 'employees', 
        loadChildren: () =>
          import('./features/employee/employee.routes')
            .then((r) => r.EMPLOYEE_ROUTES),
      },
      {
        path: 'assets',
        loadComponent: () =>
          import('./features/assets/pages/assets-list/assets-list.component')
            .then((c) => c.AssetsListComponent),
      },
    ],
  },
];