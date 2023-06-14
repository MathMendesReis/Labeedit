import { Router } from 'express';
import { LikeDislikeController } from '../controller/LikeDislikeController';
import { LikeDislikesBusiness } from '../business/LikeDislikeBusiness';
import { LikesDislikesDataBase } from '../database/LikeDislikeDataBase';
import { IdGenerator } from '../services/IdGenerator';


export const likeDislikeRouter = Router();

const likeDislikeController = new LikeDislikeController(
  new LikeDislikesBusiness(
    new LikesDislikesDataBase(),
    new IdGenerator()
  )
);

likeDislikeRouter.get('/',likeDislikeController.LikeDislike);
