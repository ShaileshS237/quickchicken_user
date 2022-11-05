import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginmainPage } from './loginmain.page';

const routes: Routes = [
  {
    path: '',
    component: LoginmainPage
  },
  {
    path: 'otpverify',
    loadChildren: () => import('./otpverify/otpverify.module').then( m => m.OtpverifyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginmainPageRoutingModule {}
