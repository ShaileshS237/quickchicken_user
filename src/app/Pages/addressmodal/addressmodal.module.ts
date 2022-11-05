import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressmodalPageRoutingModule } from './addressmodal-routing.module';

import { AddressmodalPage } from './addressmodal.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressmodalPageRoutingModule,
    MaterialModule,
  ],
  exports: [MaterialModule],
  declarations: [AddressmodalPage, MaterialModule],
})
export class AddressmodalPageModule {}
