import { Subject } from 'rxjs';
import { Recipe } from './recipe-model';
import { Ingredient } from './ingredients-model';
import { Injectable } from '@angular/core';
import { StoriesService } from './stories.service';

@Injectable()
export class RecipeService {
  constructor(private storiesService: StoriesService) {}
  recipesChanged = new Subject<Recipe[]>();
  recipesPublicChanged = new Subject<Recipe[]>();
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
      1,
      'dessert',
      3,
      1,
      false,
      0
    ),
    new Recipe(
      'test name',
      '3 jaja i chleb ',
      [
        new Ingredient('bekon', 3),
        new Ingredient('bekon', 3),
        new Ingredient('bekon', 3),
        new Ingredient('bekon', 3),
      ],
      1,
      'dessert',
      3,
      1,
      false,
      0
    ),
  ];

  getRecipe() {
    this.recipesChanged.next(this.recipes.slice());
    return this.recipes;
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  // onImportFromStories(userID: number) {
  //   this.storiesService.allRecipesChanged.subscribe((rec: Recipe[]) => {
  //     this.recipes = rec.filter((recipe) => recipe.userId === userID);
  //     console.log(this.recipes);
  //   });
  //   this.recipes = this.storiesService
  //     .onExportRecipes()
  //     .filter((recipe) => recipe.userId === userID);
  //   this.recipesChanged.next(this.recipes.slice());
  // }
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
  onUpdate(
    id: number,
    title: string,
    description: string,
    ingredients: Ingredient[]
  ) {
    this.recipes[id].title = title;
    this.recipes[id].description = description;
    this.recipes[id].ingredients = ingredients;
    this.recipesChanged.next(this.recipes.slice());
  }
  onAddUniqueId() {
    return this.recipes.length + 1;
  }
  onAddToPublic(index: number) {
    this.recipes[index].addedToPublic = true;
    this.recipesChanged.next(this.recipes);
    this.exportTopublic();
    this.recipesPublicChanged.next(this.exportTopublic());
  }
  exportTopublic() {
    return this.recipes.filter((recipe) => {
      return recipe.addedToPublic;
    });
  }
  onExportSavedRecipe(idToFilter: number[]): Recipe[] {
    const filteredRecipes = this.exportTopublic().filter((recipe) => {
      return idToFilter.includes(recipe.uniqueId);
    });

    return filteredRecipes;
  }
  exportToModel(index: number) {
    return this.exportTopublic()[index];
  }
}
