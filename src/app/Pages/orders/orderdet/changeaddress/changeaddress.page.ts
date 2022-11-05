import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-changeaddress',
  templateUrl: './changeaddress.page.html',
  styleUrls: ['./changeaddress.page.scss'],
})
export class ChangeaddressPage implements OnInit {
  address_one: any;
  address_two: any;
  pincode: any;
  name: any;
  mobile: any;
  otherdeatils: any;
  city: any;
  pinvalidation: boolean = false;
  order_id: any;
  user_id: any;
  constructor(
    public route: ActivatedRoute,
    public api: ApiserviceService,
    public native: NativeserviceService,
    public storage: StorageService,
    public navCtrl: NavController,
    public alertController: AlertController
  ) {
    this.route.queryParams.subscribe((val) => {
      console.log(val);
      this.order_id = val.id;
      this.user_id = val.user_id;
    });
  }

  ngOnInit() {}

  presentAlertConfirm() {
    // this.navCtrl.pop();
    this.native.present();
    this.api
      .post('updateOrderAddress', {
        user_id: this.user_id,
        order_id: this.order_id,
        name: this.name,
        mobile: this.mobile,
        address_one: this.address_one,
        address_two: this.address_two,
        pincode: this.pincode,
      })
      .subscribe((val: any) => {
        this.native.dismiss();
        if (val.code == 200) {
          this.native.presentToast('Address Updated');
          this.navCtrl.pop();
        } else {
          this.native.presentToast('Something went wrong, Please try again');
          this.navCtrl.pop();
        }
        console.log(val);
      });
  }
}
