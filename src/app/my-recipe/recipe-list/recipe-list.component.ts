import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Ingredient } from 'src/app/shared/ingredients-model';
import { Recipe } from 'src/app/shared/recipe-model';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private authService: AuthService
  ) {
    this.expandedIndex = new Array(this.recipes.length).fill(false);
  }
  expandedIndex: boolean[] = [];
  currentUser = null;

  recipes: Recipe[] = [];

  ngOnInit() {
    this.recipes = this.recipeService.getRecipe();
    this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      console.log(this.recipes);
    });

    this.authService.currentUserChanged.subscribe((user) => {
      this.currentUser = user;
    });
    console.log(this.currentUser);
    console.log(this.recipes);
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
