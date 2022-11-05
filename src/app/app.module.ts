import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { HttpClientModule } from '@angular/common/http';
import { NgPassOtpModule } from 'ng-pass-otp';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ChooseslotPage } from './Pages/cart/chooseslot/chooseslot.page';
import { ChooseaddressPage } from './Pages/cart/chooseaddress/chooseaddress.page';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
// import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieService } from 'ngx-cookie-service';
import { OnlineStatusModule } from 'ngx-online-status';
import { SelectaddressPage } from './Pages/selectaddress/selectaddress.page';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { AddressmodalPage } from './Pages/addressmodal/addressmodal.page';
import { AddressmodalPageModule } from './Pages/addressmodal/addressmodal.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    ChooseslotPage,
    ChooseaddressPage,
    SelectaddressPage,
  ],
  entryComponents: [ChooseslotPage, SelectaddressPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgPassOtpModule,
    OnlineStatusModule,
    AddressmodalPageModule,
  ],
  exports: [NgPassOtpModule],
  providers: [
    CallNumber,
    GooglePlus,
    OneSignal,
    InAppBrowser,
    CookieService,
    SocialSharing,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
