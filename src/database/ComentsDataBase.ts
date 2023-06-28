import { Coments } from '../models/Coments';
import { BaseDatabase } from './sqlite/Database';

export class ComentsDataBase extends BaseDatabase {
	private static TABLES_ACCOUNT = 'comments';

	public addComents = async (data: Coments) => {
		await BaseDatabase.connection(ComentsDataBase.TABLES_ACCOUNT).insert(data);
	};
	public findComentsByPostId = async (post_id: string) => {
		return await BaseDatabase.connection(ComentsDataBase.TABLES_ACCOUNT)
			.select('comments.id', 'comments.contents', 'users.name as name_user')
			.leftJoin('users', 'comments.user_id', 'users.id')
			.where({
				post_id,
			});
	};
}
