import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { UserBusiness } from '../business/UserBusiness';
import { UserDataBase } from '../database/UserDataBase';

export const userRouter = Router();

const userController = new UserController(
  new UserBusiness(
    new UserDataBase()
  )
);

userRouter.get('/', userController.getAllUsers);
