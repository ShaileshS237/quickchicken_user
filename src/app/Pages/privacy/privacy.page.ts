import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {
  htmlData: any;
  constructor(public api: HttpClient) {}

  ngOnInit() {
    this.gettnc();
  }

  gettnc() {
    this.api
      .get('https://quickchicken.in/api/apis/privacy_policy_api')
      .subscribe((val: any) => {
        console.log(val);
        this.htmlData = val.result;
      });
  }
}
