export class User {
  public email: string;
  public password: string;
  public id: number;

  constructor(email: string, password: string, id: number) {
    this.email = email;
    this.password = password;
    this.id = id;
  }
}
