import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartPage } from './cart.page';

const routes: Routes = [
  {
    path: '',
    component: CartPage,
  },
  {
    path: 'chooseslot',
    loadChildren: () =>
      import('./chooseslot/chooseslot.module').then(
        (m) => m.ChooseslotPageModule
      ),
  },
  {
    path: 'chooseaddress',
    loadChildren: () =>
      import('./chooseaddress/chooseaddress.module').then(
        (m) => m.ChooseaddressPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartPageRoutingModule {}
