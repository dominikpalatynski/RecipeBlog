import { Ingredient } from './ingredients-model';

export class Recipe {
  public title: string;
  public description: string;
  public ingredients: Ingredient[];
  public userId: number;
  constructor(
    title: string,
    description: string,
    ingredients: Ingredient[],
    userId: number
  ) {
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.userId = userId;
  }
}
