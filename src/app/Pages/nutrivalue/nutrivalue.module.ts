import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NutrivaluePageRoutingModule } from './nutrivalue-routing.module';

import { NutrivaluePage } from './nutrivalue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NutrivaluePageRoutingModule
  ],
  declarations: [NutrivaluePage]
})
export class NutrivaluePageModule {}
