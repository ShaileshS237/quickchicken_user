import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TncPageRoutingModule } from './tnc-routing.module';

import { TncPage } from './tnc.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TncPageRoutingModule,
    MaterialModule,
  ],
  declarations: [TncPage],
})
export class TncPageModule {}
