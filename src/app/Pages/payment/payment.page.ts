import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { StorageService } from 'src/app/services/storage.service';
import { WindowRefService } from 'src/app/services/window-ref.service';
declare var RazorpayCheckout: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  id: any;
  orderdetails: any;
  coupne: any;
  showLoading: boolean = true;
  hide: boolean = false;
  payment_type: any;
  userid: any;
  username: any;
  useremail: any;
  usermobile: any;
  amount: number;
  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiserviceService,
    public router: Router,
    public native: NativeserviceService,
    public navCtrl: NavController,
    public storage: StorageService,
    private winRef: WindowRefService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });
  }

  ngOnInit() {
    this.getOrder();
    this.getuserid();
  }

  getuserid() {
    this.storage.getItem('userid').then((val) => {
      this.userid = val;
      console.log(this.userid);
    });
  }

  getOrder() {
    this.api.post('orderDetails', { order_id: this.id }).subscribe((val) => {
      this.showLoading = !this.showLoading;
      console.log(val);
      var resData: any = val;

      this.orderdetails = resData.result;
      // console.log('shailes', this.orderdetails[0].total);
      this.useremail = resData.user_email;
      this.usermobile = resData.user_mobile;
      this.username = resData.user_name;
      this.amount = this.orderdetails[0].total * 100;
      console.log(typeof this.amount);

      if (resData.total_weight >= 61) {
        this.hide = true;
      }
    });
  }

  applyCoupne() {
    this.native.present();
    this.api
      .post('availableCoupon', { coupon: this.coupne, order_id: this.id })
      .subscribe((val) => {
        console.log(val);
        var resData: any = val;
        // this.getOrder();
        if (resData.code == 200) {
          this.orderdetails = resData.result.result;
          this.coupne = resData.coupon_result.row.coupon;
          this.amount = this.orderdetails[0].total * 100;
          this.native.dismiss();
        } else {
          this.native.dismiss();
          this.native.presentToastTop(resData.description, 1000);
        }
      });
  }

  removeCoupne() {
    this.native.present();
    this.api.post('removeCoupon', { order_id: this.id }).subscribe((val) => {
      console.log(val);
      var resData: any = val;
      this.orderdetails = resData.result.result;
      this.amount = this.orderdetails[0].total * 100;
      this.coupne = null;
      this.native.dismiss();
    });
  }

  placeorder() {
    if (this.payment_type == 'razerpay') {
      console.log(this.payment_type);
      this.payWithRazorpay();
    } else {
      this.native.present();
      this.api
        .post('placeOrder', { order_id: this.id, order_type: '2' })
        .subscribe((val) => {
          console.log(val);
          var resData: any = val;
          if (resData.message == 'Success') {
            this.native.dismiss();
            this.router.navigateByUrl('/confirm');
          }
        });
    }
  }

  payWithRazorpay() {
    console.log({
      email: this.useremail,
      contact: this.usermobile,
      name: this.username,
      amount: this.amount,
    });

    var options: any = {
      description: 'Payment Towards OrderID QckChicken' + this.id,
      currency: 'INR', // your 3 letter currency code
      key: 'rzp_live_2Rh4vitxYizl7p',
      // key: 'rzp_live_W2OTCXwMotOrkG', // your Key Id from Razorpay dashboard
      amount: this.amount,
      name: this.username,
      prefill: {
        email: this.useremail,
        contact: this.usermobile,
        name: this.username,
      },
      theme: {
        color: '#4f1211',
      },

      modal: {
        // ondismiss: function () {
        //   alert('dismissed');
        // },
      },
    };

    options.handler = (response: any) => {
      if (response) {
        this.handle_response(response);
      } else {
        console.log('error');

        this.error();
      }
    };

    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', (res) => {
      console.log(res, 'norma');
      this.errorfunction(res);
    });
  }

  async errorfunction(responce: any) {
    this.api
      .post('cancelOrder', {
        user_id: this.userid,
        order_id: this.id,
        cancel_reason: 'Payment Failed',
      })
      .subscribe((val) => {
        this.router.navigateByUrl('/');
      });
  }

  async handle_response(_response) {
    console.log(_response);
    console.log(this.userid);

    var responce = {
      user_id: this.userid,
      order_id: this.id,
      txn_id: _response.razorpay_payment_id,
      amount: this.amount,
    };
    console.log(responce);

    this.api.post('paymentSuccess', responce).subscribe((val) => {
      console.log(val);
      let resdata: any = val;
      if (resdata.code == 200) {
        this.router.navigateByUrl('/confirm');
      } else {
        this.native.presentToastTop('Something Went Wrong', 1000);
      }
    });
  }
  error() {
    console.log('error');
  }
}
