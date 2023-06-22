import { LikeDislike, likeDislike } from '../models/LikeDislike';
import { BaseDatabase } from './BaseDataBase';

export class LikesDislikesDataBase extends BaseDatabase {
  private static TABLE_ACCOUNTS = 'likesDislikes';

  public createLikeDislike = async (like: LikeDislike) => {
    return await BaseDatabase.connection(
      LikesDislikesDataBase.TABLE_ACCOUNTS
    ).insert({
      id: like.getId(),
      post_id: like.getPostId(),
      type: like.getType(),
      user_id: like.getUserId(),
    });
  };

  public updateLikeDislike = async (like: LikeDislike) => {
    return await BaseDatabase.connection(LikesDislikesDataBase.TABLE_ACCOUNTS)
      .where({ id: like.getId() })
      .update({
        type: like.getType(),
      });
  };

  public foundLikeDiliskeByUserId = async (
    user_id: string
  ): Promise<likeDislike> => {
    return (
      await BaseDatabase.connection(LikesDislikesDataBase.TABLE_ACCOUNTS).where(
        { user_id: user_id }
      )
    )[0];
  };
  public foundLikeDiliskeByPostId = async (
    post_id: string
  ): Promise<likeDislike> => {
    return (
      await BaseDatabase.connection(LikesDislikesDataBase.TABLE_ACCOUNTS).where(
        { user_id: post_id }
      )
    )[0];
  };

  public gelAllLikesDislikes = async () => {
    return await BaseDatabase.connection(LikesDislikesDataBase.TABLE_ACCOUNTS)
      .innerJoin(
        'users',
        `${LikesDislikesDataBase.TABLE_ACCOUNTS}.user_id`,
        'users.id'
      )
      .select(
        `${LikesDislikesDataBase.TABLE_ACCOUNTS}.*`,
        'users.name as userName'
      );
  };

  public foundLikeByPostId = async (post_id: string) => {
    return await BaseDatabase.connection(LikesDislikesDataBase.TABLE_ACCOUNTS)
      .where({ type: 1 })
      .where({ post_id: post_id });
  };

  public foundDiliskeByPostId = async (post_id: string) => {
    return await BaseDatabase.connection(LikesDislikesDataBase.TABLE_ACCOUNTS)
      .where({ type: 0 })
      .where({ post_id: post_id });
  };
}
