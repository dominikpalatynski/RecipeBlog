import { Subject } from 'rxjs';
import { Recipe } from './recipe-model';
import { Ingredient } from './ingredients-model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [
    new Recipe('test name', '3 jaja i chleb ', [
      new Ingredient('bekon', 3),
      new Ingredient('bekon', 3),
      new Ingredient('bekon', 3),
      new Ingredient('bekon', 3),
    ]),
    new Recipe('test 2', '3 jaja i chleb ', [new Ingredient('bekon', 3)]),
    new Recipe('test 3', '3 jaja i chleb ', [new Ingredient('bekon', 3)]),
    new Recipe('test 4', '3 jaja i chleb ', [new Ingredient('bekon', 3)]),
    new Recipe('test 5', '3 jaja i chleb ', [new Ingredient('bekon', 3)]),
  ];

  getRecipe() {
    this.recipesChanged.next(this.recipes.slice());
    return this.recipes;
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
}
