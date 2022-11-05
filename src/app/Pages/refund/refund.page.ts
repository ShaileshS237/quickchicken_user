import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.page.html',
  styleUrls: ['./refund.page.scss'],
})
export class RefundPage implements OnInit {
  htmlData: any;
  constructor(public api: HttpClient) {}

  ngOnInit() {
    this.gettnc();
  }

  gettnc() {
    this.api
      .get('https://quickchicken.in/api/apis/refund_policy_api')
      .subscribe((val: any) => {
        console.log(val);
        this.htmlData = val.result;
      });
  }
}
