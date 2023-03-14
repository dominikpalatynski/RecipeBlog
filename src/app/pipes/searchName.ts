import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../shared/recipe-model';

@Pipe({
  name: 'filterByTitle',
})
export class FilterByTitle implements PipeTransform {
  transform(recipes: Recipe[], name: string): Recipe[] {
    if (!recipes || !name) {
      return recipes;
    }
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(name.toLowerCase())
    );
  }
}
