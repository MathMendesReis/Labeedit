import { Router } from 'express';
import { LikeDislikeComentsController } from '../controller/LikeDislikeComentsController';
import { LikeDislikeComentsBusinnes } from '../business/LikeDislikeComentsBusinnes';
import { TokenManager } from '../services/TokenManager';
import { Like_dislike_coments_database } from '../database/Like_dislike_coments_database';

export const like_dislike_coments_router = Router();

const likeDislikeComentsController = new LikeDislikeComentsController(
	new LikeDislikeComentsBusinnes(
		new TokenManager(),
		new Like_dislike_coments_database()
	)
);

like_dislike_coments_router.post('/', likeDislikeComentsController.likeDislike);
