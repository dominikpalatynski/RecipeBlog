import { Ingredient } from './ingredients-model';

export class Recipe {
  public title: string;
  public description: string;
  public ingredients: Ingredient[];
  public userId: number;
  public type: string;
  public difcult: number;
  public uniqueId: number;
  public addedToPublic: boolean;
  public numberOfLikes: number;

  constructor(
    title: string,
    description: string,
    ingredients: Ingredient[],
    userId: number,
    type: string,
    dificult: number,
    uniqueId: number,
    addedTopublic: boolean,
    numberOfLikes: number
  ) {
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.userId = userId;
    this.type = type;
    this.difcult = dificult;
    this.uniqueId = uniqueId;
    this.addedToPublic = addedTopublic;
    this.numberOfLikes = numberOfLikes;
  }
}
