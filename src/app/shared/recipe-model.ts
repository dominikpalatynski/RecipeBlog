import { Ingredient } from './ingredients-model';

export class Recipe {
  public title: string;
  public description: string;
  public ingredients: Ingredient[];
  constructor(title: string, description: string, ingredients: Ingredient[]) {
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
  }
}
