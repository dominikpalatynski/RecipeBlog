import { Subject } from 'rxjs';
import { Recipe } from './recipe-model';
import { Ingredient } from './ingredients-model';
import { Injectable } from '@angular/core';
import { StoriesService } from './stories.service';

@Injectable()
export class RecipeService {
  constructor(private storiesService: StoriesService) {}
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [
    new Recipe(
      'test name',
      '3 jaja i chleb ',
      [
        new Ingredient('bekon', 3),
        new Ingredient('bekon', 3),
        new Ingredient('bekon', 3),
        new Ingredient('bekon', 3),
      ],
      1
    ),
    new Recipe('test 2', '3 jaja i chleb ', [new Ingredient('bekon', 3)], 2),
    new Recipe('test 3', '3 jaja i chleb ', [new Ingredient('bekon', 3)], 2),
    new Recipe('test 4', '3 jaja i chleb ', [new Ingredient('bekon', 3)], 1),
    new Recipe('test 5', '3 jaja i chleb ', [new Ingredient('bekon', 3)], 3),
  ];

  getRecipe() {
    this.recipesChanged.next(this.recipes.slice());
    return this.recipes;
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  onImportFromStories(userID: number) {
    this.storiesService.allRecipesChanged.subscribe((rec: Recipe[]) => {
      this.recipes = rec.filter((recipe) => recipe.userId === userID);
      console.log(this.recipes);
    });
    this.recipes = this.storiesService
      .onExportRecipes()
      .filter((recipe) => recipe.userId === userID);
    this.recipesChanged.next(this.recipes.slice());
  }
  clearAfterLogOut() {
    this.recipes = [];
    this.recipesChanged.next(this.recipes.slice());
    console.log(this.recipes);
  }

  importCurrUserRecipe(userID: number) {
    this.recipes = this.recipes.filter((recipe) => recipe.userId === userID);
    this.recipesChanged.next(this.recipes.slice());
    console.log(this.recipes);
  }
  getOneRecipe(id: number) {
    return this.recipes[id];
  }
  onUpdate(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}
