import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    MaterialModule,
  ],
  declarations: [SearchPage],
})
export class SearchPageModule {}
