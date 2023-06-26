import { Like_dislike, like_dislike } from '../models/LikeDislike';
import { BaseDatabase } from './sqlite/Database';

export class Like_dislike_database extends BaseDatabase {
	private static TABLES_ACCOUNT = 'like_dislike';

	public findLikeByPostId = async (
		post_id: string,
		user_id: string
	): Promise<like_dislike[]> => {
		return await BaseDatabase.connection(Like_dislike_database.TABLES_ACCOUNT)
			.where({ post_id })
			.andWhere({ user_id });
	};
	public TotalFindLike = async (): Promise<like_dislike[]> => {
		return await BaseDatabase.connection(
			Like_dislike_database.TABLES_ACCOUNT
		).where({ like: 1 });
	};
	public addLikeInCart = async (data: Like_dislike): Promise<void> => {
		await BaseDatabase.connection(Like_dislike_database.TABLES_ACCOUNT).insert(
			data
		);
	};
	public updateLike = async (newLike: Like_dislike) => {
		await BaseDatabase.connection(Like_dislike_database.TABLES_ACCOUNT)
			.where({
				user_id: newLike.getUser_id(),
				post_id: newLike.getPost_id(),
			})
			.update({
				like: newLike.getLike(),
			});
	};
}
