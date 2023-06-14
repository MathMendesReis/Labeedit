export class LikeDislike{
  constructor(

    // eslint-disable-next-line no-unused-vars
    private post_id:string,
    // eslint-disable-next-line no-unused-vars
    private user_id:string,
    // eslint-disable-next-line no-unused-vars
    private value:string,
  ){}

  public getPostId():string{
    return this.post_id;
  }
  public getUserId():string{
    return this.user_id;
  }
  public getIdValue():string{
    return this.value;
  }
}
