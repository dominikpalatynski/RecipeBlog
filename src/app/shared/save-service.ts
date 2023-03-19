import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe-model';
import { RecipeService } from './recipe.service';
import { SaveRecipe } from './save-model';
import { StoriesService } from './stories.service';

@Injectable({ providedIn: 'root' })
export class SaveService {
  constructor(private recipeService: RecipeService) {}
  allSavedRecipes: SaveRecipe[] = [
    { userId: 1, recipesId: [], likedRecipes: [] },
  ];
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
    this.allSavedRecipes.push({ userId: id, recipesId: [], likedRecipes: [] });
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
    const indexOfSave = this.onFindCurrentUserSave(userId);
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

  exportSavedRecipe(currentUserId: number): Recipe[] {
    const indexOfSave = this.onFindCurrentUserSave(currentUserId);
    const recipesId = this.allSavedRecipes[indexOfSave].recipesId;
    const currentSaveStories =
      this.recipeService.onExportSavedRecipe(recipesId);

    return currentSaveStories;
  }
  onFindCurrentUserSave(currentUserId: number) {
    return this.allSavedRecipes.findIndex(
      (index) => index.userId === currentUserId
    );
  }
  isSave(currentUserId: number, recipe: Recipe) {
    const savedRecipe = this.allSavedRecipes.find(
      (r) => r.userId === currentUserId
    );
    return savedRecipe?.recipesId.includes(recipe.uniqueId);
  }
  isLiked(currentUserId: number, recipe: Recipe) {
    const likedRecipe = this.allSavedRecipes.find(
      (r) => r.userId === currentUserId
    );
    return likedRecipe?.likedRecipes.includes(recipe.uniqueId);
  }
  onLike(userId: number, recipeId: number) {
    const indexOfLiked = this.onFindCurrentUserSave(userId);
    this.allSavedRecipes[indexOfLiked].likedRecipes.push(recipeId);
    this.allSavedRecipesChanged.next(this.allSavedRecipes);
    this.recipeService.likeCounter(recipeId - 1);
    console.log(this.allSavedRecipes);
  }
  onUnlike(userId: number, recipeId: number) {
    const indexOfLiked = this.onFindCurrentUserSave(userId);
    const findIndexOfRec = this.allSavedRecipes[
      indexOfLiked
    ].likedRecipes.findIndex((index) => index === recipeId);
    this.allSavedRecipes[indexOfLiked].likedRecipes.splice(findIndexOfRec, 1);
    this.allSavedRecipesChanged.next(this.allSavedRecipes);
    this.recipeService.unLikeCounter(recipeId - 1);
  }
}
