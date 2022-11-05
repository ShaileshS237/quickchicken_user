import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Navigation,
  NavigationExtras,
  Router,
} from '@angular/router';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { NavController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';
// import { NavController } from '@ionic/angular'
@Component({
  selector: 'app-otpverify',
  templateUrl: './otpverify.page.html',
  styleUrls: ['./otpverify.page.scss'],
})
export class OtpverifyPage implements OnInit {
  id: any;
  otp: any;
  showResend: boolean = false;
  click: boolean = false;
  // otp: number  // it can be type string if you don't set allowNumbersOnly to true

  config = {
    allowNumbersOnly: true, // this is false by default
    //  setTypePassword: true, // this is false by default
    length: 6, // the default is 4
    inputStyles: {
      //  'font-color':'black',
      width: '35px',
      height: '35px',
      //  border: '2px solid white',
      'border-radius': '7px',
      //  'font-weight': 'bolder',
      //  color: 'white',
    },
  };
  pushId: any;
  mobile: any;
  constructor(
    public route: ActivatedRoute,
    public apiService: ApiserviceService,
    public router: Router,
    private navCtrl: NavController,
    private storage: StorageService,
    private oneSignal: OneSignal,
    public nativeService: NativeserviceService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
      this.mobile = params.mobile;
    });
  }

  ngOnInit() {
    this.getPushId();
    setTimeout(() => {
      this.showResend = !this.showResend;
    }, 10000);
  }

  getPushId() {
    this.oneSignal.getIds().then((val) => {
      this.pushId = val.userId;
      console.log(this.pushId);
    });
  }
  onOtpChange(otp) {
    this.otp = otp;
    console.log(this.otp);
  }

  verifyOtp() {
    this.click = !this.click;
    this.apiService
      .post('verifyOtp', {
        user_id: this.id,
        otp: this.otp,
        app_id: this.pushId,
      })
      .subscribe((val) => {
        console.log(val);
        var resData: any = val;
        if (resData.code == 200) {
          this.storage.addItem('userid', this.id).then((val) => {
            this.storage
              .addItem('userdetails', {
                username: resData.result[0].name,
                mobile: resData.result[0].mobile,
              })
              .then((val) => {
                this.router.navigate(['/']);
              });
          });
        } else {
          this.click = !this.click;
          this.nativeService.presentToast(resData.description);
        }
      });
  }

  changeNumber() {
    this.navCtrl.pop();
  }

  resend() {
    this.showResend = !this.showResend;
    this.nativeService.present();
    this.apiService
      .post('registration', { mobile: this.mobile })
      .subscribe((data) => {
        console.log(data);
        let resData: any = data;
        if (resData.code == 301) {
          this.nativeService.presentToast('Enter Valid Mobile Number');
          this.click = !this.click;
        }
        if (resData.code == 200) {
          this.nativeService.dismiss();
          this.nativeService.presentToast('otp send sucessfully');
          setTimeout(() => {
            this.showResend = !this.showResend;
          }, 10000);
        }
      });
  }
}
