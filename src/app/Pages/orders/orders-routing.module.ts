import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersPage } from './orders.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage,
  },
  {
    path: 'orderdet',
    loadChildren: () =>
      import('./orderdet/orderdet.module').then((m) => m.OrderdetPageModule),
  },
  {
    path: 'orderdet/:id',
    loadChildren: () =>
      import('./orderdet/orderdet.module').then((m) => m.OrderdetPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
