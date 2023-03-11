import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}
  currentUser = null;
  isLoginMode: boolean = true;
  ngOnInit() {
    this.onIsLoginMode();
  }

  onAuth() {
    this.onIsLoginMode();

    console.log(this.isLoginMode);
    if (this.isLoginMode) {
      this.route.navigate(['/auth']);
    } else {
      this.authService.logOut();
      console.log(this.currentUser);
      this.route.navigate(['/auth']);
    }
    console.log(this.isLoginMode);
  }

  onIsLoginMode() {
    this.authService.currentUserChanged.subscribe((user) => {
      this.currentUser = user;
      user ? (this.isLoginMode = false) : (this.isLoginMode = true);
    });
  }
}
