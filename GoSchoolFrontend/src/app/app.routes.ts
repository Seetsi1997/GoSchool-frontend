import { Routes } from '@angular/router';
import { Register } from './component/auth/register/register';
import { Login } from './component/auth/login/login';
import { ForgotPassword } from './component/auth/forgot-password/forgot-password';
import { ResetPassword } from './component/auth/reset-password/reset-password';
import { ParentDashboard } from './component/parent/parent-dashboard/parent-dashboard';
import { DriverDashboard } from './component/driver/driver-dashboard/driver-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register }, 
  { path: 'forgot-password', component: ForgotPassword },
  {path: 'reset-password', component: ResetPassword},
  {path: 'parent-dashboard', component: ParentDashboard},
  {path: 'driver-dashboard', component: DriverDashboard},
  { path: '**', redirectTo: 'login' }
];

