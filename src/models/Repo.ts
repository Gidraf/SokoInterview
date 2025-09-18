import { User } from "./User";

// src/models/Repo.ts
export class Repo {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  updated_at: string | number | Date;
  owner: User;
  html_url: string | undefined;
  readme: string|undefined;

  constructor(
    id: string,
    name: string,
    description: string,
    stars: number,
    forks: number,
    language: string,
    updated_at: string | number | Date,
    owner: User
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.stars = stars;
    this.forks = forks;
    this.language = language;
    this.updated_at = updated_at
    this.owner = owner
  }
}
