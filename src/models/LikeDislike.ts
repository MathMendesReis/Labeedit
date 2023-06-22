export class LikeDislike {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private id: string,
    // eslint-disable-next-line no-unused-vars
    private post_id: string,
    // eslint-disable-next-line no-unused-vars
    private user_id: string,
    // eslint-disable-next-line no-unused-vars
    private type: number
  ) {}
  public getId(): string {
    return this.id;
  }

  public getPostId(): string {
    return this.post_id;
  }
  public getUserId(): string {
    return this.user_id;
  }
  public getType(): number {
    return this.type;
  }

  public setType(newTipy: number) {
    this.type = newTipy;
  }
}

export interface likeDislike {
  id: string;
  post_id: string;
  user_id: string;
  type: number;
}
