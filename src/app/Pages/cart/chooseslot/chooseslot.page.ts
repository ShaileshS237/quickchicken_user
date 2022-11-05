import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-chooseslot',
  templateUrl: './chooseslot.page.html',
  styleUrls: ['./chooseslot.page.scss'],
})
export class ChooseslotPage implements OnInit {
  @Input() todaydate: any;
  @Input() tomdate: any;
  @Input() todayslot: any;
  @Input() tomslot: any;
  newdate: any;
  newday: any;

  firstName: string;

  time = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2.3,
    spaceBetween: 15,
  };
  date: void;
  todayslotlength: any;
  showExpress: any;
  constructor(
    public modal: ModalController,
    public apiCtrl: ApiserviceService
  ) {}

  ngOnInit() {
    // this.getTimes();
    this.todayslotlength = this.todayslot.length;
    console.log(
      this.todaydate,
      this.tomdate,
      this.todayslot,
      this.tomslot,
      this.todayslotlength
    );
    this.getSiteInfo();
    // var date = new Date();
    // console.log(date.getHours());
  }

  dismissmodal() {
    this.modal.dismiss();
  }

  getSiteInfo() {
    var date = new Date();
    var hours = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    console.log(hours + ':' + min + ':' + sec);

    if (hours > 7 && hours < 20) {
      this.showExpress = true;
    } else {
      this.showExpress = false;
    }

    // this.apiCtrl.get('siteInfo').subscribe((val) => {
    //   console.log(val);
    //   let resData: any = val;
    //   if ('' >= resData.result[0].fast_delivery_from) {
    //   } else {
    //   }
    // });
  }

  getTimes() {
    this.apiCtrl.get('availablenewday').subscribe((val) => {
      console.log('time', val);
      var resData: any = val;
      this.todaydate = resData.result.date;
      this.tomdate = resData.result.date2;
      this.todayslot = resData.result.time_result;
      this.todayslotlength = resData.result.time_result.length;
      console.log(this.todayslotlength);

      this.tomslot = resData.result.time_result2;
    });
  }

  confirmSlot(date: any, day: any) {
    console.log(date);

    if (date == '60 Minutes') {
      this.newdate = 'Today';
      this.newday = '60 Minutes';
      this.date = this.todaydate;
      console.log(this.newdate, this.newday);
    } else if (day == 'Today') {
      this.newdate = day;
      this.newday = date.start_time + ' - ' + date.end_time;
      this.date = this.todaydate;
      console.log(this.newdate, this.newday);
    } else {
      this.newdate = day;
      this.newday = date.start_time + ' - ' + date.end_time;
      this.date = this.tomdate;
      console.log(this.newdate, this.newday);
    }

    this.modal.dismiss({
      day: this.newday,
      date: this.newdate,
      date2: this.date,
    });
  }
}
