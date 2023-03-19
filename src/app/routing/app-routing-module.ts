import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';
import { MyRecipeComponent } from '../my-recipe/my-recipe.component';
import { StoriesComponent } from '../stories/stories.component';
import { AuthComponent } from '../auth/auth.component';
import { RecipeModalComponent } from '../recipe-modal/recipe-modal.component';
import { SavedRecipeComponent } from '../saved-recipe/saved-recipe.component';

const appRoutes: Routes = [
  { path: 'create', component: CreateRecipeComponent },
  {
    path: 'Your',
    component: MyRecipeComponent,
    children: [
      {
        path: ':name/:id/edit',
        component: CreateRecipeComponent,
      },
    ],
  },
  {
    path: 'Stories',
    component: StoriesComponent,
    children: [
      {
        path: ':name/:id/details',
        component: RecipeModalComponent,
      },
    ],
  },
  { path: 'auth', component: AuthComponent },
  { path: 'saved', component: SavedRecipeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
