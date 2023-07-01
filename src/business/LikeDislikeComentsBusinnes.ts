import { InputLikeDislikeComents } from '../DTOs/InputLikeComents.DTO';
import { OutOutAddComentInDb } from '../DTOs/OutputAddComentInDB.DTO';
import { Like_dislike_coments_database } from '../database/Like_dislike_coments_database';
import { BadRequestError } from '../error/BadRequestError';
import { NotFoundError } from '../error/NotFoundError';
import { LikeDislikeComents } from '../models/LikeDislikeComents';
import { TokenManager } from '../services/TokenManager';

export class LikeDislikeComentsBusinnes {
	constructor(
		private tokenManager: TokenManager,
		private likeDislikeComentsDataBse: Like_dislike_coments_database
	) {}
	public addNewLike = async (
		data: InputLikeDislikeComents
	): Promise<OutOutAddComentInDb | any> => {
		const payload = this.tokenManager.getPayload(data.authorization);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}

		const verification =
			await this.likeDislikeComentsDataBse.findLikeByUserIdAndComentsID(
				payload.id,
				data.coments_id
			);
		const newLike = new LikeDislikeComents(
			payload.id,
			data.coments_id,
			data.like
		);
		if (verification.length > 0) {
			await this.likeDislikeComentsDataBse.updateLike(newLike);
			return {
				message: 'update Post sucessuful',
			};
		} else {
			await this.likeDislikeComentsDataBse.addNewLike(newLike);
			return {
				message: 'Create Post sucessuful',
			};
		}
	};
}
