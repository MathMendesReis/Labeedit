import { Router } from 'express';
import { PostController } from '../controller/PostController';
import { PostBusinnes } from '../business/PostBusines';
import { TokenManager } from '../services/TokenManager';
import { UserDataBase } from '../database/UserDataBase';
import { IdGenerator } from '../services/IdGenerator';
import { PostDataBase } from '../database/PostDataBase';

export const postRouter = Router();

const postController = new PostController(
	new PostBusinnes(
		new TokenManager(),
		new UserDataBase(),
		new IdGenerator(),
		new PostDataBase()
	)
);

postRouter.post('/', postController.insertPost);
postRouter.get('/', postController.getAllPosts);
postRouter.get('/:id', postController.findPostById);
postRouter.post('/:id', postController.addLikeDislike);
