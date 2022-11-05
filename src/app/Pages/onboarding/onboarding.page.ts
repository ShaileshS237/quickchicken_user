import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  public onboardslides = [];
  @ViewChild('mainSlides', { static: true }) slides: IonSlides;
  currentslide: number;
  constructor() {}

  ngOnInit() {
    this.onboardslides = [
      {
        title: 'Title 1',
        img: 'slide_1',
        desc: '  Lorem ipsum dolor, sit amet consectetur adipisicing elit Molestiae cupiditate necessitatibus soluta dicta eum dolor   perferendis enim non totam sint! Aliquam ex laborum aperiam quis  fugit. Dolorum itaque iure vitae architecto similique.',
      },
      {
        title: 'Title 2',
        img: 'slide_2',
        desc: '  Lorem ipsum dolor, sit amet consectetur adipisicing elit Molestiae cupiditate necessitatibus soluta dicta eum dolor   perferendis enim non totam sint! Aliquam ex laborum aperiam quis  fugit. Dolorum itaque iure vitae architecto similique.',
      },
      {
        title: 'Title 3',
        img: 'slide_3',
        desc: '  Lorem ipsum dolor, sit amet consectetur adipisicing elit Molestiae cupiditate necessitatibus soluta dicta eum dolor   perferendis enim non totam sint! Aliquam ex laborum aperiam quis  fugit. Dolorum itaque iure vitae architecto similique.',
      },
    ];
  }

  goBack() {
    this.slides.slidePrev();
  }

  skipBtn() {}

  goNext() {
    this.slides.slideNext();
  }
}
