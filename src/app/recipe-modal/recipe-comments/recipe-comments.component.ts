import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Route, Params } from '@angular/router';
import { User } from 'src/app/shared/auh-model';
import { AuthService } from 'src/app/shared/auth.service';
import { Recipe } from 'src/app/shared/recipe-model';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-recipe-comments',
  templateUrl: './recipe-comments.component.html',
  styleUrls: ['./recipe-comments.component.scss'],
})
export class RecipeCommentsComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    @Inject(ActivatedRoute) private route: ActivatedRoute
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
  findNameById(userId: number) {
    return this.authService.findNameById(userId);
  }
  deleteComponents(userId: number) {
    return userId === this.currentUser.id ? true : false;
  }
  onDeleteComment(commentId: number) {
    this.recipeService.onDeleteComment(this.recipeId, commentId);
  }
}
