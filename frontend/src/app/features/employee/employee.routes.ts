import { Routes } from '@angular/router';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '', 
    loadComponent: () =>
      import('./pages/employees-list/employees-list.component')
        .then((c) => c.EmployeesListComponent),
  },
  {
    path: ':id/assets', 
    loadComponent: () =>
      import('./pages/employee-asset-manager/employee-asset-manager.component')
        .then((c) => c.EmployeeAssetManagerComponent),
  },
];