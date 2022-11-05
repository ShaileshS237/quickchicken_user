import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressmodalPage } from './addressmodal.page';

const routes: Routes = [
  {
    path: '',
    component: AddressmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressmodalPageRoutingModule {}
