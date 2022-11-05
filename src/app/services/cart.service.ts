import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiserviceService } from './apiservice.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartCount: any = new Subject<number>();
  constructor(public api: ApiserviceService) {}

  addToCart(userid, productid, weight, quantity) {
    return this.api.post('addToCart', {
      user_id: userid,
      product_id: productid,
      weight: weight,
      quantity: quantity,
    });
  }

  getCartCount() {}
}
