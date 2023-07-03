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
import { CreatePost } from '../DTOs/inputCreatePost.DTO';
import { outoutGetAllPostsDTO } from '../DTOs/OutputGetAllPosts.DTO';

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
	public createNewPost = async ({
		authorization,
		contents,
	}: CreatePost): Promise<void> => {
		const payload = this.tokenManager.getPayload(authorization);
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

	public getAllPosts = async (
		authorization: string,
		id?: string
	): Promise<outoutGetAllPostsDTO[]> => {
		const payload = this.tokenManager.getPayload(authorization);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}
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
					total_coments: comentarios.length,
				};
			})
		);

		return result;
	};

	public findPostById = async (id: string): Promise<outoutGetAllPostsDTO[]> => {
		const postDB = await this.postBaseDataBase.getAllPosts(id);
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
					total_coments: comentarios.length,
					coments: await Promise.all(
						comentarios.map(async (coments) => {
							const totalLikesComents =
								await this.like_dislike_coments_database.getAllLikesComents(
									id,
									1
								);
							const totalDislikesComents =
								await this.like_dislike_coments_database.getAllLikesComents(
									id,
									0
								);
							return {
								...coments,
								likes: totalLikesComents.length,
								dislikes: totalDislikesComents.length,
							};
						})
					),
				};
			})
		);
		return result;
	};
}
