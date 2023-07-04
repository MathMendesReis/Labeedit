import { InputLikeDislike } from '../DTOs/InputLike.DTO';
import { OutOutAddComentInDb } from '../DTOs/OutputAddComentInDB.DTO';
import { Like_dislike_database } from '../database/Like_dislike_database';
import { BadRequestError } from '../error/BadRequestError';
import { Like_dislike } from '../models/LikeDislike';
import { TokenManager } from '../services/TokenManager';

export class Like_dislike_businnes {
	constructor(
		private tokenManager: TokenManager,
		private likeDislikeDataBase: Like_dislike_database
	) {}
	/**
	 * Cria uma novo post.
	 * @param authorization Token do usuario.
	 * @throws BadRequestError Se o token for invalido.
	 * @returns caso o usuario já tenha dado o like ou o dislike,
	 * o valor e atualizado na tabela, caso contrario, é inserido um novo registro.
	 * @observação 0 = dislike/ 1 = like
	 */
	addNewLike = async (data: InputLikeDislike): Promise<OutOutAddComentInDb> => {
		const payload = this.tokenManager.getPayload(data.authorization);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}
		const [likeDB] = await this.likeDislikeDataBase.findLikeByPostId(
			data.post_id,
			payload.id
		);
		const newLikeDB = new Like_dislike(payload.id, data.post_id, data.like);
		if (likeDB) {
			await this.likeDislikeDataBase.updateLike(newLikeDB);
		} else {
			await this.likeDislikeDataBase.addLikeInCart(newLikeDB);
		}

		return {
			message: 'Create Post sucessuful',
		};
	};
}
