import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  name: any;
  mobile: any;
  email: any;
  id: any;
  showloading: boolean = true;
  constructor(
    public api: ApiserviceService,
    public native: NativeserviceService,
    public route: ActivatedRoute,
    public navctrl: NavController
  ) {
    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.getuserdeatils();
  }

  getuserdeatils() {
    this.api.post('userProfile', { user_id: this.id }).subscribe((val) => {
      this.showloading = false;
      let resData: any = val;
      console.log(val);
      this.name = resData.result[0].name;
      this.email = resData.result[0].email;
      this.mobile = resData.result[0].mobile;
    });
  }
  update() {
    this.native.present();
    this.api
      .post('userProfileUpdate', {
        user_id: this.id,
        name: this.name,
        email: this.email,
      })
      .subscribe((val) => {
        this.native.dismiss().then((val) => {
          this.navctrl.pop();
        });
      });
  }
}
