import { Ingredient } from './ingredients-model';

export class Recipe {
  public title: string;
  public description: string;
  public ingredients: Ingredient[];
  public userId: number;
  public type: string;
  public difcult: number;

  constructor(
    title: string,
    description: string,
    ingredients: Ingredient[],
    userId: number,
    type: string,
    dificult: number
  ) {
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.userId = userId;
    this.type = type;
    this.difcult = dificult;
  }
}
