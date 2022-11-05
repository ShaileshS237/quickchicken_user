import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoginmainPageRoutingModule } from './loginmain-routing.module';

import { LoginmainPage } from './loginmain.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginmainPageRoutingModule,
    MaterialModule
  ],
  declarations: [LoginmainPage]
})
export class LoginmainPageModule {}
