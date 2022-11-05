import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  constructor(public router: Router, public navctrl: NavController) {}

  ngOnInit() {
    setTimeout(() => {
      console.log('yes');
      this.router.navigate(['/']);
    }, 7000);
  }
}
