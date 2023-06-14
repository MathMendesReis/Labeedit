import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { UserBusiness } from '../business/UserBusiness';
import { UserDataBase } from '../database/UserDataBase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { HashManager } from '../services/HashManager';

export const userRouter = Router();

const userController = new UserController(
  new UserBusiness(
    new UserDataBase(),
    new IdGenerator(),
    new TokenManager(),
    new HashManager(),
  )
);

userRouter.get('/', userController.login);
userRouter.post('/', userController.singUp);
userRouter.put('/', userController.updateUser);
userRouter.delete('/', userController.deleteUserById);
