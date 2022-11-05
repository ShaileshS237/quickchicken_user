import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseslotPageRoutingModule } from './chooseslot-routing.module';

import { ChooseslotPage } from './chooseslot.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ChooseslotPageRoutingModule,
  ],
  declarations: [],
})
export class ChooseslotPageModule {}
