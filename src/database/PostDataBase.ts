import { Posts, post } from '../models/Post';
import { BaseDatabase } from './BaseDataBase';

export class PostDataBase extends BaseDatabase {
  private static TABLE_ACCOUNTS = 'posts';

  public createPost = async (input: Posts): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS).insert({
      id: input.getId(),
      content: input.getContent(),
      update_at: input.getUpdatAt(),
      user_id: input.getUserId(),
    });
    return;
  };
  public updatePost = async (input: Posts): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
      .where({ user_id: input.getUserId() })
      .update({
        content: input.getContent(),
      });
    return;
  };
  public findPOstByID = async (id: string): Promise<post> => {
    return (
      await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS).where({ id })
    )[0];
  };
  public findPOstByUserId = async (user_id: string): Promise<post> => {
    return (
      await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS).where({
        user_id,
      })
    )[0];
  };
  public deletePostById = async (id: string): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
      .where({ id })
      .del();
  };
  public deletePostByUserId = async (user_id: string): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
      .where({ user_id })
      .del();
  };

  public getAllpost = async () => {
    return await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
      .innerJoin('users', 'posts.user_id', 'users.id')
      .select(
        'posts.id as post_id',
        'users.id as user_id',
        'posts.content as content',
        'posts.created_at as created_at_post',
        'posts.update_at as update_at_post',
        'users.apelido as nameUser'
      );
  };
  public findPostByUserId = async (id: string) => {
    return await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
      .innerJoin('users', 'posts.user_id', 'users.id')
      .select(
        'posts.id as post_id',
        'posts.content',
        'users.apelido as username',
        'post.update_at',
        'post.created_at'
      )
      .where('users.id', id);
  };
}
