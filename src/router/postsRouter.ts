import { Router } from 'express';
import { PostController } from '../controller/PostController';
import { PostBusinnes } from '../business/PostBusinnes';
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

postRouter.post('/createpost', postController.createPost);
postRouter.delete('/', postController.deletePost);
postRouter.get('/', postController.getAllPost);
postRouter.put('/', postController.updatePost);
