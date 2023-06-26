import { InputLikeDislikeComents } from '../DTOs/InputLikeComents.DTO';
import { Like_dislike_coments_database } from '../database/Like_dislike_coments_database';
import { BadRequestError } from '../error/BadRequestError';
import { LikeDislikeComents } from '../models/LikeDislikeComents';
import { TokenManager } from '../services/TokenManager';

export class LikeDislikeComentsBusinnes {
	constructor(
		private tokenManager: TokenManager,
		private likeDislikeComentsDataBse: Like_dislike_coments_database
	) {}
	public addNewLike = async (data: InputLikeDislikeComents) => {
		const payload = this.tokenManager.getPayload(data.token);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}

		const [verification] =
			await this.likeDislikeComentsDataBse.findLikeByUserIdAndComentsID(
				payload.id,
				data.coments_id
			);

		const newLike = new LikeDislikeComents(
			payload.id,
			data.coments_id,
			data.like
		);
		if (verification) {
			//atualizar
			return await this.likeDislikeComentsDataBse.updateLike(newLike);
		} else {
			//adicionar
			return await this.likeDislikeComentsDataBse.addNewLike(newLike);
		}
	};
}
