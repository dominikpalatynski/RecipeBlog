import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Ingredient } from 'src/app/shared/ingredients-model';
import { Recipe } from 'src/app/shared/recipe-model';
import { RecipeService } from 'src/app/shared/recipe.service';
import { StoriesService } from 'src/app/shared/stories.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private authService: AuthService,
    private storiesService: StoriesService,
    private route: ActivatedRoute
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
      // this.recipeService.onImportFromStories(user.id);
      this.recipeService.importCurrUserRecipe(user.id);
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

  goToEdit(name: string, id: number) {
    console.log(name);
    this.router.navigate([`${name}/${id}/edit`], { relativeTo: this.route });
  }
  dropDownBut() {}
  onShare(r: number) {
    this.storiesService.shareFromRecipes(this.recipes[r]);
  }
}
