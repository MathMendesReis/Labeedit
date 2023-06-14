import { Router } from 'express';
import { IdGenerator } from '../services/IdGenerator';
import { PostController } from '../controller/PostController';
import { PostBusiness } from '../business/PostBusiness';
import { PostDataBase } from '../database/PostDataBase';
import { TokenManager } from '../services/TokenManager';
import { UserDataBase } from '../database/UserDataBase';

export const postRouter = Router();

const postController = new PostController(
  new PostBusiness(
    new PostDataBase(),
    new IdGenerator(),
    new TokenManager(),
    new UserDataBase()
  )
);

postRouter.get('/',postController.getAllpost);
postRouter.get('/:id',postController.findPostByUserId);
postRouter.post('/',postController.createPost);
postRouter.put('/',postController.updatePost );
postRouter.delete('/',postController.deletePost);
