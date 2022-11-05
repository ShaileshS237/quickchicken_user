import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AllproductPageRoutingModule } from './allproduct-routing.module';

import { AllproductPage } from './allproduct.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    IonicModule,
    AllproductPageRoutingModule,
  ],
  declarations: [AllproductPage],
})
export class AllproductPageModule {}
