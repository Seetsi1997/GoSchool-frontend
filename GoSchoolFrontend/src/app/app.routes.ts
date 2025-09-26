import { Routes } from '@angular/router';
import { Register } from './component/auth/register/register';
import { RegisterUserInfo } from './component/auth/register/details/register-user-info';
import { UserLocation } from './component/auth/register/address/user-location';
import { AccontSetup } from './component/auth/register/account-setup/account-setup';
import { Login } from './component/auth/login/login';
import { ForgotPassword } from './component/auth/forgot-password/forgot-password';
import { ResetPassword } from './component/auth/reset-password/reset-password';
import { ReviewSubmit } from './component/auth/register/review-submit/review-submit';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register }, // parent wizard
  { path: 'forgot-password', component: ForgotPassword },
  { path: '**', redirectTo: 'login' }
];

