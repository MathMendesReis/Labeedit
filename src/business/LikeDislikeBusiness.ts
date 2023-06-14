import { LikesDislikesDataBase } from '../database/LikeDislikeDataBase';
import { IdGenerator } from '../services/IdGenerator';
    // eslint-disable-next-line no-unused-vars


export class LikeDislikesBusiness {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private likeDislikeDataBase :  LikesDislikesDataBase,
     // eslint-disable-next-line no-unused-vars
    private idGenerator: IdGenerator,
  ) {}

  public LikeDislike =async () => {
     // eslint-disable-next-line no-unused-vars

     await this.likeDislikeDataBase.LikeDislike();

     return `like dislike`;
    };


}
