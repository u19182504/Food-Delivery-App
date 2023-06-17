import { Routes } from '@angular/router';
import { AccountPage } from './account/account.page';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'account',
    loadComponent: () => import('./account/account.page').then( m => m.AccountPage)
  },
];
