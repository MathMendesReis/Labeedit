import { UserDataBase } from '../database/UserDataBase';

export class UserBusiness {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private userBaseDataBase = new UserDataBase()
  ) {}

  public login =async () => {
    return await this.userBaseDataBase.getAllUsersByEmail();
  };
}
