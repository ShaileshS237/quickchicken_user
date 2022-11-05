import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { stringify } from 'querystring';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';
import { EditaddressPage } from './editaddress/editaddress.page';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
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
    public router: Router
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
      console.log(val);
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
    console.log({ address_id: id.id, user_id: this.user_id });

    this.native.present();
    this.api
      .post('changeAddressPrimary', {
        address_id: id.id,
        user_id: this.user_id,
      })
      .subscribe((val) => {
        // console.log(val);
        this.getAddress();
      });
  }

  async edit(data: any) {
    console.log(data);
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

  ionViewWillEnter() {
    this.showError = false;
    this.addressBook = null;
    this.showLoading = true;
    this.getAddress();
  }
}
