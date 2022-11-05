import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { CartService } from 'src/app/services/cart.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-productdet',
  templateUrl: './productdet.page.html',
  styleUrls: ['./productdet.page.scss'],
})
export class ProductdetPage implements OnInit {
  id: any;
  productDetails: any;
  added: boolean = false;
  quantity: any = 1;
  price: any;
  productImage: any;
  userId: any;
  cartdetails: any;
  type: any;
  totalweight: any;
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
    });
  }

  ngOnInit() {
    this.storage.getItem('userid').then((val) => {
      this.userId = val;
      this.getCartCount();
      this.getProductDeatils();
    });
  }

  getProductDeatils() {
    this.api
      .post('productDetails', { user_id: this.userId, product_id: this.id })
      .subscribe(async (val) => {
        console.log(val);

        let resData: any = val;
        this.productImage = resData.image_result;
        this.productDetails = resData.result;
        this.cartdetails = resData.cart_result;
        this.price = this.productDetails[0].price;
        this.type = this.productDetails[0].type;
        if (this.type == 2) {
          this.totalweight = this.productDetails[0].weight;
        } else {
          this.totalweight = this.productDetails[0].pieces;
        }
        await this.productDetails.forEach((element) => {
          element.quantity = null;
          element.hide_btn = null;
          element.cart_id = null;
          this.cartdetails.forEach((element2) => {
            if (element.id == element2.product_id) {
              console.log('yes', element.id);
              element.quantity = element2.quantity;
              element.hide_btn = true;
              element.cart_id = element2.cart_id;
            }
          });
        });
      });
  }

  add() {
    this.added = !this.added;
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
        // this.native.dismiss();
        console.log(val);
        this.getCartCount();
        this.getProductDeatils();
        this.native.dismiss();
      });
  }

  dec(item: any) {
    this.native.present();
    item.quantity--;
    if (item.quantity == 0) {
      this.api
        .post('removeCartItem', { cart_id: item.cart_id })
        .subscribe((val) => {
          // this.native.dismiss();
          console.log(val);
          this.getCartCount();
          this.getProductDeatils();
          this.native.dismiss();
        });
    } else {
      this.api
        .post('updateCartItemQuantity', {
          cart_id: item.cart_id,
          quantity: item.quantity,
        })
        .subscribe((val) => {
          this.getCartCount();
          this.getProductDeatils();
          // this.native.dismiss();
          console.log(val);
          this.native.dismiss();
        });
    }
  }

  async addToCart(productid, weight) {
    if (this.userId != 1) {
      this.native.present();

      this.cart
        .addToCart(this.userId, productid, weight, 1)
        .subscribe(async (val) => {
          var rData: any = val;
          console.log(rData);

          if (rData.code == 200) {
            this.getCartCount();
            console.log('yes');
            this.getProductDeatils();
            this.native.dismiss();
            this.native.presentToastTop('Cart Updated', 2000);
          }
        });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  goTocart() {
    if (this.userId != 1) {
      this.router.navigateByUrl('/tabs/tab3');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  getCartCount() {
    this.api
      .post('cartCount', { user_id: this.userId })
      .subscribe((val: any) => {
        console.log(val, 'cartcount');
        this.cart.cartCount.next(val.count);
      });
  }
}
