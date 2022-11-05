import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { stringify } from 'querystring';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-selectaddress',
  templateUrl: './selectaddress.page.html',
  styleUrls: ['./selectaddress.page.scss'],
})
export class SelectaddressPage implements OnInit {
  @Input() address_one: any;
  @Input() address_two: any;
  @Input() city: any;
  @Input() pincode: any;
  @Input() add_id: any;
  user_id: any;
  showLoading: boolean;
  addressBook: any;
  addresscount: number;
  showError: boolean;
  showAddAddress: boolean;
  addressId: any;
  PrimaryAddress: string;

  constructor(
    public apiCtrl: ApiserviceService,

    public storage: StorageService,
    public modalController: ModalController,
    public native: NativeserviceService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getuserId();
    console.log(this.address_two, this.address_two, this.city, this.pincode);
  }

  getuserId() {
    this.storage.getItem('userid').then((val) => {
      this.user_id = val;
      this.getAddress();
    });
  }

  getAddress() {
    this.apiCtrl
      .post('myAddresses', { user_id: this.user_id })
      .subscribe((val) => {
        // console.log(val);
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

  dismissmodal() {
    this.modalController.dismiss();
  }

  add() {
    this.modalController.dismiss();
    this.router.navigateByUrl('address');
  }

  changeAddress(item: any) {
    console.log(item);

    this.modalController.dismiss({
      add_id: item.id,
      address_one: item.address_one,
      address_two: item.address_two,
      city: item.city,
      pincode: item.pincode,
    });
  }

  async edit(data: any) {
    this.modalController.dismiss();
    this.native.presentToast('Please edit the address from profile section');
    // this.router.navigate(['/address']);
    // this.native.present()

    // console.log(data);
    // let navigateExtra: NavigationExtras = {
    //   queryParams: {
    //     id: data.user_id,
    //     address_id: data.id,
    //     name: data.name,
    //     mobile: data.mobile,
    //     address_one: data.address_one,
    //     address_two: data.address_two,
    //     city: data.city,
    //     state: data.state,
    //     pincode: data.pincode,
    //     primary_status: data.primary_status,
    //   },
    // };
    // this.router.navigate(['address/editaddress'], navigateExtra);
  }
}
