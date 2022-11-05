import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistermainPage } from './registermain.page';

const routes: Routes = [
  {
    path: '',
    component: RegistermainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistermainPageRoutingModule {}
