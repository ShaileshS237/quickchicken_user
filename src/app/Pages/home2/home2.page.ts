import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { StorageService } from 'src/app/services/storage.service';
import {
  LoadingController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {
  @Output() userdet: EventEmitter<any> = new EventEmitter();
  @ViewChild('header') header: HTMLElement;
  public folder: string;
  bannerimg = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 2000,
    },
  };
  productdet = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.3,
    spaceBetween: 15,
  };
  productdet2 = {
    initialSlide: 0,
    speed: 400,
  };
  location: any;
  city: any;
  area: any = null;
  showPopular: boolean = true;
  popularitem: any = [];
  category: any;
  quantity: any = 0;
  hidePopularSkeleton: any = false;
  cartcount: any = 0;
  cartItem: any;
  userid: any;
  imageData: any;
  desktopRecipe: any;
  homeBanner: any;
  test: any;
  i: number = 0;
  fcartPrice: any;
  fcartCount: any;
  gavranItem: any;
  eggItem: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    public element: ElementRef,
    public renderer: Renderer2,
    public http: HttpClient,
    public apiService: ApiserviceService,
    public storage: StorageService,
    public toast: ToastController,
    public cart: CartService,
    public native: NativeserviceService,
    public loadingController: LoadingController,
    public router: Router,
    private menu: MenuController,
    public _cartservice: CartService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.getCartCount();
      this.getUserId();
    });

    this.getHomeBanner();
    this.getCategory();
  }

  getHomeBanner() {
    this.apiService.get('homeBanner').subscribe((val: any) => {
      this.homeBanner = val.result;
      // console.log(val);
    });
  }
  ionViewWillLoad() {
    //console.log('ionViewWillLoad567482');
  }
  async ionViewWillEnter() {
    await this.storage.getItem('userid').then((val) => {
      this.userid = val;
      this.getGavran();
      //console.log(this.userid);
    });

    this.getUserId();
    // //console.log('3');
  }

  async getUserId() {
    this.i = this.i++;
    //console.log(this.i);

    await this.storage.getItem('userid').then((val) => {
      this.userid = val;
      //console.log(this.userid);
      this.getPopular();
      this.getRecipe();
      this.getCategoryWise();
      // this.getCartCount();
    });
  }

  getCategoryWise() {
    this.getGavran();
    this.getEgg();
  }

  eggCartItem: any;

  getEgg() {
    this.apiService
      .post('productListCatWise', {
        category_id: '5',
        user_id: this.userid,
      })
      .subscribe(async (val: any) => {
        let resData: any = val;
        this.eggItem = val.result;
        this.eggCartItem = val.cart_result;

        if (resData.code == 200) {
          this.eggCartItem = val.cart_result;
          await this.eggItem.forEach((element) => {
            element.quantity = null;
            element.hide_btn = null;
            element.cart_id = null;
            this.eggCartItem.forEach((element2) => {
              if (element.id == element2.product_id) {
                //  //console.log('yes', element.id);
                element.quantity = element2.quantity;
                element.hide_btn = true;
                element.cart_id = element2.cart_id;
              }
            });
          });
        } else if (resData.code == 301) {
          // this.shownodata = true;
        }
      });
  }

  gavranCartItem: any;

  getGavran() {
    this.apiService
      .post('productListCatWise', {
        category_id: '6',
        user_id: this.userid,
      })
      .subscribe(async (val: any) => {
        let resData: any = val;
        this.gavranItem = val.result;
        this.gavranCartItem = val.cart_result;

        if (resData.code == 200) {
          this.gavranCartItem = val.cart_result;
          await this.gavranItem.forEach((element) => {
            element.quantity = null;
            element.hide_btn = null;
            element.cart_id = null;
            this.gavranCartItem.forEach((element2) => {
              if (element.id == element2.product_id) {
                //  //console.log('yes', element.id);
                element.quantity = element2.quantity;
                element.hide_btn = true;
                element.cart_id = element2.cart_id;
              }
            });
          });
        } else if (resData.code == 301) {
          // this.shownodata = true;
        }
      });
  }

  getPopular() {
    //console.log('getpopular');

    this.apiService
      .post('productListPopular', { user_id: this.userid })
      .subscribe(async (val: any) => {
        // console.log(val);
        this.test = JSON.stringify(val.result);
        this.popularitem = val.result;
        this.cartItem = val.cart_result;
        await this.popularitem.forEach((element) => {
          element.quantity = null;
          element.hide_btn = null;
          element.cart_id = null;
          this.cartItem.forEach((element2) => {
            if (element.id == element2.product_id) {
              //  //console.log('yes', element.id);
              element.quantity = element2.quantity;
              element.hide_btn = true;
              element.cart_id = element2.cart_id;
            }
          });
        });
        this.hidePopularSkeleton = true;
      });
  }

  getGallaryImg() {
    this.apiService.get('galleryImages').subscribe((val) => {
      let resData: any = val;
      this.imageData = resData.result;
    });
  }

  getCategory() {
    this.apiService.get('categoryList').subscribe((val) => {
      var resData: any = val;
      this.category = resData.result;
    });
  }

  async addToCart(productid, weight) {
    if (this.userid != 1) {
      ////console.log('if');

      this.native.present();
      this.cart
        .addToCart(this.userid, productid, weight, 1)
        .subscribe(async (val) => {
          var rData: any = val;
          ////console.log(rData);

          if (rData.code == 200) {
            this.getCartCount();
            this.native.dismiss();
            // //console.log('yes');
            this.getEgg();
            this.getGavran();
            this.getPopular();
            // this.native.presentToast('Cart Updated');
          }
        });
    } else {
      this.router.navigateByUrl('/tabs/login');
    }
  }

  inc(item: any) {
    item.quantity++;
    this.apiService
      .post('updateCartItemQuantity', {
        cart_id: item.cart_id,
        quantity: item.quantity,
      })
      .subscribe((val) => {
        this.getCartCount();
        this.getEgg();
        this.getGavran();
        this.getPopular();
      });
  }

  dec(item: any) {
    item.quantity--;
    if (item.quantity == 0) {
      this.apiService
        .post('removeCartItem', { cart_id: item.cart_id })
        .subscribe((val) => {
          this.getCartCount();
          this.getEgg();
          this.getGavran();
          this.getPopular();
          ////console.log(val);
        });
    } else {
      this.apiService
        .post('updateCartItemQuantity', {
          cart_id: item.cart_id,
          quantity: item.quantity,
        })
        .subscribe((val) => {
          this.getCartCount();

          this.getEgg();
          this.getGavran();
          this.getPopular();
          ////console.log(val);
        });
    }
  }

  openFirst() {
    this.menu.toggle();
  }

  getRecipe() {
    //console.log([{ user_id: this.userid }]);

    this.apiService.get('homePageRecipes').subscribe((val: any) => {
      //console.log(val);
      this.desktopRecipe = val.result;
    });
  }

  getCartCount() {
    this.apiService
      .post('cartCount', { user_id: this.userid })
      .subscribe((val: any) => {
        // console.log(val, 'cartcount');
        if (val.count >= 1) {
          this.fcartCount = val.count;
          this.fcartPrice = val.cart_amount;
        }
        if (val.count == 0) {
          this.fcartCount = null;
          this.fcartPrice = null;
        }
        this._cartservice.cartCount.next(val.count);
      });
  }
}
``;
