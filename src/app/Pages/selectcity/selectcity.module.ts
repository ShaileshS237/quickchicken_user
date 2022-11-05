import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SelectcityPageRoutingModule } from './selectcity-routing.module';

import { SelectcityPage } from './selectcity.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectcityPageRoutingModule,MaterialModule
  ],
  declarations: [SelectcityPage]
})
export class SelectcityPageModule {}
