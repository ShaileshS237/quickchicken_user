import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectaddressPageRoutingModule } from './selectaddress-routing.module';

import { SelectaddressPage } from './selectaddress.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectaddressPageRoutingModule,
    MaterialModule,
  ],
  declarations: [SelectaddressPage],
})
export class SelectaddressPageModule {}
