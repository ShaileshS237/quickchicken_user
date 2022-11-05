import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-orderdet',
  templateUrl: './orderdet.page.html',
  styleUrls: ['./orderdet.page.scss'],
})
export class OrderdetPage implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  options: AnimationOptions = {
    path: 'https://assets7.lottiefiles.com/packages/lf20_m3zbxwnl.json',
    loop: false,
  };
  id: any;
  ordersdetails: any;
  productdetails: any;
  hide: any = true;
  level1: any;
  level2: any;
  level3: any;
  level4: any;
  currentStep: number;
  orderStatus: any;
  private animationItem: AnimationItem;
  ordertype: any;
  userid: any;
  currentCartCount: any;
  show: any = false;
  arrivingon: string;
  allowcancel: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiserviceService,
    private callNumber: CallNumber,
    private ngZone: NgZone,
    public native: NativeserviceService,
    public alertController: AlertController,
    public router: Router,
    public toastController: ToastController,
    public storage: StorageService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {}

  getuserid() {
    this.storage.getItem('userid').then((val) => {
      this.userid = val;
      this.cartCount();
    });
  }
  // ngAfterViewInit() {
  //   this.stepper.selectedIndex = 1;
  // }

  getOrderDeatils() {
    this.api
      .post('orderDetailsFull', { order_id: this.id })
      .subscribe((val: any) => {
        console.log(val);
        var date = new Date();
        const date2: any = String(date.getMonth() + 1).padStart(2, '0');
        // console.log(date2);
        this.allowcancel = val.allow_cancel;
        // console.log(date.getFullYear() + '-' + date2 + '-' + date.getDate());
        var todayDate = date.getFullYear() + '-' + date2 + '-' + date.getDate();
        var toMarrowDate =
          date.getFullYear() + '-' + date2 + '-' + (date.getDate() + 1);
        var orderDate = val.result[0].order_date;

        if (orderDate == todayDate) {
          this.arrivingon = 'Arriving Today';
        } else if (orderDate == toMarrowDate) {
          this.arrivingon = 'Arriving on ' + orderDate;
        } else {
          this.arrivingon = 'arriving on' + orderDate;
        }

        console.log(todayDate, orderDate);

        // if(){

        // }
        // if(val.result[0].order_date)
        this.hide = false;
        var resData: any = val;
        this.ordersdetails = resData.result;
        this.orderStatus = resData.result[0].status;
        this.ordertype = resData.result[0].order_type;
        // console.log(this.orderStatus);

        this.productdetails = resData.product_result;
        if (resData.result[0].status == 2) {
          this.currentStep = 0;
          this.level1 = false;
          this.level2 = false;
          this.level3 = false;
          this.level4 = false;
        } else if (resData.result[0].status == 3) {
          this.currentStep = 1;
          this.level1 = true;
          this.level2 = false;
          this.level3 = false;
          this.level4 = false;
        } else if (resData.result[0].status == 4) {
          //console.log('level4');
          this.currentStep = 2;
          this.level1 = true;
          this.level2 = true;
          this.level3 = false;
          this.level4 = false;
        } else if (resData.result[0].status == 5) {
          this.currentStep = 3;

          this.level1 = false;
          this.level2 = false;
          this.level3 = false;
          this.level4 = false;
        }
      });
  }

  download() {
    window.location.href =
      'https://quickchicken.in/api/apis/receiptPreview/' + this.id;
  }

  call(mobile: any) {
    this.callNumber
      .callNumber(mobile, true)
      .then((res) => console.log('Launched dialer!', res))
      .catch((err) => console.log('Error launching dialer', err));
  }

  loopComplete(event) {
    this.stop();
  }

  stop(): void {
    this.ngZone.runOutsideAngular(() => {
      this.animationItem.stop();
    });
  }

  retry() {
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Do you really want to retry?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          id: 'confirm-button',
          handler: () => {
            this.reordercheck();
          },
        },
      ],
    });

    await alert.present();
  }

  reordercheck() {
    if (this.currentCartCount == 0) {
      this.cofirmreorder();
    } else {
      this.show = true;
    }
  }

  cartCount() {
    this.api.post('cartCount', { user_id: this.userid }).subscribe((val) => {
      // console.log(val);
      var resData: any = val;
      this.currentCartCount = resData.count;
      // console.log(this.currentCartCount);
    });
  }

  cofirmreorder() {
    this.native.present();
    this.api
      .post('reOrder', { user_id: this.userid, order_id: this.id })
      .subscribe((val) => {
        this.native.dismiss();
        this.native.presentToast('Cart Updated').then((val) => {
          this.router.navigateByUrl('/cart');
        });
      });
  }

  cancelorder() {
    this.native.present();
    this.api
      .post('cancelOrder', {
        user_id: this.userid,
        order_id: this.id,
        cancel_reason: 'Customer Asked to Cancel',
      })
      .subscribe((val) => {
        this.native.dismiss();
        this.getOrderDeatils();
      });
  }

  changeaddress() {
    let navigateExtra: NavigationExtras = {
      queryParams: {
        id: this.id,
        user_id: this.userid,
      },
    };
    this.router.navigate(['/orders/orderdet/changeaddress'], navigateExtra);
  }
  ionViewDidEnter() {
    this.getOrderDeatils();
    this.getuserid();
  }
}
