import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-selectcity',
  templateUrl: './selectcity.page.html',
  styleUrls: ['./selectcity.page.scss'],
})
export class SelectcityPage implements OnInit {
  pincode: any;
  notavail: boolean = false;
  avail: boolean = false;
  cityData: any;
  pinCodeData: any;
  loading: any = false;
  constructor(
    public api: ApiserviceService,
    public navCtrl: NavController,
    public native: NativeserviceService,
    public storage: StorageService,
    public router: Router
  ) {}

  ngOnInit() {}

  checkPin() {
    this.loading = !this.loading;
    if (this.pincode.length != 6) {
      this.native.presentToast('Please Enter Valid Pin Code');
    } else {
      this.notavail = false;
      this.avail = false;
      this.api
        .post('availablePincode', { pincode: this.pincode })
        .subscribe((val) => {
          this.loading = !this.loading;
          this.pincode = null;
          console.log(val);
          var resData: any = val;
          if (resData.code == 204) {
            this.notavail = true;
            this.getAllCity();
          }
          if (resData.code == 200) {
            this.avail = true;
            this.pinCodeData = resData.result;
          }
        });
    }
  }

  getAllCity() {
    this.api.get('cities').subscribe((val) => {
      console.log(val);
      var resData: any = val;
      this.cityData = resData.result;
    });
  }

  selectCity(city, area) {
    console.log(city, area);
    this.storage.addItem('Location', { city: city, area: area }).then((val) => {
      console.log(val);
      this.router.navigate(['/']);
    });
  }
}
