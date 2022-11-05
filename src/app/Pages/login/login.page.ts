import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';

// import { CookieService } from 'angular2-cookie/core';
import { CookieService } from 'ngx-cookie-service';

// declare var cookieMaster;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  cookieValue: any;
  constructor(
    private googlePlus: GooglePlus,
    private iab: InAppBrowser,
    private _cookieService: CookieService
  ) {}

  async ngOnInit() {
    this._cookieService.set('Test', 'Hello World');
    this.cookieValue = await this._cookieService.get('Test');
    console.log('login : ', this.cookieValue);
  }

  loginWithGoogle() {
    // cookieMaster.clearCookies(
    //   () => {},
    //   () => {
    //     alert('Error');
    //   }
    // );
    var options = 'location=yes';

    this.iab.create(
      'https://ramwebdeveloper.in/api/apis/googleLogin/',
      '_blank',
      options
    );
    // browser.show();
    // browser.on('loadstop').subscribe((event) => {
    //   this.cookieValue = this._cookieService.get('user_id');
    //   console.log('login : ', this.cookieValue);
    // });

    // browser.close();
  }
}
