import { Routes } from '@angular/router';
import { Register } from './component/auth/register/register';
import { Login } from './component/auth/login/login';
import { ForgotPassword } from './component/auth/forgot-password/forgot-password';
import { ResetPassword } from './component/auth/reset-password/reset-password';
import { ParentDashboard } from './component/parent/parent-dashboard/parent-dashboard';
import { Logout } from './component/auth/logout/logout';
import { HomeScreen } from './component/parent/home-screen/home-screen';
import { AddScreen } from './component/parent/add-screen/add-screen';
import { SettingsScreen } from './component/parent/settings-screen/settings-screen';
import { DriversDashboard } from './component/drivers/drivers-dashboard/drivers-dashboard';
import { DriverHomeScreen } from './component/drivers/driver-home-screen/driver-home-screen';
import { ViewListScreen } from './component/drivers/view-list-screen/view-list-screen';
import { DriverSettingsScreen } from './component/drivers/driver-settings-screen/driver-settings-screen';
import {AddNewStudent} from './component/drivers/add-new-student/add-new-student'
import { Profile} from './component/parent/settings-screen/settings/profile/profile';
import {  PersonalDetails } from './component/parent/settings-screen/settings/personal-details/personal-details';
import { TransactionsHistory } from './component/parent/settings-screen/payment/transactions-history/transactions-history';
import { MyChildren} from './component/parent/settings-screen/payment/my-children/my-children';
import {ChangePassword} from './component/parent/settings-screen/support/change-password/change-password';
import {Privacy} from './component/parent/settings-screen/support/privacy/privacy';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register }, 
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'reset-password', component: ResetPassword },
  { path: 'logout', component: Logout },

  // Parent Dashboard
 {
    path: 'parent-dashboard',
    component: ParentDashboard,
    children: [
      { path: 'home', component: HomeScreen },
      { path: 'add', component: AddScreen },
      {
        path: 'settings',
        component: SettingsScreen,
        children: [
          { path: 'settings-profile', component: Profile },
          { path: 'settings-personal-details', component: PersonalDetails },
          { path: 'settings-transactions-history', component: TransactionsHistory },
          { path: 'settings-my-children', component: MyChildren },
          { path: 'settings-change-password', component: ChangePassword },
          { path: 'settings-terms-privacy', component: Privacy },
          { path: '', redirectTo: 'settings', pathMatch: 'full' }
        ]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
     // Driver Dashboard
  { 
    path: 'drivers-dashboard', 
    component: DriversDashboard,
    children:[
      { path: 'home', component: DriverHomeScreen},
      { path: 'view', component:  ViewListScreen },
      { path: 'settings', component: DriverSettingsScreen,
        children: [
            {path: 'profile', component: Profile }
        ]
       },
      { path: 'add', component: AddNewStudent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
  ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


