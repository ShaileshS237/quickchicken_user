import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userDetails: any;
  userid: any;
  showNonlogin: boolean;
  constructor(
    public api: ApiserviceService,
    public storage: StorageService,
    public alertController: AlertController,
    public router: Router
  ) {}

  async ngOnInit() {
    await this.getUserDeatils();
  }

  getUserDeatils() {
    this.showNonlogin = false;
    this.storage.getItem('userid').then((val) => {
      this.userid = val;
      if (this.userid == 1) {
        this.showNonlogin = true;
        // this.router.navigate(['/login']);
      }
      this.getProfileDeatils();
    });
  }

  getProfileDeatils() {
    this.api.post('userProfile', { user_id: this.userid }).subscribe((val) => {
      console.log(val);
      var resData: any = val;
      this.userDetails = resData.result;
      console.log(this.userDetails);
    });
  }

  async logout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure you want to <br> <strong>log out?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'LOG OUT',
          id: 'confirm-button',
          handler: () => {
            this.confirmLogout();
          },
        },
      ],
    });

    await alert.present();
  }

  confirmLogout() {
    this.storage.addItem('userid', 1).then((val) => {
      this.router.navigate(['/tabs']);
    });
    // this.storage.deleteItem('userid').then((val) => {
    //   this.router.navigateByUrl('/');
    // });
  }

  ionViewDidEnter() {
    // console.log('shailesh');
    this.getUserDeatils();
  }
}
