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
import { LikesDislikesDataBase } from '../database/LikeDislikeDataBase';
import { formatResults } from '../DTOs/FormatResultsGetAllPosts.DTO';
import { BadRequestError } from '../error/BadRequestError';

export class PostBusiness {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private postDataBase: PostDataBase,
    // eslint-disable-next-line no-unused-vars
    private idGenerator: IdGenerator,
    // eslint-disable-next-line no-unused-vars
    private tokenManager: TokenManager,
    // eslint-disable-next-line no-unused-vars
    private userDataBase: UserDataBase,
    // eslint-disable-next-line no-unused-vars
    private likeDislikeDataBase: LikesDislikesDataBase
  ) {}

  public createPost = async ({ content, token }: InputUpsert) => {
    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError('token inválido');
    }

    const foundUserById = await this.userDataBase.findUserById(payload.id);
    if (!foundUserById) throw new NotFoundError('usuario não cadastrado');

    const newPostDB = new Posts(
      this.idGenerator.generate(),
      content,
      new Date().toISOString(),
      payload.id
    );

    return await this.postDataBase.createPost(newPostDB);
  };

  public updatePost = async (input: InputUpdatePost): Promise<void> => {
    const payload = this.tokenManager.getPayload(input.token);

    if (payload === null) {
      throw new BadRequestError('token inválido');
    }

    const foundPostById = await this.postDataBase.findPOstByID(payload.id);
    if (!foundPostById) throw new NotFoundError('post não cadastrado');

    const updatePostInDB = new Posts(
      foundPostById.id,
      input.content || foundPostById.content,
      Date.now().toString(),
      foundPostById.user_id
    );

    await this.postDataBase.updatePost(updatePostInDB);

    return;
  };

  public deletePost = async (id: InputDelete) => {
    const postDB = await this.postDataBase.findPOstByID(id.id);
    if (!postDB) throw new NotFoundError('ID não encontrado');
    await this.postDataBase.deletePostById(id.id);
  };

  public getAllpost = async ():Promise<formatResults[] | string | Error> => {
    const foundAllPost = await this.postDataBase.getAllpost();
    if (foundAllPost.length < 1)
      return'Nenhum post encontrado';

    const formartResultPromises: Promise<formatResults>[] = foundAllPost.map(
      async (post) => {
        const like = await this.likeDislikeDataBase.foundLikeByPostId(
          post.post_id
        );
        const dislike = await this.likeDislikeDataBase.foundDiliskeByPostId(
          post.post_id
        );
        return {
          ...post,
          likes: like.length,
          dislikes: dislike.length,
          totalComments: 0,
        };
      }
    );

    const formartResult = await Promise.all(formartResultPromises);

    return formartResult;
  };
  public findPostByUserId = async (id: string) => {
    return await this.postDataBase.findPostByUserId(id);
  };
}
