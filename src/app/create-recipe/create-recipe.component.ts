import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/auh-model';
import { AuthService } from '../shared/auth.service';
import { Recipe } from '../shared/recipe-model';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
})
export class CreateRecipeComponent implements OnInit {
  constructor(
    private recService: RecipeService,
    private authService: AuthService
  ) {}
  form: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    ingredients: new FormArray([]),
  });
  currentUser: any;
  userId: number = 0;

  ngOnInit() {
    this.authService.currentUserChanged.subscribe((user) => {
      this.currentUser = user;
      console.log(user);
    });
  }

  get control() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }
  onGetIngredient() {
    (this.form.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl(),
      })
    );
  }
  onSubmit() {
    const form = this.form.value;
    console.log(this.currentUser);
    const newRecipe = new Recipe(
      form.title,
      form.description,
      form.ingredients,
      this.currentUser.id
    );
    this.recService.addRecipe(newRecipe);
  }
  onDeleteIngr(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }
}