export class Comment {
  public authorId: number;
  public comment: string;

  constructor(authorId: number, comment: string) {
    this.authorId = authorId;
    this.comment = comment;
  }
}
