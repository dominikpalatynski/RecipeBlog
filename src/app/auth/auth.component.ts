import { BoundElementProperty } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UrlSegment } from '@angular/router';
import { User } from '../shared/auh-model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService) {}
  loginMode: boolean = false;
  inputTouched: boolean = false;
  inputPTouched: boolean = false;
  isLog: boolean = false;
  currentUser?: User;
  ngOnInit() {}

  onSwitchSignIn() {
    this.loginMode = !this.loginMode;
    console.log(this.loginMode);
  }
  onSubmit(form: NgForm) {
    if (this.loginMode) {
      this.authService.signIn(form.value.email, form.value.password);
      this.authService.currentUserChanged.subscribe((user) => {
        this.currentUser = user;
      });
    } else if (!this.loginMode) {
      this.authService.signUp(form.value.email, form.value.password);
      this.authService.currentUserChanged.subscribe((user) => {
        this.currentUser = user;
      });
    }

    console.log(this.currentUser);
    form.reset();
  }
  onLogOut() {}
}
