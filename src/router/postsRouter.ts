import { Router } from 'express';
import { PostController } from '../controller/PostController';
import { PostBusinnes } from '../business/PostBusines';
import { TokenManager } from '../services/TokenManager';
import { UserDataBase } from '../database/UserDataBase';
import { IdGenerator } from '../services/IdGenerator';
import { PostDataBase } from '../database/PostDataBase';
import { Like_dislike_database } from '../database/Like_dislike_database';
import { ComentsDataBase } from '../database/ComentsDataBase';
import { Like_dislike_coments_database } from '../database/Like_dislike_coments_database';

export const postRouter = Router();

const postController = new PostController(
	new PostBusinnes(
		new TokenManager(),
		new UserDataBase(),
		new IdGenerator(),
		new PostDataBase(),
		new Like_dislike_database(),
		new ComentsDataBase(),
		new Like_dislike_coments_database()
	)
);

postRouter.post('/', postController.createPost);
postRouter.get('/:id', postController.findPostById);
postRouter.get('/', postController.getAllPost);
