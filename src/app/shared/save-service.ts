import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe-model';
import { SaveRecipe } from './save-model';

// @Injectable({ providedIn: 'root' })
export class SaveService {
  allSavedRecipes: SaveRecipe[] = [{ userId: 1, recipesId: [] }];
  allSavedRecipesChanged = new Subject<SaveRecipe[]>();
  onSaveRecipes(userId: number, recipeId: number) {
    const indexOfSave = this.allSavedRecipes.findIndex(
      (index) => index.userId === userId
    );
    if (this.checkCanSave(userId, recipeId)) {
      window.alert('Przepis jest już zapisany');
    } else {
      this.allSavedRecipes[indexOfSave].recipesId.push(recipeId);
      this.allSavedRecipesChanged.next(this.allSavedRecipes);
    }
  }
  createNewElement(id: number) {
    this.allSavedRecipes.push({ userId: id, recipesId: [] });
    this.allSavedRecipesChanged.next(this.allSavedRecipes.slice());
  }
  checkCanSave(userId: number, recipeId: number) {
    const indexOfSave = this.allSavedRecipes.findIndex(
      (index) => index.userId === userId
    );
    let checkIfSave;
    for (let rec of this.allSavedRecipes[indexOfSave].recipesId) {
      if (rec === recipeId) {
        checkIfSave = true;
      } else {
        checkIfSave = false;
      }
    }
    return checkIfSave;
  }
  onAdd(userId: number, recipeId: number) {
    const indexOfSave = this.allSavedRecipes.findIndex(
      (index) => index.userId === userId
    );
    this.allSavedRecipes[indexOfSave].recipesId.push(recipeId);
    this.allSavedRecipesChanged.next(this.allSavedRecipes);
  }
  onDelete(userId: number, recipeId: number) {
    const indexOfSave = this.allSavedRecipes.findIndex(
      (index) => index.userId === userId
    );
    const findIndexOfRec = this.allSavedRecipes[
      indexOfSave
    ].recipesId.findIndex((index) => index === recipeId);
    this.allSavedRecipes[indexOfSave].recipesId.splice(findIndexOfRec, 1);
    this.allSavedRecipesChanged.next(this.allSavedRecipes);
  }

  isSave(currentUserId: number, recipe: Recipe) {
    const savedRecipe = this.allSavedRecipes.find(
      (r) => r.userId === currentUserId
    );
    return savedRecipe?.recipesId.includes(recipe.uniqueId);
  }
}
