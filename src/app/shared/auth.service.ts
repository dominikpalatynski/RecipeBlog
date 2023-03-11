import { OnInit } from '@angular/core';
import { User } from './auh-model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {
  usersChanged = new Subject<User[]>();
  userLogIn = new Subject<boolean>();

  currentUserChanged = new BehaviorSubject<any>(null);
  exportUserID = new Subject<number>();

  constructor(private route: Router, private recipeService: RecipeService) {}

  ngOnInit() {}
  userLog = false;
  users: User[] = [
    new User('dominik.palatynski@gmail.com', 'adidas2001', 1),
    new User('dominik.palatybski@gmail.com', 'adidas2001', 2),
    new User('domin.palatybski@gmail.com', 'adidas2001', 3),
  ];

  signUp(email: string, password: string) {
    const id = this.users.length + 1;
    const checkUserExist = this.findByName(email);
    const user = new User(email, password, id);

    if (!checkUserExist) {
      this.users.push(user);
      this.userLog = true;

      this.currentUserChanged.next(user);
      this.usersChanged.next(this.users.slice());
      this.userLogIn.next(this.userLog);
      this.route.navigate(['/Stories']);
    }
    if (checkUserExist) {
      window.alert('This user already exist');
    }
  }
  signIn(email: string, password: string) {
    const userName = this.findByName(email);
    const _icheckP = this.CheckUserPassword(email, password);
    let _xCheckP = null;

    if (this.users[_icheckP].password === password) {
      _xCheckP = true;
    } else {
      _xCheckP = false;
    }

    if (_xCheckP) {
      this.userLog = true;

      this.currentUserChanged.next(this.users[_icheckP]);
      this.route.navigate(['/Stories']);
      console.log(_icheckP);
      this.recipeService.onImportFromStories(_icheckP + 1);
      window.alert('zalogowany pomyślnie');
    } else {
      this.userLog = false;
      window.alert('Invalid userName or password');
    }

    this.userLogIn.next(this.userLog);
  }

  findByName(email: string) {
    return this.users.find((user) => {
      return user.email === email;
    });
  }
  CheckUserPassword(email: string, password: string) {
    const userIndex = this.users.findIndex((user) => {
      return user.email;
    });
    if (userIndex !== -1) {
      return userIndex;
    } else {
      return -1;
    }
  }
  logOut() {
    this.currentUserChanged.next(null);
  }
  findNameById(userId: number) {
    const user = this.users.find((u) => u.id === userId);
    return user ? user.email : null;
  }
}
