import { Router } from 'express';
import { UserController } from '../controller/UsersController';
import { UserDataBase } from '../database/UserDataBase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { HashManager } from '../services/HashManager';
import { UserBusines } from '../business/UserBusines';

export const userRouter = Router();

const userController = new UserController(
	new UserBusines(
		new UserDataBase(),
		new IdGenerator(),
		new TokenManager(),
		new HashManager()
	)
);

userRouter.post('/singup', userController.createdUser);
userRouter.post('/login', userController.login);
