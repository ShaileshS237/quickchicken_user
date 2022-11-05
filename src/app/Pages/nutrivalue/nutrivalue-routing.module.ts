import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NutrivaluePage } from './nutrivalue.page';

const routes: Routes = [
  {
    path: '',
    component: NutrivaluePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutrivaluePageRoutingModule {}
