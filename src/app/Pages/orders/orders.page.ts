import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orderdetails: any;
  userid: any;
  hide: Boolean = true;
  currentCartCount: any;
  showNoOrders: boolean = false;
  constructor(
    public api: ApiserviceService,
    public storage: StorageService,
    public toastController: ToastController,
    public native: NativeserviceService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getUserDeatils();
  }

  getUserDeatils() {
    this.storage.getItem('userid').then((val) => {
      this.userid = val;
      this.getOrders();
      this.cartCount();
    });
  }

  cartCount() {
    this.api.post('cartCount', { user_id: this.userid }).subscribe((val) => {
      console.log(val);
      var resData: any = val;
      this.currentCartCount = resData.count;
    });
  }

  getOrders() {
    this.api.post('myOrders', { user_id: this.userid }).subscribe((val) => {
      this.hide = false;
      console.log(val);
      let resData: any = val;
      if (resData.code != 200) {
        this.showNoOrders = true;
      } else {
        this.orderdetails = resData.result;
      }
    });
  }

  reorders(id: any) {
    console.log(this.currentCartCount);

    if (this.currentCartCount > 0) {
      this.presentToastWithOptions();
    } else {
      this.cofirmreorder(id);
    }
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Clear Cart To Reorder',
      // message: 'Do you want to clear cart?',
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          text: 'Clear Cart',
          handler: () => {
            this.clearcart();
          },
        },
        {
          text: 'Not now',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  cofirmreorder(id: any) {
    this.native.present();
    this.api
      .post('reOrder', { user_id: this.userid, order_id: id })
      .subscribe((val) => {
        this.native.dismiss();
        this.native.presentToast('Cart Updated').then((val) => {
          this.router.navigateByUrl('/cart');
        });
      });
  }

  clearcart() {
    this.native.present();
    this.api.post('clearCart', { user_id: this.userid }).subscribe((val) => {
      this.cartCount();
      this.native.dismiss();
      this.native.presentToast('Cart Cleared');
    });
  }

  ionViewDidEnter() {
    this.orderdetails = [];
    this.showNoOrders = false;
    this.getUserDeatils();
    this.cartCount();
  }
}
