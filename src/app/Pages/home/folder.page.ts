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
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  @Output() userdet: EventEmitter<any> = new EventEmitter();
  @ViewChild('header') header: HTMLElement;
  public folder: string;
  bannerimg = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1.3,
    spaceBetween: 15,
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
    private menu: MenuController
  ) {}

  async ngOnInit() {
    this.apiService.get('homeBanner').subscribe((val: any) => {
      // console.log(val, 'homebanner');
      this.homeBanner = val.result.image;
    });
    // await this.getLocation()
    // await this.getUserId();
    // this.getCity();
    this.getCategory();
    this.getGallaryImg();
    this.getRecipe();
    // this.getAdsBanner();
  }

  getGallaryImg() {
    this.apiService.get('galleryImages').subscribe((val) => {
      //console.log(val);
      let resData: any = val;
      this.imageData = resData.result;
    });
  }

  async getUserId() {
    await this.storage.getItem('userid').then((val) => {
      this.userid = val;

      this.getPopular();

      this.cartCount();
    });
  }

  getCity() {
    this.storage.getItem('Location').then((val) => {
      //console.log(val);
      this.location = val;
      // console.log(this.location);
      if (this.location == null) {
        this.router.navigateByUrl('/selectcity');
      } else {
        this.city = this.location.city;
        this.area = this.location.area;
      }
    });
  }

  ionViewDidEnter() {
    // this.hidePopularSkeleton = false;
    // this.popularitem = [];
    // this.cartItem = null;
    this.getUserId();
    this.getCity();
  }

  getPopular() {
    //console.log(this.popularitem, 'popular');

    this.apiService
      .post('productListPopular', { user_id: this.userid })
      .subscribe(async (val) => {
        var resData: any = val;
        console.log(resData, '1');

        this.popularitem = resData.result;

        this.cartItem = resData.cart_result;
        await this.popularitem.forEach((element) => {
          element.quantity = null;
          element.hide_btn = null;
          element.cart_id = null;
          this.cartItem.forEach((element2) => {
            if (element.id == element2.product_id) {
              //  console.log('yes', element.id);
              element.quantity = element2.quantity;
              element.hide_btn = true;
              element.cart_id = element2.cart_id;
            }
          });
        });
        this.hidePopularSkeleton = true;
      });
  }

  getCategory() {
    this.apiService.get('categoryList').subscribe((val) => {
      var resData: any = val;
      //   console.log(resData);
      this.category = resData.result;
      //console.log(this.category, 'category');
    });
  }

  cartCount() {
    if (this.userid != 1) {
      this.apiService
        .post('cartCount', { user_id: this.userid })
        .subscribe((val) => {
          var resData: any = val;
          // console.log(resData);
          this.cartcount = resData.count;
        });
    }
  }

  async addToCart(productid, weight) {
    if (this.userid != 1) {
      //console.log('if');

      this.native.present();
      this.cart
        .addToCart(this.userid, productid, weight, 1)
        .subscribe(async (val) => {
          var rData: any = val;
          //console.log(rData);

          if (rData.code == 200) {
            // console.log('yes');
            this.getPopular();
            // this.native.presentToast('Cart Updated');
          }
        });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  inc(item: any) {
    this.native.present();
    item.quantity++;
    this.apiService
      .post('updateCartItemQuantity', {
        cart_id: item.cart_id,
        quantity: item.quantity,
      })
      .subscribe((val) => {
        this.native.dismiss();
        // console.log(val);
        this.getPopular();
      });
  }

  dec(item: any) {
    this.native.present();
    item.quantity--;
    if (item.quantity == 0) {
      this.apiService
        .post('removeCartItem', { cart_id: item.cart_id })
        .subscribe((val) => {
          this.native.dismiss();
          //  console.log(val);
          this.getPopular();
        });
    } else {
      this.apiService
        .post('updateCartItemQuantity', {
          cart_id: item.cart_id,
          quantity: item.quantity,
        })
        .subscribe((val) => {
          this.getPopular();
          this.native.dismiss();
          //console.log(val);
        });
    }
  }

  goTocart() {
    if (this.userid != 1) {
      this.router.navigateByUrl('/cart');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  openFirst() {
    this.menu.toggle();
    // this.menu.open('first');
  }

  getRecipe() {
    //console.log([{ user_id: this.userid }]);

    this.apiService.get('homePageRecipes').subscribe((val: any) => {
      //console.log(val);
      this.desktopRecipe = val.result;
    });
  }
}
