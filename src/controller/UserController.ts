import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';

export class UserController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private userBaseDataBase = new UserBusiness()
  ) {}

  public login =async (req:Request, res:Response) => {
    try {
      const result = await this.userBaseDataBase.login();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}
