import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  constructor(
    private userBaseDataBase = new UserBusiness()
  ) {}

  public getAllUsers =async (req:Request, res:Response) => {
    try {
      const users = await this.userBaseDataBase.getAllUsers();
      res.status(200).send(users)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
