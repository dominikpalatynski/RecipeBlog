import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '../shared/auh-model';
import { AuthService } from '../shared/auth.service';
import { Recipe } from '../shared/recipe-model';
import { RecipeService } from '../shared/recipe.service';
import { SaveService } from '../shared/save-service';
import { StoriesService } from '../shared/stories.service';
import { Comment } from '../shared/comment-mode';
@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.scss'],
})
export class RecipeModalComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private storiesService: StoriesService,
    private saveService: SaveService,
    private recipeService: RecipeService
  ) {}
  currentUser!: User;
  modalRecipe!: Recipe;
  recipeId!: number;
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = params['id'];
    });
    this.authService.currentUserChanged.subscribe(
      (user) => (this.currentUser = user)
    );
    this.modalRecipe = this.recipeService.exportToModel(this.recipeId);
    console.log(this.modalRecipe);
  }

  onBack() {
    this.router.navigate(['/Stories']);
  }

  onSubmit(form: NgForm) {
    const comment = form.value.comment;
    this.recipeService.addComment(
      this.modalRecipe.uniqueId,
      new Comment(this.currentUser.id, comment)
    );
    form.resetForm();
  }
  colorHandle(currentUserId: number, recipe: Recipe) {
    const saved = this.saveService.isSave(currentUserId, recipe);
    const liked = this.saveService.isLiked(currentUserId, recipe);
    return { saved, liked };
  }
  isSaved(currentUserId: number, recipe: Recipe) {
    const checkIfSave = this.saveService.isSave(currentUserId, recipe);

    checkIfSave
      ? this.saveService.onDelete(currentUserId, recipe.uniqueId)
      : this.saveService.onAdd(currentUserId, recipe.uniqueId);
  }
  isLike(currentUserId: number, reciped: Recipe) {
    const checkIsLiked = this.saveService.isLiked(currentUserId, reciped);
    checkIsLiked
      ? this.saveService.onUnlike(currentUserId, reciped.uniqueId)
      : this.saveService.onLike(currentUserId, reciped.uniqueId);
  }
}
