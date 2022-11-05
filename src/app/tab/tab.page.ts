import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';
import { ApiserviceService } from '../services/apiservice.service';
import { CartService } from '../services/cart.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {
  userid: any;
  taba: any = false;
  tabb: any = false;
  tabc: any = false;
  tabd: any = false;
  tabe: any = false;
  cartcount: any;
  constructor(
    public api: ApiserviceService,
    public storage: StorageService,
    public alertController: AlertController,
    public router: Router,
    public _cartservice: CartService
  ) {}

  async ngOnInit() {
    this._cartservice.cartCount.subscribe((val) => {
      console.log(val, 'cart');
      this.cartcount = val;
    });
    this.getCartCount();
    //console.log('this is');
    // await this.getUserDeatils();
  }

  getUserDeatils() {
    this.storage.getItem('userid').then((val) => {
      this.userid = val;
      if (this.userid == 1) {
        // this.taba = 'login';
        this.tabb = false;
        this.tabc = false;
        this.tabd = false;
        this.tabe = false;
      } else {
        this.tabb = false;
        this.tabc = false;
        this.tabd = false;
        this.tabe = false;
      }
    });
  }

  currentTab() {}

  ionViewDidEnter() {
    this.getUserDeatils();
    // this.getCartCount();
  }

  ionViewWillEnter() {
    //console.log('yes2');
  }
  ionViewWillLeave() {
    //console.log('yes3');
  }
  ionViewDidLeave() {
    //console.log('yes4');
  }

  getDetails(event) {
    //console.log(event);
  }

  getCartCount() {
    // this.api.post('cartCount', { user_id: 6 }).subscribe((val: any) => {
    //   console.log(val, 'cartcount');
    //   this.cartcount = val.count;
    // });
  }

  scan() {}
}
