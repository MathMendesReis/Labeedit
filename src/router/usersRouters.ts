import { Router } from 'express';
import { UserController } from '../controller/UsersController';
import { UserBusinnes } from '../business/UserBusines';
import { UserDataBase } from '../database/UserDataBase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { HashManager } from '../services/HashManager';

export const userRouter = Router();

const userController = new UserController(
	new UserBusinnes(
		new UserDataBase(),
		new IdGenerator(),
		new TokenManager(),
		new HashManager()
	)
);

userRouter.get('/', userController.userLogin);
userRouter.post('/', userController.createAccount);
