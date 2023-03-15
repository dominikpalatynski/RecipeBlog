import { Recipe } from './recipe-model';

export interface SaveRecipe {
  userId: number;
  Recipe: Recipe;
}
