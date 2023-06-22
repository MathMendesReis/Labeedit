import { PostDataBase } from './../database/PostDataBase';
import { UserDataBase } from './../database/UserDataBase';
import { LikesDislikesDataBase } from '../database/LikeDislikeDataBase';
import { IdGenerator } from '../services/IdGenerator';
import { NotFoundError } from '../error/NotFoundError';
import { LikeDislike } from '../models/LikeDislike';
import { InputLikeDislike } from '../DTOs/inputCreateLIkeDislike.DTO';
import { BadRequestError } from '../error/BadRequestError';
import { TokenManager } from '../services/TokenManager';

export class LikeDislikesBusiness {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private likeDislikeDataBase: LikesDislikesDataBase,
    // eslint-disable-next-line no-unused-vars
    private idGenerator: IdGenerator,
    // eslint-disable-next-line no-unused-vars
    private UserDataBase: UserDataBase,
    // eslint-disable-next-line no-unused-vars
    private tokenManager: TokenManager,

    // eslint-disable-next-line no-unused-vars
    private postDataBase: PostDataBase
  ) {}

  public createLikeDislike = async ({
    token,
    post_id,
    type,
  }: InputLikeDislike) => {
    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError('token inválido');
    }

    const foundUserById = await this.UserDataBase.findUserById(payload.id);
    if (!foundUserById) {
      throw new NotFoundError('Usuario não encontrado.');
    }

    const foundPostById = await this.postDataBase.findPOstByID(post_id);
    if (!foundPostById) {
      throw new NotFoundError('Post não encontrado');
    }

    //verificando se o usuario ja curtiu ou discurtiu o post
    const foundLikeDiliskeById =
      await this.likeDislikeDataBase.foundLikeDiliskeByUserId(payload.id);
    //  if (foundLikeDiliskeById  && foundLikeDiliskeById.type === type) {
    //   throw new BadRequestError('O usuário já curtiu ou dislike o post.');
    //  }
    if (foundLikeDiliskeById && foundLikeDiliskeById.type !== type) {
      const updateDB = new LikeDislike(
        foundLikeDiliskeById.id,
        foundLikeDiliskeById.post_id,
        foundLikeDiliskeById.user_id,
        type
      );
      await this.likeDislikeDataBase.updateLikeDislike(updateDB);

      return { success: true, message: 'Atualizado com sucesso' };
    }

    const newLikeDislikeDB = new LikeDislike(
      this.idGenerator.generate(),
      post_id,
      payload.id,
      type
    );

    await this.likeDislikeDataBase.createLikeDislike(newLikeDislikeDB);

    return { success: true, message: 'Atualizado com sucesso' };
  };
}
