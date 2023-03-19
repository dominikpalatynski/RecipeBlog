import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Recipe } from '../shared/recipe-model';
import { StoriesService } from '../shared/stories.service';
import { Subject } from 'rxjs';
import { User } from '../shared/auh-model';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveService } from '../shared/save-service';
import { RecipeService } from '../shared/recipe.service';
import { SaveRecipe } from '../shared/save-model';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  constructor(
    private storiesService: StoriesService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private saveService: SaveService,
    private recipeService: RecipeService
  ) {
    this.expandedIndex = new Array(this.allRecipes.length).fill(false);
  }

  allRecipes: Recipe[] = [];
  savedRecipes: SaveRecipe[] = [];
  expandedIndex: boolean[] = [];
  currentUser!: User;

  yourRec: boolean = false;
  searchTitle: string = '';
  ngOnInit() {
    this.allRecipes = this.recipeService.exportTopublic();
    this.recipeService.recipesPublicChanged.subscribe((recipe) => {
      this.allRecipes = recipe;
    });

    this.saveService.allSavedRecipesChanged.subscribe((saved) => {
      this.savedRecipes = saved;
    });
    this.authService.currentUserChanged.subscribe((user) => {
      this.currentUser = user;
    });
  }
  getAuthorName(id: number) {
    return this.authService.findNameById(id);
  }
  onDetail(id: number, title: string) {
    this.router.navigate([`${title}/${id}/details`], {
      relativeTo: this.route,
    });
  }
  onSave(index: number) {
    const passId = this.currentUser.id;
    const recId = this.allRecipes[index].uniqueId;

    if (!(this.currentUser.id === this.allRecipes[index].userId)) {
      this.saveService.onSaveRecipes(passId, recId);
    } else {
      window.alert(`You cant save your own recipes`);
    }
  }

  onAdd(currentUserId: number, recipeId: number) {
    this.saveService.onAdd(currentUserId, recipeId);
  }
  onDelete(currentUserId: number, recipeId: number) {
    this.saveService.onDelete(currentUserId, recipeId);
  }
  isSaved(currentUserId: number, recipe: Recipe) {
    const checkIfSave = this.saveService.isSave(currentUserId, recipe);

    checkIfSave
      ? this.onDelete(currentUserId, recipe.uniqueId)
      : this.onAdd(currentUserId, recipe.uniqueId);
  }
  isLike(currentUserId: number, reciped: Recipe) {
    const checkIsLiked = this.saveService.isLiked(currentUserId, reciped);
    checkIsLiked
      ? this.saveService.onUnlike(currentUserId, reciped.uniqueId)
      : this.saveService.onLike(currentUserId, reciped.uniqueId);
  }

  checkIfLogin(currentUser: User) {
    const check = currentUser ? true : false;
    return check;
  }
  goLoginMode() {
    this.authService.goLogin();
  }
  colorHandle(currentUserId: number, recipe: Recipe) {
    const saved = this.saveService.isSave(currentUserId, recipe);
    const liked = this.saveService.isLiked(currentUserId, recipe);
    return { saved, liked };
  }
}
