import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressPage } from './address.page';

const routes: Routes = [
  {
    path: '',
    component: AddressPage,
  },
  {
    path: 'addnewaddress',
    loadChildren: () =>
      import('./addnewaddress/addnewaddress.module').then(
        (m) => m.AddnewaddressPageModule
      ),
  },
  {
    path: 'addnewaddress/:id',
    loadChildren: () =>
      import('./addnewaddress/addnewaddress.module').then(
        (m) => m.AddnewaddressPageModule
      ),
  },
  {
    path: 'editaddress',
    loadChildren: () => import('./editaddress/editaddress.module').then( m => m.EditaddressPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressPageRoutingModule {}
