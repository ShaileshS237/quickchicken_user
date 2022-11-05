import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-addressmodal',
  templateUrl: './addressmodal.page.html',
  styleUrls: ['./addressmodal.page.scss'],
})
export class AddressmodalPage implements OnInit {
  location: any;
  user_id: any;
  name: any;
  mobile: any;
  address_one: any;
  address_two: any;
  city: any;
  // state: any;
  pincode: any;
  primary_status: any;
  count: any;
  pinvalidation: boolean = false;
  message: any;
  apiResponce: any;
  username: any;
  usermobile: any;
  constructor(
    public storage: StorageService,
    public api: ApiserviceService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public NavController: NavController,
    public native: NativeserviceService,
    public modalCtrl: ModalController
  ) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);

      this.count = params.id;
      console.log(this.count);
    });
  }

  ngOnInit() {
    this.getUsercity();
    this.getuserId();
  }
  getuserId() {
    this.storage.getItem('userid').then((val) => {
      this.user_id = val;
      console.log(this.user_id);
    });
    this.storage.getItem('userdetails').then((val) => {
      this.username = val.username;
      this.usermobile = val.mobile;
      this.name = this.username;
      this.mobile = this.usermobile;
    });
  }
  getUsercity() {
    this.storage.getItem('Location').then((val) => {
      this.location = val.city;
      console.log(this.location);
    });
  }
  addAddress() {
    this.native.present();
    this.api
      .post('addNewAddress', {
        user_id: this.user_id,
        name: this.name,
        mobile: this.mobile,
        address_one: this.address_one,
        address_two: this.address_two,
        city: this.location,
        state: '1',
        pincode: this.pincode,
        primary_status: 1,
      })
      .subscribe((val) => {
        this.native.dismiss();
        console.log(val);
        var resData: any = val;

        if (resData.code == 200) {
          // this.native.dismiss();
          // this.NavController.pop();
          this.modalCtrl.dismiss();
        } else if (resData.code != 200) {
          this.message = JSON.stringify(resData);
        }
      });
  }

  dismissmodal() {
    this.modalCtrl.dismiss();
  }
}
