import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OtpverifyPageRoutingModule } from './otpverify-routing.module';

import { OtpverifyPage } from './otpverify.page';
import { MaterialModule } from 'src/app/material.module';
import { NgPassOtpModule } from 'ng-pass-otp';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpverifyPageRoutingModule,
    MaterialModule,
    NgPassOtpModule
  ],
  declarations: [OtpverifyPage]
})
export class OtpverifyPageModule {}
