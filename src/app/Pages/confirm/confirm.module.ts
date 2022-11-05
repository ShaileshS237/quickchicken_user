import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ConfirmPageRoutingModule } from './confirm-routing.module';

import { ConfirmPage } from './confirm.page';
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
    ConfirmPageRoutingModule,
    MaterialModule,
  ],
  declarations: [ConfirmPage],
})
export class ConfirmPageModule {}
