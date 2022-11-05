import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  i: any = 3;
  options: AnimationOptions = {
    path: 'https://assets9.lottiefiles.com/packages/lf20_3WsNKy.json',
    loop: false,
  };
  showtext: boolean = false;
  constructor(public navctrl: NavController, public router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.showtext = true;
      var refreshId = setInterval(() => {
        this.i--;
        if (this.i == 0) {
          this.router.navigateByUrl('/');
        } else if (this.i < 0) {
          clearInterval(refreshId);
        }
      }, 1000);
    }, 0);
  }
}
