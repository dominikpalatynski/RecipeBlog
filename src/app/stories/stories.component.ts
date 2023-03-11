import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Recipe } from '../shared/recipe-model';
import { StoriesService } from '../shared/stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  constructor(
    private storiesService: StoriesService,
    public authService: AuthService
  ) {
    this.expandedIndex = new Array(this.allRecipes.length).fill(false);
  }

  allRecipes: Recipe[] = [];
  expandedIndex: boolean[] = [];
  ngOnInit() {
    this.allRecipes = this.storiesService.onExportRecipes();
  }
  getAuthorName(id: number) {
    return this.authService.findNameById(id);
  }
}
