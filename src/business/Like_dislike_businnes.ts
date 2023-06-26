import { InputLikeDislike } from '../DTOs/InputLike.DTO';
import { Like_dislike_database } from '../database/Like_dislike_database';
import { BadRequestError } from '../error/BadRequestError';
import { Like_dislike } from '../models/LikeDislike';
import { TokenManager } from '../services/TokenManager';

export class Like_dislike_businnes {
	constructor(
		private tokenManager: TokenManager,
		private likeDislikeDataBase: Like_dislike_database // private postBusiness: PostBusinnes
	) {}
	addNewLike = async (data: InputLikeDislike) => {
		const payload = this.tokenManager.getPayload(data.token);
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

		return 'sucesso';
	};
}
