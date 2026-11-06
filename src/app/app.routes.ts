import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login, title: 'Accedi | HomeFile' },
  { path: 'dashboard', component: Dashboard, title: 'Dashboard | HomeFile' },
  { path: '**', redirectTo: 'login' },
];
