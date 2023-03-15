import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Recipe } from '../shared/recipe-model';
import { StoriesService } from '../shared/stories.service';
import { Subject } from 'rxjs';
import { User } from '../shared/auh-model';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveService } from '../shared/save-service';

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
    private saveService: SaveService
  ) {
    this.expandedIndex = new Array(this.allRecipes.length).fill(false);
  }

  allRecipes: Recipe[] = [];
  expandedIndex: boolean[] = [];
  currentUser!: User;
  yourRec: boolean = false;
  searchTitle: string = '';
  ngOnInit() {
    this.allRecipes = this.storiesService.onExportRecipes();
    this.storiesService.allRecipesChanged.subscribe((allRec) => {
      this.allRecipes = allRec;
    });
    this.authService.currentUserChanged.subscribe((user) => {
      this.currentUser = user;
      console.log(user);
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
    if (!(this.currentUser.id === this.allRecipes[index].userId)) {
      this.saveService.onSaveRecipes(
        this.currentUser.id,
        this.allRecipes[index]
      );
    } else {
      window.alert(`You cant save your own recipes`);
    }
  }
}
