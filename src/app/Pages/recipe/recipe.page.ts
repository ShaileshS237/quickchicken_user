import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  id: any;
  recipedetails: any;
  recipeImg: any;
  recipeTitle: any;
  recipeName: any;
  recipeDescription: any;
  uploadby: string;
  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiserviceService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
      this.getRecipe();
    });
  }

  ngOnInit() {}

  getRecipe() {
    this.api
      .post('singleRecipe', { recipe_id: this.id })
      .subscribe((val: any) => {
        console.log(val);
        this.recipedetails = val.result;
        this.recipeImg = val.result.image;
        this.recipeDescription = val.result.description;
        this.recipeName = val.result.name;
        if (val.result.added_by == 1) {
          this.uploadby = 'Admin';
        } else {
          this.uploadby = 'User';
        }
        // this.recipe
      });
  }
}
