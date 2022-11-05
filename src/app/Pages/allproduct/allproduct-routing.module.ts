import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllproductPage } from './allproduct.page';

const routes: Routes = [
  {
    path: '',
    component: AllproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllproductPageRoutingModule {}
