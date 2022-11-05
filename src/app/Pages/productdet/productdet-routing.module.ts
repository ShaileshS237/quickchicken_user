import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductdetPage } from './productdet.page';

const routes: Routes = [
  {
    path: '',
    component: ProductdetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductdetPageRoutingModule {}
