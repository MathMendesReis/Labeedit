import { PostDataBase } from '../database/PostDataBase';
import { UserDataBase } from '../database/UserDataBase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { NotFoundError } from '../error/NotFoundError';
import { Post, likesDislikes, PostModel } from '../models/Post';
import { BadRequestError } from '../error/BadRequestError';
import { createPostOutputDTO } from '../Dtos/posts/createPostOutputDTO';

export class PostBusinnes {
	constructor(
		private tokenManager: TokenManager,
		private userDataBase: UserDataBase,
		private idGenerator: IdGenerator,
		private postBaseDataBase: PostDataBase
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
			isUser.name,
			contents,
			new Date().toISOString(),
			new Date().toISOString(),
			0,
			0,
			0
		);
		await this.postBaseDataBase.insertPost(newPost.postModel());

		const output: createPostOutputDTO = {
			content: newPost.getContent(),
		};

		return output;
	};

	public getAllPosts = async (authorization: string): Promise<PostModel[]> => {
		const payload = this.tokenManager.getPayload(authorization);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}
		const postsData = await this.postBaseDataBase.getAllPosts();
		const posts: PostModel[] = postsData.map((postData) => {
			return {
				id: postData.id,
				contents: postData.contents,
				creation_date: postData.creation_date,
				information_update: postData.information_update,
				likes: postData.likes,
				dislikes: postData.dislikes,
				coments: postData.coments,
				creator: {
					id: postData.user_id,
					name: postData.user_name,
				},
			};
		});
		return posts;
	};

	public findPostById = async (authorization: string, post_id: string) => {
		const payload = this.tokenManager.getPayload(authorization);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}
		const postsData = await this.postBaseDataBase.postById(post_id);
		if (postsData?.length === 0) {
			throw new NotFoundError('Not found post');
		}
		const posts: PostModel[] = postsData?.map((postData) => {
			return {
				id: postData.id,
				contents: postData.contents,
				creation_date: postData.creation_date,
				information_update: postData.information_update,
				likes: postData.likes,
				dislikes: postData.dislikes,
				coments: postData.coments,
				creator: {
					id: postData.user_id,
					name: postData.user_name,
				},
			};
		});

		return posts;
	};

	public addLikeDislike = async (
		authorization: string,
		post_id: string,
		like: number
	): Promise<boolean> => {
		const payload = this.tokenManager.getPayload(authorization);
		if (payload === null) {
			throw new BadRequestError('invalid token');
		}
		const userDB = await this.postBaseDataBase.userById(payload.id);
		if (!userDB) {
			throw new NotFoundError('Not found post');
		}
		const [postDB] = await this.postBaseDataBase.postById(post_id);
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
			userDB.name,
			postDB.contents,
			postDB.creation_date,
			postDB.information_update,
			postDB.likes,
			postDB.dislikes,
			postDB.coments
		);

		const isLike = await this.postBaseDataBase.getLike(payload.id, post_id);
		if (isLike) {
			if (isLike.like === like) {
				await this.postBaseDataBase.deleteLike(payload.id, post_id, like);
				like === 1 ? post.removeLike() : post.removeDislike();
			} else {
				await this.postBaseDataBase.updateLike(newLike);
				if (like === 1) {
					post.removeDislike();
					post.addLike();
				}
				if (like === 0) {
					post.removeLike();
					post.addDislike();
				}
			}
		} else {
			await this.postBaseDataBase.insertLike(newLike);
			like === 1 ? post.addLike() : post.addDislike();
		}

		await this.postBaseDataBase.updatePost(post.postModel());

		if (like === 1) {
			return true;
		} else {
			return false;
		}
	};
}
