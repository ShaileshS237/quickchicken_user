import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnewaddressPage } from './addnewaddress.page';

const routes: Routes = [
  {
    path: '',
    component: AddnewaddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnewaddressPageRoutingModule {}
