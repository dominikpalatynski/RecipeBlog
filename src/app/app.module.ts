import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { MyRecipeComponent } from './my-recipe/my-recipe.component';
import { StoriesComponent } from './stories/stories.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './routing/app-routing-module';
import { RecipeListComponent } from './my-recipe/recipe-list/recipe-list.component';
import { RecipeService } from './shared/recipe.service';
import { FormsModule } from '@angular/forms';
import { RecipeElementComponent } from './my-recipe/recipe-list/recipe-element/recipe-element.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/auth.service';
import { StoriesService } from './shared/stories.service';
import { MatIconModule } from '@angular/material/icon';
import { RecipeModalComponent } from './recipe-modal/recipe-modal.component';
import { FilterByTitle } from './pipes/searchName';
import { SaveService } from './shared/save-service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateRecipeComponent,
    MyRecipeComponent,
    StoriesComponent,
    AuthComponent,
    RecipeListComponent,
    RecipeElementComponent,
    RecipeModalComponent,
    FilterByTitle,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [RecipeService, AuthService, StoriesService, SaveService],
  bootstrap: [AppComponent],
  exports: [MatIconModule],
})
export class AppModule {}
