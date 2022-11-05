import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-tnc',
  templateUrl: './tnc.page.html',
  styleUrls: ['./tnc.page.scss'],
})
export class TncPage implements OnInit {
  htmlData: any;
  constructor(public api: HttpClient) {}

   ngOnInit() {
    this.gettnc();
  }

  gettnc() {
    this.api
      .get('https://quickchicken.in/api/apis/terms_api')
      .subscribe((val: any) => {
        console.log(val);
        this.htmlData = val.result;
      });
  }
}
