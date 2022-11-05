import { Component, NgZone, OnInit } from '@angular/core';
import { Navigation } from '@angular/router';
import { NavigationExtras, Router } from '@angular/router';

import { ModalController, NavController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';
import { AddressPage } from '../address/address.page';
import { ChooseaddressPage } from './chooseaddress/chooseaddress.page';
import { ChooseslotPage } from './chooseslot/chooseslot.page';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { SelectaddressPage } from '../selectaddress/selectaddress.page';
import { AddnewaddressPage } from '../address/addnewaddress/addnewaddress.page';
import { AddressmodalPage } from '../addressmodal/addressmodal.page';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  count: any = 1;
  dateslot = [];
  timeslot = [];
  radioSelected: any;
  date: any = null;
  dateSlot: any = null;
  modalOpen: any = false;
  timeSlot: any;
  favoriteSeason: string;
  cartSum: number = 0;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  cart: any;
  deliveryCharge: any = 0;
  delivery: any = 0;
  codlimit: any = 0;
  cartempty: boolean = false;
  cartempty2: boolean = true;
  todayTimeSlot: any;
  addressBook: any;
  PrimaryAddress: any;
  addressId: string;
  address: boolean = false;
  tomslot: any;
  todaydate: any;
  tomdate: any;
  todayslot: any;
  dateslot2: string;
  confirmorder: any;
  userid: any;
  showLoading: boolean = true;
  newdate: any;
  newday: any;
  radioProps: any = [
    {
      id: 1,
      title: 'Fast Delivery',
    },
    {
      id: 2,
      title: 'Normal Delivery',
    },
  ];
  deliveryType: any;
  isOpen: boolean = false;
  selectedslot: any;
  selecteddate: any;
  showAddAddress: boolean = false;
  selecteddate2: any;
  options: AnimationOptions = {
    path: 'https://assets2.lottiefiles.com/private_files/lf30_oqpbtola.json',
    loop: false,
  };
  private animationItem: AnimationItem;
  addresscount: number;
  homeBanner: any;
  constructor(
    public modalCtrl: ModalController,
    public apiCtrl: ApiserviceService,
    public native: NativeserviceService,
    public navCtrl: NavController,
    public router: Router,
    public storage: StorageService,
    public modalController: ModalController,
    private ngZone: NgZone
  ) {}

  async ngOnInit() {
    // await this.getUserId();
    // this.getTimes();
    // this.getSiteInfo();
    this.getCartImage();
  }

  getUserId() {
    this.storage.getItem('userid').then((val) => {
      this.userid = val;
      this.getCart();
      // console.log(this.cartempty);

      this.getAddress();
    });
  }

  getCartImage() {
    this.apiCtrl.get('adsBanner').subscribe((val: any) => {
      console.log(val);
      this.homeBanner = val.result.name;
    });
  }

  getTimes() {
    this.apiCtrl.get('availableTimeslot').subscribe((val) => {
      var resData: any = val;
      this.todaydate = resData.result.date;
      this.tomdate = resData.result.date2;
      this.todayslot = resData.result.time_result;
      this.tomslot = resData.result.time_result2;
    });
  }

  getSiteInfo() {
    this.apiCtrl.get('siteInfo').subscribe((val) => {
      var resData: any = val;
      // //console.log('siteInfo',val);
      this.deliveryCharge = parseInt(resData.result[0].delivery_charges);
      this.codlimit = resData.result[0].cod_limit;
    });
  }
  cartCount: any = 0;
  getCart() {
    this.apiCtrl.post('cart', { user_id: this.userid }).subscribe((val) => {
      var resData: any = val;
      this.showLoading = false;
      // console.log(resData, 'cart');

      if (resData.code == 204) {
        // console.log('yes');
        this.cartempty = true;
        this.cartempty2 = false;
        //console.log(this.cartempty);
      } else {
        this.cartempty = false;
        this.cart = resData.result;
        this.cartCount = this.cart.length;
        this.cartSum = 0;
        this.cart.forEach((element) => {
          // //console.log(element.price);
          this.cartSum =
            this.cartSum + parseInt(element.price) * parseInt(element.quantity);
        });
      }
    });
  }

  deleteItem(id: any) {
    this.native.present();
    this.apiCtrl.post('removeCartItem', { cart_id: id }).subscribe((val) => {
      var resData: any = val;
      //console.log(val);
      this.getCart();
      this.native.dismiss();
      // this.native.presentToast('Item Deleted');
      // this.cart = resData.result
    });
  }

  inc(item: any) {
    item.quantity++;
    //console.log(item.id, item.quantity);
    this.updateItem(item.id, item.quantity);
  }

  async dec(item: any) {
    item.quantity--;
    //console.log(item.id, item.quantity);
    if (item.quantity <= 0) {
      await this.deleteItem(item.id);
    } else {
      this.updateItem(item.id, item.quantity);
    }
  }

  updateItem(id: any, quantity: any) {
    this.native.present();
    this.apiCtrl
      .post('updateCartItemQuantity', { cart_id: id, quantity: quantity })
      .subscribe((val) => {
        var resData: any = val;
        //console.log(val);
        this.getCart();
        this.native.dismiss();
        this.native.presentToast('Cart Updated');
        // this.cart = resData.result
      });
  }

  goBack() {
    this.navCtrl.pop();
  }

  showSpinner: any = false;

  placeOrder() {
    console.log({
      user_id: this.userid,
      date: this.selecteddate2,
      time_slot: this.selectedslot,
      address_id: this.addressId,
    });

    if (this.selecteddate == null || this.addresscount == 0) {
      if (this.selectedslot == null) {
        this.native.presentToastTop('Please Select Date Slot', 500);
      } else if (this.addresscount == 0) {
        this.native.presentToastTop('Please Select Address', 1000);
      }
    } else {
      let fast_delivery;
      if (this.selectedslot == 'Express Delivery') {
        fast_delivery = 1;
      } else {
        fast_delivery = 0;
      }
      this.showSpinner = !this.showSpinner;
      this.native.present();
      this.apiCtrl
        .post('createOrder', {
          user_id: this.userid,
          date: this.selecteddate2,
          time_slot: this.selectedslot,
          address_id: this.addressId,
          fast_delivery: fast_delivery,
        })
        .subscribe((val) => {
          //console.log(val);
          var resData: any = val;
          this.confirmorder = resData.result;
          if (resData.code == 200) {
            this.native.dismiss();
            this.showSpinner = !this.showSpinner;
            this.router.navigateByUrl(`/payment/${resData.order_id}`);
          }
          if (resData.code == 204) {
            this.native.dismiss();
            this.showSpinner = !this.showSpinner;
            this.native.presentToastTop(resData.description, 1500);
          }
        });
    }
  }

  selectquick() {
    this.selecteddate = 'Today';
    this.selectedslot = '60 Min - Express Delivery';
    this.selecteddate2 = this.todaydate;
  }
  cleardelivery() {
    this.selecteddate = null;
    this.selectedslot = null;
    this.selecteddate2 = null;
  }

  ionViewDidEnter() {
    // this.getAddress();
  }

  async selectSlot() {
    const modal = await this.modalController.create({
      component: ChooseslotPage,
      cssClass: 'my-custom-class',
      componentProps: {
        tomdate: this.tomdate,
        todayslot: this.todayslot,
        tomslot: this.tomslot,
        todaydate: this.todaydate,
      },
    });
    modal.onDidDismiss().then((val) => {
      // console.log(val);
      if (val.data.day == '60 Minutes') {
        this.selecteddate = val.data.date;
        this.selectedslot = 'Express Delivery';
        this.selecteddate2 = val.data.date2;
      } else {
        this.selecteddate = val.data.date;
        this.selectedslot = val.data.day;
        this.selecteddate2 = val.data.date2;
      }
    });
    return await modal.present();
  }

  async changeAddress2() {
    const modal = await this.modalController.create({
      component: ChooseaddressPage,
      cssClass: 'my-custom-class',
      componentProps: {
        firstName: 'Douglas',
        lastName: 'Adams',
        middleInitial: 'N',
      },
    });
    return await modal.present();
  }

  add() {
    this.modalCtrl.dismiss();
    this.router.navigateByUrl('address');
  }

  async ionViewWillEnter() {
    // console.log('ionViewWillEnter yes');
    await this.getUserId();
    this.getTimes();
    this.getSiteInfo();
    this.showAddAddress = true;
    this.PrimaryAddress = null;
    // this.getAddress();
    // console.log('ess');
  }

  async edit(data: any) {
    this.modalCtrl.dismiss();

    // console.log(data);
    let navigateExtra: NavigationExtras = {
      queryParams: {
        id: data.user_id,
        address_id: data.id,
        name: data.name,
        mobile: data.mobile,
        address_one: data.address_one,
        address_two: data.address_two,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        primary_status: data.primary_status,
      },
    };
    this.router.navigate(['address/editaddress'], navigateExtra);
  }

  getAddress() {
    this.apiCtrl
      .post('myAddresses', { user_id: this.userid })
      .subscribe((val) => {
        console.log(val, 'address data');
        var resData: any = val;

        if (resData.description == 'No records found!') {
          this.showAddAddress = true;
          this.addresscount = 0;
        } else {
          this.showAddAddress = false;
          this.addresscount = 1;
          this.addressBook = resData.result;
          // console.log(this.addressBook);

          this.addressBook.forEach((element) => {
            if (element.primary_status == 1) {
              this.addressId = element.id;
              this.PrimaryAddress =
                element.address_one +
                ' ' +
                element.address_two +
                ' ' +
                element.city +
                ' ' +
                element.pincode;
            }
          });
        }
      });
  }

  openAddresModal() {
    this.address = !this.address;
  }

  changeAddress(address: any) {
    this.addressId = address.id;
    this.PrimaryAddress =
      address.address_one +
      ' ' +
      address.address_two +
      ' ' +
      address.city +
      ' ' +
      address.pincode;
    this.modalCtrl.dismiss();
  }

  goToAddress() {
    this.modalCtrl.dismiss();
    this.router.navigateByUrl('address/addnewaddress');
  }
  async presentModalAddress() {
    // this.router.navigate(['/address']);
    this.addNewAddress();
  }
  async selectaddress() {
    const modal = await this.modalController.create({
      component: SelectaddressPage,
      cssClass: 'my-custom-class',
      // address.eaddress_on +

      componentProps: {
        address_one: '',
        address_two: '',
        city: '',
        pincode: '',
        add_id: '',
      },
    });
    modal.onDidDismiss().then((val) => {
      // this.getAddress();
      console.log(val, 'val');
      this.PrimaryAddress =
        val.data.address_one +
        ' ' +
        val.data.address_two +
        ' ' +
        val.data.city +
        ' ' +
        val.data.pincode;

      this.addressId = val.data.add_id;
    });
    return await modal.present();
  }

  async addNewAddress() {
    const modal = await this.modalController.create({
      component: AddressmodalPage,
      cssClass: 'my-custom-class',
      // address.eaddress_on +

      componentProps: {
        address_one: '',
        address_two: '',
        city: '',
        pincode: '',
        add_id: '',
      },
    });
    modal.onDidDismiss().then((val) => {
      this.getAddress();
      console.log(val, 'val');
      this.PrimaryAddress =
        val.data.address_one +
        ' ' +
        val.data.address_two +
        ' ' +
        val.data.city +
        ' ' +
        val.data.pincode;

      this.addressId = val.data.add_id;
    });
    return await modal.present();
  }
}
