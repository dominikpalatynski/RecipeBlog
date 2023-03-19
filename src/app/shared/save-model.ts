import { Recipe } from './recipe-model';

export interface SaveRecipe {
  userId: number;
  recipesId: number[];
  likedRecipes: number[];
}
