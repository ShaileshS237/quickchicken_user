import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseslotPage } from './chooseslot.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseslotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseslotPageRoutingModule {}
