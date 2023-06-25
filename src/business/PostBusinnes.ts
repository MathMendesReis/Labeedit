import { PostDataBase } from '../database/PostDataBase';
import { UserDataBase } from '../database/UserDataBase';
import { BadRequestError } from '../error/BadRequestError';
import { NotFoundError } from '../error/NotFoundError';
import { Post } from '../models/Post';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';

export class PostBusinnes {
	constructor(
		private tokenManager: TokenManager,
		private userDataBase: UserDataBase,
		private idGenerator: IdGenerator,
		private postBaseDataBase: PostDataBase
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
		return await this.postBaseDataBase.getAllPosts();
	};
}
