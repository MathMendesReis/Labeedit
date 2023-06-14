import { InputDelete } from '../DTOs/inputDelete.DTO';
import { Users, users } from '../models/User';
import { BaseDatabase } from './BaseDataBase';

export class UserDataBase extends BaseDatabase {
private static TABLE_ACCOUNTS = 'users';

public findUsersByEmail =async (email:string):Promise<users> => {
  return (await BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS)
    .where({ email }))[0];
};
public findUserById = async (id: string | InputDelete): Promise<users> => {
  return (await BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS)
    .where({ id }))[0];
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

public updateUser =async (user:Users):Promise<void> => {
   await BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS)
   .where({id:user.getId()})
   .update({
    name:user.getName(),
    email:user.getEmail(),
   });
   return;
};

public deleteUserById =async (id:string):Promise<void> => {
  return await BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS)
  .where({id})
  .del();
};

public deleteUserByUserId =async (user_id:string):Promise<void> => {
  return await BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS)
  .where({user_id})
  .del();
};
}
