import { Subject } from 'rxjs';
import { Recipe } from './recipe-model';
import { Ingredient } from './ingredients-model';
import { Injectable } from '@angular/core';
import { StoriesService } from './stories.service';
import { Comment } from './comment-mode';
import { CommaExpr } from '@angular/compiler';

@Injectable()
export class RecipeService {
  constructor(private storiesService: StoriesService) {}
  recipesChanged = new Subject<Recipe[]>();
  recipesPublicChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [];

  getRecipe() {
    this.recipesChanged.next(this.recipes.slice());
    return this.recipes;
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
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
    return this.recipes.filter((rec) => rec.userId === userID);
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
    this.recipesChanged.next(this.recipes);
  }
  onAddUniqueId() {
    return this.recipes.length + 1;
  }
  onAddToPublic(index: number) {
    this.recipes[this.findIndexOfRecipe(index)].addedToPublic = true;
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
    return this.exportTopublic()[this.findIndexOfRecipe(index)];
  }
  likeCounter(recipeId: number) {
    this.recipes[this.findIndexOfRecipe(recipeId)].numberOfLikes =
      this.recipes[this.findIndexOfRecipe(recipeId)].numberOfLikes + 1;

    this.recipesChanged.next(this.recipes);
    this.recipesPublicChanged.next(this.exportTopublic());
  }
  unLikeCounter(recipeId: number) {
    this.recipes[this.findIndexOfRecipe(recipeId)].numberOfLikes =
      this.recipes[this.findIndexOfRecipe(recipeId)].numberOfLikes - 1;

    this.recipesChanged.next(this.recipes);
    this.recipesPublicChanged.next(this.exportTopublic());
  }
  addComment(recipeId: number, newComment: Comment) {
    this.recipes[this.findIndexOfRecipe(recipeId - 1)].comments.push(
      newComment
    );
    this.recipesChanged.next(this.recipes);
  }
  findIndexOfRecipe(recipeId: number) {
    const findedRecipe = this.recipes.findIndex(
      (rec) => rec.uniqueId === recipeId
    );
    return findedRecipe + 1;
  }
  onDeleteComment(recipeId: number, commentId: number) {
    console.log(this.findIndexOfRecipe(recipeId));
    this.recipes[this.findIndexOfRecipe(recipeId)].comments.splice(
      commentId,
      1
    );
  }
}
