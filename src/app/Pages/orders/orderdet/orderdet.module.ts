import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { OrderdetPageRoutingModule } from './orderdet-routing.module';

import { OrderdetPage } from './orderdet.page';
import { MaterialModule } from 'src/app/material.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    LottieModule.forRoot({ player: playerFactory }),
    CommonModule,
    FormsModule,
    IonicModule,
    OrderdetPageRoutingModule,
    MaterialModule,
  ],
  declarations: [OrderdetPage],
})
export class OrderdetPageModule {}
