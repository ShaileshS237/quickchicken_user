import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.page.html',
  styleUrls: ['./searchbar.page.scss'],
})
export class SearchbarPage implements OnInit {
  constructor(public menu: MenuController) {}

  ngOnInit() {}

  openFirst() {
    this.menu.toggle();
    // this.menu.open('first');
  }
}
