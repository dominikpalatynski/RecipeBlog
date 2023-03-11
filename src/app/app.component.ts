import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'RecipeBlog';

  constructor(private authService: AuthService) {}
  currentUser = null;
  ngOnInit() {
    this.authService.currentUserChanged.subscribe((user) => {
      this.currentUser = user;
    });
    console.log(this.currentUser);
  }
}
