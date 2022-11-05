import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderdetPage } from './orderdet.page';

const routes: Routes = [
  {
    path: '',
    component: OrderdetPage,
  },
  {
    path: 'changeaddress',
    loadChildren: () => import('./changeaddress/changeaddress.module').then( m => m.ChangeaddressPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderdetPageRoutingModule {}
