import { BoundElementProperty } from '@angular/compiler';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private authService: AuthService) {}
  loginMode: boolean = false;
  inputTouched: boolean = false;
  inputPTouched: boolean = false;

  onSwitchSignIn() {
    this.loginMode = !this.loginMode;
    console.log(this.loginMode);
  }
  onSubmit(form: NgForm) {
    if (this.loginMode) {
      this.authService.signIn(form.value.email, form.value.password);
    } else if (!this.loginMode) {
      this.authService.signUp(form.value.email, form.value.password);
    }

    form.reset();
  }
}
