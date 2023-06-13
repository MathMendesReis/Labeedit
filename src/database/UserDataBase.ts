import { Users } from '../models/User';
import { BaseDatabase } from './BaseDataBase';

export class UserDataBase extends BaseDatabase {
private static TABLE_ACCOUNTS = 'users';

public getAllUsersByEmail =async ():Promise<Users[]> => {
  return await BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS);
};
}
