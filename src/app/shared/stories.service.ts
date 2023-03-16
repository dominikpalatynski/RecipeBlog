import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './ingredients-model';
import { Recipe } from './recipe-model';

@Injectable()
export class StoriesService {
  allRecipies: Recipe[] = [
    // new Recipe(
    //   'test name',
    //   '3 jaja i chleb ',
    //   [
    //     new Ingredient('bekon', 3),
    //     new Ingredient('bekon', 3),
    //     new Ingredient('bekon', 3),
    //     new Ingredient('bekon', 3),
    //   ],
    //   1
    // ),
    // new Recipe('test 2', '3 jaja i chleb ', [new Ingredient('bekon', 3)], 2),
    // new Recipe('test 3', '3 jaja i chleb ', [new Ingredient('bekon', 3)], 2),
    // new Recipe('test 4', '3 jaja i chleb ', [new Ingredient('bekon', 3)], 1),
    // new Recipe('test 5', '3 jaja i chleb ', [new Ingredient('bekon', 3)], 3),
  ];

  allRecipesChanged = new Subject<Recipe[]>();
  onExportRecipes() {
    this.allRecipesChanged.next(this.allRecipies);
    return this.allRecipies;
  }

  onAddToStories(recipe: Recipe) {
    this.allRecipies.push(recipe);
    this.allRecipesChanged.next(this.allRecipies);
  }
  shareFromRecipes(recipe: Recipe) {
    this.allRecipies.push(recipe);
    this.allRecipesChanged.next(this.allRecipies.slice());
  }
}
