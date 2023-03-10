import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredients-model';
import { Recipe } from 'src/app/shared/recipe-model';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  expandedIndex: boolean[] = [];
  constructor(private recipeService: RecipeService, private router: Router) {
    this.expandedIndex = new Array(this.recipes.length).fill(false);
  }
  recipes: Recipe[] = [];

  ngOnInit() {
    this.recipes = this.recipeService.getRecipe();
    this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      console.log(this.recipes);
    });
  }

  onCheck() {
    let trig: boolean = false;
    if (trig) {
      trig = false;
    }
    if (!trig) {
      trig = true;
    }
    console.log(trig);
  }
}
