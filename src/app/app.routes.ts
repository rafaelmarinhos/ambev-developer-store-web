import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sales', component: SalesListComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
  ];
