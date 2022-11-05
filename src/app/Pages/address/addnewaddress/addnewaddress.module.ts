import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddnewaddressPageRoutingModule } from './addnewaddress-routing.module';

import { AddnewaddressPage } from './addnewaddress.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddnewaddressPageRoutingModule,
    MaterialModule,
  ],
  declarations: [AddnewaddressPage],
})
export class AddnewaddressPageModule {}
