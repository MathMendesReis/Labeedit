import { BaseDatabase } from './BaseDataBase';

export class UserDataBase extends BaseDatabase {
private static TABLE_ACCOUNTS = 'users';

public getAllUsers =async () => {
  return await BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS);
};
}
