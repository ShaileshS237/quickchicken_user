import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.page.html',
  styleUrls: ['./editaddress.page.scss'],
})
export class EditaddressPage implements OnInit {
  address_one: any;
  address_two: any;
  pincode: any;
  name: any;
  mobile: any;
  otherdeatils: any;
  city: any;
  pinvalidation: boolean = false;
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
      this.address_one = val.address_one;
      this.address_two = val.address_two;
      this.pincode = val.pincode;
      this.name = val.name;
      this.mobile = val.mobile;
      this.otherdeatils = val;
    });
  }

  ngOnInit() {
    // console.log(this.user_id, this.pincode);
    this.getCity();
  }

  getCity() {
    this.storage.getItem('Location').then((val) => {
      this.city = val.city;
    });
  }

  update() {
    this.native.present();
    this.api
      .post('updateAddress', {
        user_id: this.otherdeatils.id,
        address_id: this.otherdeatils.address_id,
        name: this.name,
        mobile: this.mobile,
        address_one: this.address_one,
        address_two: this.address_two,
        city: this.city,
        state: '1',
        pincode: this.pincode,
        primary_status: this.otherdeatils.primary_status,
      })
      .subscribe((val) => {
        let resData: any = val;
        this.native.dismiss();
        if (resData.code == 204) {
          this.native.presentToast('Please Update Something');
        } else if (resData.code == 200) {
          this.native.presentToast('Address Updated');
          this.navCtrl.pop();
        }
      });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Do you really want to update the addrees?',
      buttons: [
        {
          text: 'not now',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes ',
          id: 'confirm-button',
          handler: () => {
            this.update();
          },
        },
      ],
    });

    await alert.present();
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
          console.log(this.pinvalidation);

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
}
