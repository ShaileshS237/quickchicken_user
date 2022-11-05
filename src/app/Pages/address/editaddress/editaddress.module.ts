import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditaddressPageRoutingModule } from './editaddress-routing.module';

import { EditaddressPage } from './editaddress.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaddressPageRoutingModule,
    MaterialModule,
  ],
  declarations: [EditaddressPage],
})
export class EditaddressPageModule {}
