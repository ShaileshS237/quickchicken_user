import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseaddressPageRoutingModule } from './chooseaddress-routing.module';

import { ChooseaddressPage } from './chooseaddress.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseaddressPageRoutingModule,
    MaterialModule,
  ],
  declarations: [],
})
export class ChooseaddressPageModule {}
