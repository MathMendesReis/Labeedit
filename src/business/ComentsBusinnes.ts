import { UserDataBase } from '../database/UserDataBase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { NotFoundError } from '../error/NotFoundError';
import { BadRequestError } from '../error/BadRequestError';
import { createPostOutputDTO } from '../Dtos/posts/createPostOutputDTO';
import { ComentDataBase } from '../database/ComentsDataBase';
import {
	ComentsDB,
	ComentsModel,
	Comment,
	likesDislikesComents,
} from '../models/Coments';
import { Post } from '../models/Post';

export class ComentsBusiness {
	constructor(
		private tokenManager: TokenManager,
		private userDataBase: UserDataBase,
		private idGenerator: IdGenerator,
		private comentDataBase: ComentDataBase
	) {}

	public insertComents = async (
		authorization: string,
		contents: string,
		post_Id: string
	) => {
		const payload = this.tokenManager.getPayload(authorization);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}
		const userDB = await this.userDataBase.findUserId(payload.id);
		if (!userDB) {
			throw new NotFoundError('Not Found User');
		}
		const postDB = await this.comentDataBase.postById(post_Id);
		if (!postDB) {
			throw new NotFoundError('Not Found post');
		}

		const post = new Post(
			postDB.id,
			postDB.user_id,
			userDB.name,
			postDB.contents,
			postDB.creation_date,
			postDB.information_update,
			postDB.likes,
			postDB.dislikes,
			postDB.coments
		);
		const id = this.idGenerator.generate();

		const newComent = new Comment(
			id,
			payload.id,
			postDB.id,
			userDB.name,
			contents,
			new Date().toISOString(),
			new Date().toISOString(),
			0,
			0
		);
		post.addComents();
		await this.comentDataBase.updatePost(post.postModel());
		await this.comentDataBase.insertComent(newComent.comentsModel());

		const output: createPostOutputDTO = {
			content: postDB.contents,
		};

		return output;
	};

	public getComentsByPostId = async (
		authorization: string,
		id: string
	): Promise<ComentsModel[]> => {
		const payload = this.tokenManager.getPayload(authorization);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}
		const userDB = await this.userDataBase.findUserId(payload.id);
		if (!userDB) {
			throw new NotFoundError('Not Found User');
		}

		const comentsData = await this.comentDataBase.getComentsByPostId(id);

		const coments: ComentsModel[] = comentsData?.map((comentData) => {
			return {
				id: comentData.id,
				contents: comentData.contents,
				creation_date: comentData.creation_date,
				information_update: comentData.creation_date,
				likes: comentData.likes,
				dislikes: comentData.dislikes,
				coments: comentData.contents,
				post: {
					id: comentData.post_Id,
				},
				creator: {
					id: comentData.user_id,
					name: userDB.name,
				},
			};
		});

		return coments;
	};
	public addLikeDislike = async (
		authorization: string,
		coments_id: string,
		post_id: string,
		like: number
	): Promise<boolean> => {
		const payload = this.tokenManager.getPayload(authorization);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}
		const userDB = await this.comentDataBase.userById(payload.id);
		if (!userDB) {
			throw new NotFoundError('Not found users');
		}
		const comentsDB = await this.comentDataBase.comentById(coments_id);
		if (!comentsDB) {
			throw new NotFoundError('Not found coments');
		}
		const postDB = await this.comentDataBase.postById(post_id);
		if (!postDB) {
			throw new NotFoundError('Not found post');
		}

		const newLike: likesDislikesComents = {
			user_id: payload.id,
			coments_id,
			post_id,
			like,
		};

		const coment = new Comment(
			comentsDB.id,
			comentsDB.user_id,
			comentsDB.id,
			userDB.name,
			comentsDB.contents,
			comentsDB.creation_date,
			comentsDB.information_update,
			comentsDB.likes,
			comentsDB.dislikes
		);

		const isLike = await this.comentDataBase.getLike(payload.id, coments_id);
		if (isLike) {
			if (isLike.like === like) {
				await this.comentDataBase.deleteLike(payload.id, coments_id, like);
				like === 1 ? coment.removeLike() : coment.removeDislike();
			} else {
				await this.comentDataBase.updateLike(newLike);
				if (like === 1) {
					coment.removeDislike();
					coment.addLike();
				}
				if (like === 0) {
					coment.removeLike();
					coment.addDislike();
				}
			}
		} else {
			await this.comentDataBase.insertLike(newLike);
			like === 1 ? coment.addLike() : coment.addDislike();
		}

		await this.comentDataBase.updateComents(coment.comentsModel());

		if (like === 1) {
			return true;
		} else {
			return false;
		}
	};
}
