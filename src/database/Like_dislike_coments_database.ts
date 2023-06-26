import {
	LikeDislikeComents,
	likeDislikeComents,
} from '../models/LikeDislikeComents';
import { BaseDatabase } from './sqlite/Database';

export class Like_dislike_coments_database extends BaseDatabase {
	private static TABLES_ACCOUNTS = 'coments_like_dislike';
	// constructor() {}

	public getAllLikesComents = async (
		coments_id: string,
		like: number
	): Promise<likeDislikeComents[]> => {
		return await BaseDatabase.connection(
			Like_dislike_coments_database.TABLES_ACCOUNTS
		)
			.select(`${Like_dislike_coments_database.TABLES_ACCOUNTS}.like`)
			.where({ coments_id })
			.andWhere({ like });
	};

	public addNewLike = async (data: LikeDislikeComents): Promise<void> => {
		await BaseDatabase.connection(
			Like_dislike_coments_database.TABLES_ACCOUNTS
		).insert(data);
	};
	public findLikeByUserIdAndComentsID = async (
		user_id: string,
		coments_id: string
	) => {
		return await BaseDatabase.connection(
			Like_dislike_coments_database.TABLES_ACCOUNTS
		)
			.where({ user_id })
			.andWhere({ coments_id });
	};

	public updateLike = async (data: LikeDislikeComents) => {
		await BaseDatabase.connection(Like_dislike_coments_database.TABLES_ACCOUNTS)
			.where({ user_id: data.getUser_id() })
			.update({
				like: data.getLike(),
			});
	};
}
