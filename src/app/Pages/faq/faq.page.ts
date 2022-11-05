import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  htmlData: any;
  constructor(public api: HttpClient) {}

  ngOnInit() {
    this.gettnc();
  }

  gettnc() {
    this.api
      .get('https://quickchicken.in/api/apis/faq_api')
      .subscribe((val: any) => {
        console.log(val);
        this.htmlData = val.result;
      });
  }
}
