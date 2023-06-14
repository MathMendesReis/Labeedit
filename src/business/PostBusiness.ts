import { IdGenerator } from '../services/IdGenerator';
    // eslint-disable-next-line no-unused-vars
import { TokenManager } from '../services/TokenManager';
import { PostDataBase } from '../database/PostDataBase';
import { Posts } from '../models/Post';
import { NotFoundError } from '../error/NotFoundError';
import { InputUpsert } from '../DTOs/inputCreatePost.DTO';
import { InputDelete } from '../DTOs/inputDelete.DTO';
import { UserDataBase } from '../database/UserDataBase';
import { InputUpdatePost } from '../DTOs/inputUpdatePost.DTO';


export class PostBusiness {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private postDataBase :  PostDataBase,
     // eslint-disable-next-line no-unused-vars
    private idGenerator: IdGenerator,
    // eslint-disable-next-line no-unused-vars
    private tokenManager: TokenManager,
    // eslint-disable-next-line no-unused-vars
    private userDataBase:UserDataBase

  ) {}


public createPost =async ({content,user_id}:InputUpsert) => {

  const foundUserById = await this.userDataBase.findUserById(user_id);
  if(!foundUserById) throw new NotFoundError('usuario não cadastrado');


  const newPostDB = new Posts(
    this.idGenerator.generate(),
    content,
    new Date().toISOString(),
    user_id
    );

  return await this.postDataBase.createPost(newPostDB);

};

public updatePost =async (input:InputUpdatePost):Promise<void> => {
  const foundPostById = await this.postDataBase.findPOstByID(input.post_id);
  if(!foundPostById) throw new NotFoundError('post não cadastrado');

  const updatePostInDB = new Posts(
    foundPostById.id,
    input.content || foundPostById.content,
    Date.now().toString(),
    foundPostById.user_id
  );

   await this.postDataBase.updatePost(updatePostInDB);

   return;
};

public deletePost =async (id:InputDelete) => {
    const postDB = await this.postDataBase.findPOstByID(id.id);
    if(!postDB) throw new NotFoundError('ID não encontrado');
    await this.postDataBase.deletePostById(id.id);
};
public getAllpost =async () => {
   return await this.postDataBase.getAllpost();
};
public findPostByUserId =async (id:string) => {
   return await this.postDataBase.findPostByUserId(id);
};

}
