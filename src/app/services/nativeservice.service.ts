import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NativeserviceService {
  isLoading = false;
  constructor(
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {}

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
    });
    toast.present();
  }

  async presentToastTop(msg, time) {
    const toast = await this.toastController.create({
      message: msg,
      duration: time,
      position: 'top',
    });
    toast.present();
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        // duration: 5000,
        cssClass: 'toast-class',
        message: 'Please wait...',
      })
      .then((a) => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() => console.log('dismissed'));
  }
}
