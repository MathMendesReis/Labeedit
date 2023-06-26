import { promise } from 'zod';
import { Like_dislike_database } from '../database/Like_dislike_database';
import { PostDataBase } from '../database/PostDataBase';
import { UserDataBase } from '../database/UserDataBase';
import { BadRequestError } from '../error/BadRequestError';
import { NotFoundError } from '../error/NotFoundError';
import { Post } from '../models/Post';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { ComentsDataBase } from '../database/ComentsDataBase';
import { Like_dislike_coments_database } from '../database/Like_dislike_coments_database';

export class PostBusinnes {
	constructor(
		private tokenManager: TokenManager,
		private userDataBase: UserDataBase,
		private idGenerator: IdGenerator,
		private postBaseDataBase: PostDataBase,
		private LikeDislikeDataBase: Like_dislike_database,
		private comentsDataBase: ComentsDataBase,
		private like_dislike_coments_database: Like_dislike_coments_database
	) {}
	public createNewPost = async (
		token: string,
		contents: string
	): Promise<void> => {
		const payload = this.tokenManager.getPayload(token);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}
		const userDB = await this.userDataBase.foundUserByID(payload.id);
		if (!userDB) {
			throw new NotFoundError('user not found');
		}

		const newPost = new Post(
			this.idGenerator.generate(),
			payload.id,
			contents,
			new Date().toString(),
			new Date().toString()
		);
		await this.postBaseDataBase.addPostInDB(newPost);
	};

	public getAllPosts = async () => {
		const postDB = await this.postBaseDataBase.getAllPosts();
		const result = await Promise.all(
			postDB.map(async (post) => {
				const totalLikes = await this.LikeDislikeDataBase.TotalFindLike(
					post.id,
					1
				);
				const totalDislikes = await this.LikeDislikeDataBase.TotalFindLike(
					post.id,
					0
				);
				const comentarios = await this.comentsDataBase.findComentsByPostId(
					post.id
				);
				return {
					...post,
					likes: totalLikes.length,
					dislikes: totalDislikes.length,
					coments: await Promise.all(
						comentarios.map(async (coments) => {
							const totalLikesComents =
								await this.like_dislike_coments_database.getAllLikesComents(
									coments.id,
									1
								);
							const id = coments.id;
							const content = coments.contents;
							return {
								id,
								content,
								likes: totalLikesComents.length,
							};
						})
					),
				};
			})
		);

		return result;
	};
}
