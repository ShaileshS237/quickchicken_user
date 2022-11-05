import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  search: any;
  searchresult: any;
  showNoResult: boolean = false;
  constructor(
    public api: ApiserviceService,
    public native: NativeserviceService
  ) {}

  ngOnInit() {}

  productSearch() {
    this.showNoResult = false;
    this.searchresult = null;
    this.native.present();
    this.api
      .post('productSearch', { name: this.search })
      .subscribe((val: any) => {
        console.log(val);
        let resData: any = val;
        if (val.code == 204) {
          this.showNoResult = true;
        } else {
          this.searchresult = resData.result;
        }

        this.native.dismiss();
      });
  }
}
