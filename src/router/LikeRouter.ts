import { Router } from 'express';
import { LikeDislikeController } from '../controller/LikeDislikeController';
import { LikeDislikesBusiness } from '../business/LikeDislikeBusiness';
import { LikesDislikesDataBase } from '../database/LikeDislikeDataBase';
import { IdGenerator } from '../services/IdGenerator';
import { UserDataBase } from '../database/UserDataBase';
import { PostDataBase } from '../database/PostDataBase';
import { TokenManager } from '../services/TokenManager';

export const likeDislikeRouter = Router();

const likeDislikeController = new LikeDislikeController(
  new LikeDislikesBusiness(
    new LikesDislikesDataBase(),
    new IdGenerator(),
    new UserDataBase(),
    new TokenManager(),
    new PostDataBase()
  )
);

likeDislikeRouter.post('/', likeDislikeController.createLikeDislike);
