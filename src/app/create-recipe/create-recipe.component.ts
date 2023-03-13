import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { User } from '../shared/auh-model';
import { AuthService } from '../shared/auth.service';
import { Recipe } from '../shared/recipe-model';
import { RecipeService } from '../shared/recipe.service';
import { StoriesService } from '../shared/stories.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
})
export class CreateRecipeComponent implements OnInit {
  constructor(
    private recService: RecipeService,
    private authService: AuthService,
    private storiesService: StoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  form: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    ingredients: new FormArray([]),
  });
  // @ts-ignore
  id: number;
  currentUser: any;
  userId: number = 0;
  editMode: boolean = false;

  ngOnInit() {
    this.authService.currentUserChanged.subscribe((user) => {
      this.currentUser = user;
      console.log(user);
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.editMode = params['name'] != null;
      this.initForm();
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
    const newRecipe = new Recipe(
      form.title,
      form.description,
      form.ingredients,
      this.currentUser.id
    );

    if (!this.editMode) {
      this.recService.addRecipe(newRecipe);
    }
    if (this.editMode) {
      this.recService.onUpdate(this.id, newRecipe);
    }

    // this.storiesService.onAddToStories(newRecipe)
  }
  onDeleteIngr(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }

  initForm() {
    let recipe = this.recService.getOneRecipe(this.id);
    let recipeTitle = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl(0, Validators.required),
      }),
    ]);

    if (this.editMode) {
      recipeTitle = recipe.title;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ing of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, Validators.required),
            })
          );
        }
      }
    }
    this.form = new FormGroup({
      title: new FormControl(recipe.title, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
