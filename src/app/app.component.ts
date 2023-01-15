import { Component, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  IonRouterOutlet,
  MenuController,
  Platform,
} from '@ionic/angular';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { StorageService } from './services/storage.service';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ApiserviceService } from './services/apiservice.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  backButtonSubscription;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  status: OnlineStatusType; //Enum provided by ngx-online-status
  onlineStatusCheck: any = OnlineStatusType;
  public appPages = [
    { title: 'Home', url: '/', icon: 'Home', img: 'Home.svg' },
    {
      title: 'My Account',
      url: '/tabs/tab2',
      icon: 'person-circle',
      img: 'Profile.svg',
    },
    { title: 'My Orders', url: '/tabs/tab4', icon: 'cart', img: 'Orders.svg' },
    {
      title: 'My Addresses',
      url: '/address',
      icon: 'locate',
      img: 'Address.svg',
    },
    // { title: 'Notifications', url: '/notification', icon: 'trash' },
    // { title: 'Contact us', url: '/contact', icon: 'document' },

    {
      title: 'Terms and Cond.',
      url: '/tnc',
      icon: 'person-circle',
      img: 'Terms _ Consditions.svg',
    },
    { title: 'FAQs', url: '/faq', icon: 'help', img: 'Home.svg' },
    {
      title: 'Privacy Policy',
      url: '/privacy',
      icon: 'finger-print',
      img: 'Home.svg',
    },
    { title: 'Refund Policy', url: '/refund', icon: 'card', img: 'Home.svg' },
  ];

  oneSignalAppId: any = '431f41fb-c3e2-43e2-9203-21b9b4ae33a9';
  googleProjectId: any = '270035821587';
  userid: any;
  faq: any;
  privacy: any;
  refund: any;
  terms: any;
  support: any;

  constructor(
    public platform: Platform,
    public router: Router,
    private oneSignal: OneSignal,
    public storage: StorageService,
    private onlineStatusService: OnlineStatusService,
    private menuctrl: MenuController,
    public alertController: AlertController,
    private socialSharing: SocialSharing,
    public apictrl: ApiserviceService
  ) {
    this.initializeApp();
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      // Retrieve Online status Type
      this.status = status;

      //console.log(this.status, 'status');
    });
  }
  initializeApp() {
    this.platform.ready().then(async () => {
      this.getsiteinfo();
      this.backButtonEvent();
      this.OneSignalInit();
      await this.getUserId();
      await this.storage.getItem('userid').then((val) => {
        // this.router.navigate(['/']);
        //console.log(val, 'this.userid');
        if (val == null || val == undefined) {
          this.storage.addItem('userid', 1);
        }
      });
    });
  }

  OneSignalInit() {
    this.oneSignal.startInit(this.oneSignalAppId, this.googleProjectId);
    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );
    this.oneSignal.handleNotificationReceived().subscribe((res) => {
      // do something when notification is received
      // alert()
      //console.log('res', res);
    });
    this.oneSignal.handleNotificationOpened().subscribe((result) => {
      // do something when a notification is opened
    });
    this.oneSignal.endInit();

    this.oneSignal.getIds().then((identity) => {
      // alert(identity.pushToken),
      // alert(identity.userId);
      //console.log(identity.pushToken);
      //console.log(identity.userId);
    });
  }

  async getUserId() {
    await this.storage.getItem('userid').then((val) => {
      this.userid = val;
      if (val == null || val == undefined) {
        this.storage.addItem('userid', 1);
      }
    });
  }

  redirect(url: any) {
    //console.log(url);
    if (this.userid == 1) {
      if (url == '/profile' || url == '/orders' || url == '/address') {
        this.router.navigate(['/']);
      } else {
        this.router.navigate([url]);
        // this.router.navigate(['/splash']);
      }
    } else {
      this.router.navigate([url]);
      // this.router.navigate(['/splash']);
    }
  }

  // menuOpened() {
  //   //console.log('yes');
  // }
  showSubmenu: any = false;
  async menuOpened2() {
    this.showSubmenu = false;
    await this.getUserId();
  }

  navigate() {
    this.router.navigate(['/']);
  }

  toggleSubMenu() {
    this.showSubmenu = !this.showSubmenu;
    //console.log('yes');
  }

  async routerMenu(path: any) {
    await this.menuctrl.close();
    // console.log(path);

    if (path == 'Home') {
      this.router.navigateByUrl('/');
    } else if (path == 'Contact Us') {
      this.router.navigateByUrl('/contact');
    } else if (path == 'Terms & Conditions') {
      this.router.navigateByUrl('/tnc');
    } else if (path == 'FAQ') {
      this.router.navigateByUrl('/faq');
    } else if (path == 'Privacy Policy') {
      this.router.navigateByUrl('/privacy');
    } else if (path == 'Refund Policy') {
      this.router.navigateByUrl('/refund');
    } else if (path == 'Refer App') {
      this.share();
    } else if (path == 'My Profile') {
      this.router.navigateByUrl('/tabs/tab2');
    } else if (path == 'My Addresses') {
      this.router.navigateByUrl('/address');
    } else if (path == 'Notifications') {
      this.router.navigateByUrl('/tabs/tab5');
    } else if (path == 'My Orders') {
      this.router.navigateByUrl('/tabs/tab4');
    } else if (path == 'Support') {
      this.router.navigateByUrl('/support');
    } else if (path == 'Logout') {
      this.logout();
    }
  }

  share() {
    var options = {
      message:
        'Hey, I love Quick Chicken app & I think you will too! Download The app now : ',
      url: 'https://play.google.com/store/apps/details?id=com.quickchicken',
    };
    this.socialSharing.shareWithOptions(options);
  }

  async logout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure you want to <br> <strong>log out?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'LOG OUT',
          id: 'confirm-button',
          handler: () => {
            this.confirmLogout();
          },
        },
      ],
    });

    await alert.present();
  }

  confirmLogout() {
    this.storage.addItem('userid', 1).then((val) => {
      this.router.navigate(['/tabs']);
    });
    // this.storage.deleteItem('userid').then((val) => {
    //   this.router.navigateByUrl('/');
    // });
  }

  backButtonEvent() {
    this.backButtonSubscription = this.platform.backButton.subscribe(
      async () => {
        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
          if (outlet && outlet.canGoBack()) {
            outlet.pop();
          } else if (
            this.router.url === '/tabs/tab2' ||
            this.router.url === '/tabs/tab3' ||
            this.router.url === '/tabs/tab4' ||
            this.router.url === '/tabs/tab5'
          ) {
            this.router.navigate(['/']);
            // navigator['app'].exitApp();
          } else if (this.router.url === '/tabs/tab1') {
            this.presentAlertConfirm();
          }
        });
      }
    );
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Are you sure, you want to exit?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            //console.log('Confirm Okay');
            navigator['app'].exitApp();
          },
        },
      ],
    });
    await alert.present();
  }
  ngOnDestroy() {
    // Unregister the custom back button action for this page
    this.backButtonSubscription.unsubscribe();
  }

  getsiteinfo() {
    this.apictrl.get('siteInfo').subscribe((val: any) => {
      console.log(val);
      this.faq = val.result[0].faq;
      console.log(this.faq);

      this.privacy = val.result[0].privacy_policy;
      this.refund = val.result[0].refund_policy;
      this.terms = val.result[0].terms;
      this.support = val.result[0].support;
    });
  }
}
