import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.component.html',
  styleUrls: ['./my-recipe.component.scss'],
})
export class MyRecipeComponent {
  constructor(private router: Router) {}
  onGoToSaved() {
    this.router.navigate(['/saved']);
  }
}
