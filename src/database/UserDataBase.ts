import { Users } from '../models/User';
import { BaseDatabase } from './BaseDataBase';

export class UserDataBase extends BaseDatabase {
private static TABLE_ACCOUNTS = 'users';

public getAllUsersByEmail =async (email:string):Promise<Users[]> => {
  return await BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS)
  .where({email});
};
public getAllUsersByPassword =async (password:string):Promise<Users[]> => {
  return await BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS)
  .where({password});
};

public insertUserInDB =async (user:Users):Promise<void> => {

  await BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS).insert({
    id: user.getId(),
    name:user.getEmail(),
    email:user.getEmail(),
    role:user.getRole(),
    password:user.getPassword(),
    created_at:user.getCreated_at()
  });
};
}
