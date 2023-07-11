import { Like_dislike_database } from '../database/Like_dislike_database';
import { PostDataBase } from '../database/PostDataBase';
import { UserDataBase } from '../database/UserDataBase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { Like_dislike_coments_database } from '../database/Like_dislike_coments_database';
import { NotFoundError } from '../error/NotFoundError';
import { Post, likesDislikes, PostDB } from '../models/Post';
import { BadRequestError } from '../error/BadRequestError';
import { createPostOutputDTO } from '../Dtos/posts/createPostOutputDTO';

export class PostBusinnes {
	constructor(
		private tokenManager: TokenManager,
		private userDataBase: UserDataBase,
		private idGenerator: IdGenerator,
		private postBaseDataBase: PostDataBase,
		private LikeDislikeDataBase: Like_dislike_database,
		private like_dislike_coments_database: Like_dislike_coments_database
	) {}

	public insertPost = async (authorization: string, contents: string) => {
		const payload = this.tokenManager.getPayload(authorization);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}
		const isUser = await this.userDataBase.findUserId(payload.id);
		if (!isUser) {
			throw new NotFoundError('Not Found User');
		}
		const id = this.idGenerator.generate();

		const newPost = new Post(
			id,
			payload.id,
			contents,
			new Date().toISOString(),
			new Date().toISOString(),
			0,
			0
		);
		await this.postBaseDataBase.insertPost(newPost.postModel());

		const output: createPostOutputDTO = {
			message: 'create post sucessulfuly',
		};

		return output;
	};

	public getAllPosts = async (authorization: string): Promise<PostDB[]> => {
		const payload = this.tokenManager.getPayload(authorization);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}
		return await this.postBaseDataBase.getAllPosts();
	};

	public findPostById = async (authorization: string, post_id: string) => {
		const payload = this.tokenManager.getPayload(authorization);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}
		const result = await this.postBaseDataBase.postById(post_id);
		if (!result) {
			throw new NotFoundError('Not found post');
		}
		return result;
	};

	public addLikeDislike = async (
		authorization: string,
		post_id: string,
		like: number
	) => {
		const payload = this.tokenManager.getPayload(authorization);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}
		const postDB = await this.postBaseDataBase.postById(post_id);
		if (!postDB) {
			throw new NotFoundError('Not found post');
		}

		const newLike: likesDislikes = {
			user_id: payload.id,
			post_id,
			like,
		};

		const post = new Post(
			postDB.id,
			postDB.user_id,
			postDB.contents,
			postDB.creation_date,
			postDB.information_update,
			postDB.likes,
			postDB.dislikes
		);
		const isLike = await this.postBaseDataBase.getLike(payload.id, post_id);
		if (isLike) {
			if (isLike.like === like) {
				if (like === 0 && (postDB.likes > 0 || postDB.dislikes > 0)) {
					post.removeDislike();
				}
				if (like === 1 && (postDB.likes > 0 || postDB.dislikes > 0)) {
					post.removeLike();
				}
				await this.postBaseDataBase.deleteLike(payload.id, post_id, like);
			} else {
				await this.postBaseDataBase.updateLike(newLike);
				if (like === 0 && (postDB.likes > 0 || postDB.dislikes > 0)) {
					post.removeDislike();
					post.addLike();
				}
				if (like === 1 && (postDB.likes > 0 || postDB.dislikes > 0)) {
					post.removeLike();
					post.addDislike();
				}
			}
		} else {
			if (like === 0 && (postDB.likes > 0 || postDB.dislikes > 0)) {
				post.addDislike();
			}
			if (like === 1 && (postDB.likes > 0 || postDB.dislikes > 0)) {
				post.addLike();
			}
			await this.postBaseDataBase.insertLike(newLike);
		}

		await this.postBaseDataBase.updatePost(post.postModel());

		return {
			post: post.postModel(),
		};
	};
}
