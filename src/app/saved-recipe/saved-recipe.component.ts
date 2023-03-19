import { Component, OnInit } from '@angular/core';
import { User } from '../shared/auh-model';
import { AuthService } from '../shared/auth.service';
import { Recipe } from '../shared/recipe-model';
import { SaveService } from '../shared/save-service';

@Component({
  selector: 'app-saved-recipe',
  templateUrl: './saved-recipe.component.html',
  styleUrls: ['./saved-recipe.component.scss'],
})
export class SavedRecipeComponent implements OnInit {
  constructor(
    private saveService: SaveService,
    private authService: AuthService
  ) {}
  currentUser!: User;
  savedRecipes: Recipe[] = [];
  ngOnInit() {
    this.authService.currentUserChanged.subscribe((user) => {
      this.currentUser = user;
    });
    this.savedRecipes = this.saveService.exportSavedRecipe(this.currentUser.id);
    console.log(this.savedRecipes);
  }
}
