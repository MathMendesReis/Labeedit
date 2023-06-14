import { Posts } from '../models/Post';
import { BaseDatabase } from './BaseDataBase';

export class PostDataBase extends BaseDatabase {
private static TABLE_ACCOUNTS = 'posts';

public upsertPost =async (input:Posts):Promise<void> => {
      await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
      .upsert({
        id:input.getId(),
        content:input.getContent(),
        user_id:input.getUserId()
      });
};
public findPOstByID =async (id:string) => {
  return await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
  .where({id});
};
public findPOstByEMAIL =async (email:string) => {
  return await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
  .where({email});
};
public deletePost =async (id:string):Promise<void> => {
      await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
      .where({id})
      .del();
};

}
