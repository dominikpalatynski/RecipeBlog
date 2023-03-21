import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Recipe } from 'src/app/shared/recipe-model';
import { User } from 'src/app/shared/auh-model';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-recipe-modal-detail',
  templateUrl: './recipe-modal-detail.component.html',
  styleUrls: ['./recipe-modal-detail.component.scss'],
})
export class RecipeModalDetailComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  currentUser!: User;
  modalRecipe!: Recipe;
  recipeId!: number;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = params['id'];
    });
    this.modalRecipe = this.recipeService.exportToModel(this.recipeId);
    console.log(this.modalRecipe);
    this.authService.currentUserChanged.subscribe(
      (user) => (this.currentUser = user)
    );
  }
}
