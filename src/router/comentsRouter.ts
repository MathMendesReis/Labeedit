import { Router } from 'express';
import { ComentsController } from '../controller/ComentsController';
import { ComentsBusiness } from '../business/ComentsBusinnes';
import { TokenManager } from '../services/TokenManager';
import { ComentsDataBase } from '../database/ComentsDataBase';
import { IdGenerator } from '../services/IdGenerator';

export const comentsRouter = Router();

const comentsController = new ComentsController(
	new ComentsBusiness(
		new TokenManager(),
		new ComentsDataBase(),
		new IdGenerator()
	)
);

comentsRouter.post('/', comentsController.createNewComents);
