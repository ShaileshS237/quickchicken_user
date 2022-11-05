import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  userid: any;
  allnotification: any;
  constructor(public storage: Storage, public apiservice: ApiserviceService) {}

  ngOnInit() {
    this.getUserid();
  }

  getUserid() {
    this.storage.get('userid').then((val) => {
      this.userid = val;
      this.getNotification();
      // console.log(val);
      // this.getRecipe();
    });
  }

  getNotification() {
    console.log([{ user_id: this.userid }]);

    this.apiservice
      .post('myNotifications', { user_id: this.userid })
      .subscribe((val: any) => {
        console.log(val);
        this.allnotification = val.result;
      });
  }

  getRecipe() {
    console.log([{ user_id: this.userid }]);

    this.apiservice.get('homePageRecipes').subscribe((val: any) => {
      console.log(val);
      this.allnotification = val.result;
    });
  }

  ionViewDidEnter() {
    this.getUserid();
  }
}
