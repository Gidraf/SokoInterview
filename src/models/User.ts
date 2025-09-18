// src/models/User.ts
export class User {
  id: string;
  username: string;
  avatarUrl: string;
  login:string;

  constructor(id: string, username: string, avatarUrl: string,login:string) {
    this.id = id;
    this.username = username;
    this.avatarUrl = avatarUrl;
    this.login = login;
  }
}
