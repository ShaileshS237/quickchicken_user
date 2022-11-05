import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeaddressPageRoutingModule } from './changeaddress-routing.module';

import { ChangeaddressPage } from './changeaddress.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeaddressPageRoutingModule,
    MaterialModule,
  ],
  declarations: [ChangeaddressPage],
})
export class ChangeaddressPageModule {}
