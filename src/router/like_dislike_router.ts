import { Router } from 'express';
import { Like_dislikeController } from '../controller/Like_dislike';
import { Like_dislike_businnes } from '../business/Like_dislike_businnes';
import { TokenManager } from '../services/TokenManager';
import { Like_dislike_database } from '../database/Like_dislike_database';

export const like_dislike_router = Router();

const likeDislikeController = new Like_dislikeController(
	new Like_dislike_businnes(new TokenManager(), new Like_dislike_database())
);

like_dislike_router.post('/', likeDislikeController.likeDislike);
