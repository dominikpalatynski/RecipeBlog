import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';
import { MyRecipeComponent } from '../my-recipe/my-recipe.component';
import { StoriesComponent } from '../stories/stories.component';
import { AuthComponent } from '../auth/auth.component';

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
  { path: 'Stories', component: StoriesComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
