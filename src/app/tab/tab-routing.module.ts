import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabPage,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('../Pages/login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'tab1',
        loadChildren: () =>
          import('../Pages/home2/home2.module').then((m) => m.Home2PageModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../Pages/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../Pages/cart/cart.module').then((m) => m.CartPageModule),
      },
      {
        path: 'tab5',
        loadChildren: () =>
          import('../Pages/notification/notification.module').then(
            (m) => m.NotificationPageModule
          ),
      },
      {
        path: 'tab4',
        loadChildren: () =>
          import('../Pages/orders/orders.module').then(
            (m) => m.OrdersPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
