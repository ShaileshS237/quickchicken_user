import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private previousUrl: string;

  constructor(private router: Router, public storage: Storage) {
    this.storage.create();
    // this.router.events
    //   .pipe(
    //     filter((evt: any) => evt instanceof RoutesRecognized),
    //     pairwise()
    //   )
    //   .subscribe((events: RoutesRecognized[]) => {
    //     this.previousUrl = events[0].urlAfterRedirects;
    //     console.log('previous url', this.previousUrl);
    //   });
  }
  public getPreviousUrl() {
    return this.previousUrl;
  }

  getItem(item: any) {
    return this.storage.get(item);
  }

  addItem(itemkey: any, itemvalue: any) {
    return this.storage.set(itemkey, itemvalue);
  }

  // updateItem() {
  //   return this.storage.
  // }

  deleteItem(item) {
    return this.storage.remove(item);
  }
}
