import { Posts, post } from '../models/Post';
import { BaseDatabase } from './BaseDataBase';

export class PostDataBase extends BaseDatabase {
private static TABLE_ACCOUNTS = 'post';

public createPost =async (input:Posts):Promise<void>=> {
     await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
     .insert({
      id:input.getId(),
      content:input.getContent(),
      update_at:input.getUpdatAt(),
      user_id:input.getUserId()
    });
    return ;
};
public updatePost =async (input:Posts):Promise<void>=> {
     await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
     .update({
      content:input.getContent()
    });
    return ;
};
public findPOstByID =async (id:string):Promise<post> => {
  return (await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
  .where({id}))[0];
};
public findPOstByUserId =async (user_id:string):Promise<post> => {
  return (await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
  .where({user_id}))[0];
};
public deletePostById =async (id:string):Promise<void> => {
      await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
      .where({id})
      .del();
};
public deletePostByUserId =async (user_id:string):Promise<void> => {
      await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
      .where({user_id})
      .del();
};


public getAllpost =async () => {
      return await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
      .innerJoin('users','post.user_id','users.id')
      .select(
        'post.id as post_id',
        'post.content',
        'users.name as username',
        'post.update_at',
        'post.created_at',
      );

};
public findPostByUserId =async (id:string) => {
      return await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
      .innerJoin('users','post.user_id','users.id')
      .select(
        'post.id as post_id',
        'post.content',
        'users.name as username',
        'post.update_at',
        'post.created_at',
      )
      .where('users.id',id);

};
}
