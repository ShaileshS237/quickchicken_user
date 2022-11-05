import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CartService } from 'src/app/services/cart.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.page.html',
  styleUrls: ['./allproduct.page.scss'],
})
export class AllproductPage implements OnInit {
  id: any;
  i: any = 0;
  productList: any;
  productListCatWiseItem: any;
  cartAdded: any;
  userid: any;
  shownodata: boolean = false;
  cartcount: any = 0;

  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiserviceService,
    public http: HttpClient,
    public storage: StorageService,
    public toast: ToastController,
    public cart: CartService,
    public native: NativeserviceService,
    public loadingController: LoadingController,
    public router: Router
  ) {
    this.cart.cartCount.subscribe((val) => {
      console.log(val, 'cart');
      this.cartcount = val;
    });
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });
  }

  ngOnInit() {
    this.getUserId();
  }

  async getUserId() {
    await this.storage.getItem('userid').then((val) => {
      this.userid = val;
      this.getCartCount();
      this.getProductCategoryWise(0);
    });
  }

  getProductCategoryWise(id: any) {
    this.api
      .post('productListCatWise', {
        category_id: this.id,
        user_id: this.userid,
      })
      .subscribe((val) => {
        let resData: any = val;
        if (resData.code == 200) {
          this.shownodata = false;
          this.productList = resData.result;
          this.cartAdded = resData.cart_result;
          console.log(val);
          this.productList.forEach((element) => {
            this.shownodata = false;
            element.quantity = null;
            element.hide_btn = null;
            element.cart_id = null;
            this.cartAdded.forEach((element2) => {
              if (element.id == element2.product_id) {
                console.log('yes', element.id);
                element.quantity = element2.quantity;
                element.hide_btn = true;

                if (id == 1) {
                  this.native.dismiss();
                }
                element.cart_id = element2.cart_id;
              }
            });
          });
        } else if (resData.code == 301) {
          this.shownodata = true;
        }
      });
  }

  async addToCart(productid, weight) {
    if (this.userid != 1) {
      this.native.present();

      this.cart
        .addToCart(this.userid, productid, weight, 1)
        .subscribe(async (val) => {
          var rData: any = val;
          console.log(rData);

          if (rData.code == 200) {
            console.log('yes');
            this.getProductCategoryWise(1);
            this.getCartCount();
            this.native.presentToast('Cart Updated');
          }
        });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  inc(item: any) {
    this.native.present();
    item.quantity++;
    this.api
      .post('updateCartItemQuantity', {
        cart_id: item.cart_id,
        quantity: item.quantity,
      })
      .subscribe((val) => {
        this.getProductCategoryWise(1);
        console.log(val);
        this.getCartCount();
      });
  }

  dec(item: any) {
    this.native.present();
    item.quantity--;
    if (item.quantity == 0) {
      this.api
        .post('removeCartItem', { cart_id: item.cart_id })
        .subscribe((val) => {
          this.getProductCategoryWise(0);
          this.native.dismiss();
          this.getCartCount();
          console.log(val);
          // this.getPopular();
        });
    } else {
      this.api
        .post('updateCartItemQuantity', {
          cart_id: item.cart_id,
          quantity: item.quantity,
        })
        .subscribe((val) => {
          this.getProductCategoryWise(0);
          this.native.dismiss();
          this.getCartCount();
          console.log(val);
        });
    }
  }

  goTocart() {
    if (this.userid != 1) {
      this.router.navigateByUrl('/tabs/tab3');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ionViewWillEnter() {
    this.shownodata = false;

    this.productList = null;
    this.productListCatWiseItem = null;
    this.productList = null;
    this.getProductCategoryWise(0);
  }

  getCartCount() {
    this.api
      .post('cartCount', { user_id: this.userid })
      .subscribe((val: any) => {
        console.log(val, 'cartcount');
        this.cart.cartCount.next(val.count);
      });
  }
}
