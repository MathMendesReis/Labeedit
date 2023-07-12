import { Router } from 'express';
import { TokenManager } from '../services/TokenManager';
import { UserDataBase } from '../database/UserDataBase';
import { IdGenerator } from '../services/IdGenerator';
import { ComentsController } from '../controller/ComentsController';
import { ComentsBusiness } from '../business/ComentsBusinnes';
import { ComentDataBase } from '../database/ComentsDataBase';

export const comentsRouter = Router();

const comentsController = new ComentsController(
	new ComentsBusiness(
		new TokenManager(),
		new UserDataBase(),
		new IdGenerator(),
		new ComentDataBase()
	)
);

comentsRouter.post('/:id', comentsController.insertComents);
comentsRouter.post('/likes/:id', comentsController.insertLike);
comentsRouter.get('/:id', comentsController.getComentsByPostId);
