import {
  Component,
  Input,
  Output,
  AfterContentInit,
  ContentChild,
  AfterViewChecked,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  OnInit,
} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { NativeserviceService } from 'src/app/services/nativeservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-loginmain',
  templateUrl: './loginmain.page.html',
  styleUrls: ['./loginmain.page.scss'],
})
export class LoginmainPage implements OnInit {
  click: boolean = false;
  mobile: number;
  @ViewChildren('input') vc;
  constructor(
    public apiService: ApiserviceService,
    public nativeService: NativeserviceService,
    public router: Router,
    public storage: StorageService
  ) {}

  ngOnInit() {}

  send() {
    this.click = !this.click;

    this.apiService
      .post('registration', { mobile: this.mobile })
      .subscribe((data) => {
        console.log(data);
        let resData: any = data;
        if (resData.code == 301) {
          this.nativeService.presentToast('Enter Valid Mobile Number');
          this.click = !this.click;
        }
        if (resData.code == 200) {
          this.click = !this.click;
          this.nativeService.presentToast('OTPs Send Successfully');
          let navigateOtp: NavigationExtras = {
            queryParams: {
              id: resData.inserted_id,
              mobile: this.mobile,
            },
          };
          this.router.navigate(['/loginmain/otpverify'], navigateOtp);
        }
      });
  }

  skip() {
    this.storage.addItem('userid', 1).then((val) => {
      this.router.navigateByUrl('/');
    });
  }
}
