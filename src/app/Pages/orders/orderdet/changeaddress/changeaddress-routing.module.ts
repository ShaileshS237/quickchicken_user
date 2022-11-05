import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeaddressPage } from './changeaddress.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeaddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeaddressPageRoutingModule {}
