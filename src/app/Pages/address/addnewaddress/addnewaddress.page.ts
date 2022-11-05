import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-addnewaddress',
  templateUrl: './addnewaddress.page.html',
  styleUrls: ['./addnewaddress.page.scss'],
})
export class AddnewaddressPage implements OnInit {
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
    public native: NativeserviceService
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
    if (this.count == 0) {
      this.primary_status = 1;
    } else {
      this.primary_status = 0;
    }

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
        primary_status: this.primary_status,
      })
      .subscribe((val) => {
        this.native.dismiss();
        console.log(val);
        var resData: any = val;

        if (resData.code == 200) {
          // this.native.dismiss();
          this.NavController.pop();
        } else if (resData.code != 200) {
          this.message = JSON.stringify(resData);
        }
      });
  }

  onSearchChange(event: any) {
    console.log(event.length);
    if (event.length == 6) {
      this.native.present();
      this.api.post('availablePincode', { pincode: event }).subscribe((val) => {
        console.log(val);
        this.native.dismiss();
        let resData: any = val;
        if (resData.code == 204) {
          this.pinvalidation = false;
          this.native.presentToast(
            'We dont deliver to this location, Please select another'
          );
        }
        if (resData.code == 200) {
          this.pinvalidation = true;
        }
      });
    }
  }

  onSearchChange2(event: any) {
    console.log(typeof event.length);
    // if (event.length >= 10) {
    //   this.mobile = Math.floor(this.mobile / 10);
    // }
  }
}
