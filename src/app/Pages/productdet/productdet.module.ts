import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ProductdetPageRoutingModule } from './productdet-routing.module';

import { ProductdetPage } from './productdet.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,MaterialModule,
    ProductdetPageRoutingModule
  ],
  declarations: [ProductdetPage]
})
export class ProductdetPageModule {}
