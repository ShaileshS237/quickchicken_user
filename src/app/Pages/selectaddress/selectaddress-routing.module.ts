import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectaddressPage } from './selectaddress.page';

const routes: Routes = [
  {
    path: '',
    component: SelectaddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectaddressPageRoutingModule {}
