import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-chooseaddress',
  templateUrl: './chooseaddress.page.html',
  styleUrls: ['./chooseaddress.page.scss'],
})
export class ChooseaddressPage implements OnInit {
  addressBook: any;
  showError: any = false;
  user_id: any;
  showModal: boolean = false;
  addresscount: any;
  showLoading: any = true;
  constructor(
    public api: ApiserviceService,
    public storage: StorageService,
    public modalController: ModalController,
    public native: NativeserviceService,
    public router: Router,
    public nvctrl: NavController,
    public modalctrl: ModalController
  ) {}

  ngOnInit() {
    this.getuserId();
  }

  getuserId() {
    this.storage.getItem('userid').then((val) => {
      this.user_id = val;
      this.getAddress();
    });
  }

  getAddress() {
    this.api.post('myAddresses', { user_id: this.user_id }).subscribe((val) => {
      this.native.dismiss();
      // console.log(val);
      var resData: any = val;
      this.showLoading = false;
      if (resData.description == 'No records found!') {
        this.addressBook = null;
        this.addresscount = 0;
        this.showError = true;
      } else {
        this.addresscount = resData.result.length;
        this.addressBook = resData.result;
      }
    });
  }

  delete(item: any) {
    this.native.present();
    this.api
      .post('deleteAddress', { user_id: this.user_id, address_id: item.id })
      .subscribe((val) => {
        // console.log(val);

        this.getAddress();
      });
  }

  makeprimary(id: any) {
    this.native.present();
    this.api
      .post('changeAddressPrimary', { address_id: id, user_id: this.user_id })
      .subscribe((val) => {
        // console.log(val);
        this.getAddress();
      });
  }

  async edit(data: any) {
    console.log(data);
    let navigateExtra: NavigationExtras = {
      queryParams: {
        user_id: data.user_id,
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
    // const modal = await this.modalController.create({
    //   component: EditaddressPage,
    //   cssClass: 'my-custom-class',
    //   componentProps: {

    //   },
    // });
    // return await modal.present();
  }

  ionViewWillEnter() {
    this.showError = false;
    this.addressBook = null;
    this.showLoading = true;
    this.getAddress();
  }

  addAddress() {
    this.router.navigate(['address/addnewaddresss']);
    // this.modalController.dismiss().then((val) => {});

    // this.nvctrl.pop().then((val) => {
    //   this.router.navigateByUrl('address');
    // });
  }
}
