import { ComentsDB, likesDislikesComents } from '../models/Coments';
import { Post, likesDislikes, PostDB } from '../models/Post';
import { UserDB } from '../models/User';
import { BaseDatabase } from './sqlite/Database';

export class ComentDataBase extends BaseDatabase {
	private static TABLE_ACCOUNT = 'comments';
	private static TABLE_ACCOUNT_LIKE = 'coments_like';
	private static TABLE_ACCOUNT_USERS = 'users';
	private static TABLE_ACCOUNT_POST = 'posts';

	public insertComent = async (data: ComentsDB): Promise<void> => {
		return await BaseDatabase.connection(ComentDataBase.TABLE_ACCOUNT).insert(
			data
		);
	};
	public updatePost = async (data: PostDB): Promise<void> => {
		return await BaseDatabase.connection(ComentDataBase.TABLE_ACCOUNT_POST)
			.where({ id: data.id })
			.update({
				coments: data.coments,
			});
	};
	public updateComents = async (data: ComentsDB): Promise<void> => {
		await BaseDatabase.connection(ComentDataBase.TABLE_ACCOUNT)
			.where({ id: data.id })
			.update({
				contents: data.contents,
				information_update: data.information_update,
				likes: data.likes,
				dislikes: data.dislikes,
			});
	};
	public comentById = async (id: string): Promise<ComentsDB | undefined> => {
		return (
			await BaseDatabase.connection(ComentDataBase.TABLE_ACCOUNT).where({
				id,
			})
		)[0];
	};
	public postById = async (id: string): Promise<PostDB | undefined> => {
		return (
			await BaseDatabase.connection(ComentDataBase.TABLE_ACCOUNT_POST).where({
				id,
			})
		)[0];
	};
	public userById = async (id: string): Promise<UserDB | undefined> => {
		return (
			await BaseDatabase.connection(ComentDataBase.TABLE_ACCOUNT_USERS).where({
				id,
			})
		)[0];
	};
	public getComentsByPostId = async (id: string): Promise<ComentsDB[]> => {
		return await BaseDatabase.connection(ComentDataBase.TABLE_ACCOUNT).where({
			post_id: id,
		});
	};
	public insertLike = async (data: likesDislikesComents): Promise<void> => {
		return await BaseDatabase.connection(
			ComentDataBase.TABLE_ACCOUNT_LIKE
		).insert(data);
	};
	public updateLike = async (data: likesDislikesComents): Promise<void> => {
		return await BaseDatabase.connection(ComentDataBase.TABLE_ACCOUNT_LIKE)
			.where({ user_id: data.user_id, post_id: data.post_id })
			.update(data);
	};
	public deleteLike = async (
		user_id: string,
		coments_id: string,
		like: number
	): Promise<void> => {
		await BaseDatabase.connection(ComentDataBase.TABLE_ACCOUNT_LIKE)
			.where({
				user_id,
				coments_id,
				like,
			})
			.del();
	};
	public getLike = async (
		user_id: string,
		coments_id: string
	): Promise<likesDislikes | undefined> => {
		return (
			await BaseDatabase.connection(ComentDataBase.TABLE_ACCOUNT_LIKE).where({
				user_id,
				coments_id,
			})
		)[0];
	};
}
