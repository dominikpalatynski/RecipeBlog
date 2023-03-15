import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe-model';
import { SaveRecipe } from './save-model';

// @Injectable({ providedIn: 'root' })
export class SaveService {
  saveRecipes: SaveRecipe[] = [];
  saveRecipesChanged = new Subject<SaveRecipe[]>();

  onSaveRecipes(id: number, recipe: Recipe) {
    const savedRecipe: SaveRecipe = { userId: id, Recipe: recipe };
    this.saveRecipes.push(savedRecipe);
    this.saveRecipesChanged.next(this.saveRecipes);
    console.log(this.saveRecipes);
  }
}
