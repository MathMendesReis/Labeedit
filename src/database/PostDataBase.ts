import { Post, likesDislikes, PostDB, PostModel } from '../models/Post';
import { UserDB } from '../models/User';
import { BaseDatabase } from './sqlite/Database';

export class PostDataBase extends BaseDatabase {
	private static TABLE_ACCOUNT = 'posts';
	private static TABLE_ACCOUNT_LIKE = 'like_dislike';
	private static TABLE_ACCOUNT_USERS = 'users';

	public insertPost = async (data: PostDB): Promise<void> => {
		return await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT).insert(
			data
		);
	};
	public updatePost = async (data: PostDB): Promise<void> => {
		return await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT)
			.where({ id: data.id })
			.update({
				contents: data.contents,
				information_update: data.information_update,
				likes: data.likes,
				dislikes: data.dislikes,
			});
	};
	public postById = async (id: string): Promise<PostDB[]> => {
		return await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT).where({
			id,
		});
	};
	public userById = async (id: string): Promise<UserDB | undefined> => {
		return (
			await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT_USERS).where({
				id,
			})
		)[0];
	};
	public getAllPosts = async (): Promise<PostDB[]> => {
		return await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT);
	};
	public insertLike = async (data: likesDislikes): Promise<void> => {
		return await BaseDatabase.connection(
			PostDataBase.TABLE_ACCOUNT_LIKE
		).insert(data);
	};
	public updateLike = async (data: likesDislikes): Promise<void> => {
		return await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT_LIKE)
			.where({
				user_id: data.user_id,
				post_id: data.post_id,
			})
			.update(data);
	};
	public deleteLike = async (
		user_id: string,
		post_id: string,
		like: number
	): Promise<void> => {
		await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT_LIKE)
			.where({
				user_id,
				post_id,
				like,
			})
			.del();
	};
	public getLike = async (
		user_id: string,
		post_id: string
	): Promise<likesDislikes | undefined> => {
		return (
			await BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT_LIKE).where({
				user_id,
				post_id,
			})
		)[0];
	};
}
