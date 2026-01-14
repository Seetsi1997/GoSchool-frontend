import { Routes } from '@angular/router';
import { ForgotPassword } from './component/auth/forgot-password/forgot-password';
import { Login } from './component/auth/login/login';
import { Logout } from './component/auth/logout/logout';
import { Register } from './component/auth/register/register';
import { ResetPassword } from './component/auth/reset-password/reset-password';
import { AddNewStudent } from './component/drivers/add-new-student/add-new-student';
import { DriverHomeScreen } from './component/drivers/driver-home-screen/driver-home-screen';
import { DriverSettingsScreen } from './component/drivers/driver-settings-screen/driver-settings-screen';
import { DriversDashboard } from './component/drivers/drivers-dashboard/drivers-dashboard';
import { ViewListScreen } from './component/drivers/view-list-screen/view-list-screen';
import { AddScreen } from './component/parent/add-screen/add-screen';
import { AddStudentInfo } from './component/parent/add-screen/information/add-student-info/add-student-info';
import { UploadProofOfPayment } from './component/parent/add-screen/information/upload-proof-of-payment/upload-proof-of-payment';
import { HomeScreen } from './component/parent/home-screen/home-screen';
import { ParentDashboard } from './component/parent/parent-dashboard/parent-dashboard';
import { MyChildren } from './component/parent/settings-screen/payment/my-children/my-children';
import { TransactionsHistory } from './component/parent/settings-screen/payment/transactions-history/transactions-history';
import { SettingsScreen } from './component/parent/settings-screen/settings-screen';
import { PersonalDetails } from './component/parent/settings-screen/settings/personal-details/personal-details';
import { ReLocation } from './component/parent/settings-screen/settings/personal-details/relocation/relocation';
import { Profile } from './component/parent/settings-screen/settings/profile/profile';
import { ChangePassword } from './component/parent/settings-screen/support/change-password/change-password';
import { Privacy } from './component/parent/settings-screen/support/privacy/privacy';
import {Account} from './component/drivers/driver-settings-screen/components/account-profile-screen/account/account';
import { DriverProfile } from './component/drivers/driver-settings-screen/components/driver-profile/driver-profile';
import { DriverLocation } from './component/drivers/driver-settings-screen/components/driver-profile/driver-location/driver-location';
import { AdminDashboard } from './component/admin/admin-dashboard/admin-dashboard';
import { DriverNotificationScreen } from './component/drivers/driver-notification-screen/driver-notification-screen';

export const routes: Routes = [
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register }, 
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'reset-password', component: ResetPassword },
  { path: 'logout', component: Logout },

  {path: 'admin-dashboard', component: AdminDashboard},

  // Parent Dashboard
 {
    path: 'parent-dashboard',
    component: ParentDashboard,
    children: [
      { path: 'home', component: HomeScreen },
      { path: 'add-upload', component: AddScreen,
        
        children: [
           { path: 'student-info', component: AddStudentInfo },
           { path: 'proof-payment', component: UploadProofOfPayment }
        ]
       },
         { path: 'add-student', component: AddNewStudent },
      {
        path: 'settings',
        component: SettingsScreen,
        children: [
          { path: 'profile', component: Profile },
          { path: 'personal-details', component: PersonalDetails,
            children: [
               {path: 'relocate', component: ReLocation}
            ]

           },
          { path: 'transactions-history', component: TransactionsHistory },
          { path: 'my-children', component: MyChildren },
          { path: 'change-password', component: ChangePassword },
          { path: 'terms-privacy', component: Privacy },
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
      { path: 'add', component: AddNewStudent },
      { path: 'notification', component: DriverNotificationScreen },
      { path: 'settings', component: DriverSettingsScreen,
        children: [
            {path: 'account', component: Account },
            {path: 'profile', component: DriverProfile,
              children: [ 
                {path: 'relocate', component: DriverLocation} 
              ]
            }
        ]
       },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
  ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


