import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistermainPageRoutingModule } from './registermain-routing.module';

import { RegistermainPage } from './registermain.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistermainPageRoutingModule
  ],
  declarations: [RegistermainPage]
})
export class RegistermainPageModule {}
