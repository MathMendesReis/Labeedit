import { z } from 'zod';

export class Comment {
	constructor(
		private id: string,
		private userId: string,
		private postId: string,
		private userName: string,
		private contents: string,
		private creation_date: string,
		private information_update: string,
		private likes: number,
		private dislikes: number
	) {}
	public addDislike(): void {
		this.dislikes = this.dislikes + 1;
	}
	public addLike(): void {
		this.likes = this.likes + 1;
	}
	public removeDislike(): void {
		this.dislikes = this.dislikes - 1;
	}
	public removeLike(): void {
		this.likes = this.likes - 1;
	}
	public comentsModel(): ComentsDB {
		return {
			id: this.id,
			user_id: this.userId,
			post_Id: this.postId,
			user_name: this.userName,
			contents: this.contents,
			creation_date: this.creation_date,
			information_update: this.information_update,
			likes: this.likes,
			dislikes: this.dislikes,
		};
	}
}

export interface ComentsDB {
	id: string;
	user_id: string;
	post_Id: string;
	user_name: string;
	contents: string;
	creation_date: string;
	information_update: string;
	likes: number;
	dislikes: number;
}
export interface inputFindComentsById {
	authorization: string;
	contents: string;
	id: string;
}

export const inputNewComentSchemma = z
	.object({
		authorization: z.string(),
		contents: z.string(),
		id: z.string(),
	})
	.transform((data) => data as inputFindComentsById);

export interface inputLikeInComent {
	authorization: string;
	id: string;
	post_id: string;
	like: number;
}
export const inputNewLikeSchemma = z
	.object({
		authorization: z.string(),
		id: z.string(),
		post_id: z.string(),
		like: z.number(),
	})
	.transform((data) => data as inputLikeInComent);

export interface inputgetComentes {
	authorization: string;
	id: string;
}
export const inputGetComentsSchemma = z
	.object({
		authorization: z.string(),
		id: z.string(),
	})
	.transform((data) => data as inputgetComentes);

export interface likesDislikesComents {
	user_id: string;
	coments_id: string;
	post_id: string;
	like: number;
}
