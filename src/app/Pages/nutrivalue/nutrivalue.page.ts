import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-nutrivalue',
  templateUrl: './nutrivalue.page.html',
  styleUrls: ['./nutrivalue.page.scss'],
})
export class NutrivaluePage implements OnInit {
  image: any;
  constructor(public apiservice: ApiserviceService) {}

  ngOnInit() {
    this.apiservice
      .post('nutritionImage', { product_id: '1' })
      .subscribe((val: any) => {
        this.image = val.result.n_image;
      });
  }
}
