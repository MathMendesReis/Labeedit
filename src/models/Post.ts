import { z } from 'zod';

export class Post {
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
	public addComents(): void {
		this.coments = this.coments + 1;
	}
	public removeComents(): void {
		this.coments = this.coments - 1;
	}
	public getContent(): string {
		return this.contents;
	}

	public postModel(): PostDB {
		return {
			id: this.id,
			user_id: this.userId,
			user_name: this.userName,
			contents: this.contents,
			creation_date: this.creation_date,
			information_update: this.information_update,
			likes: this.likes,
			dislikes: this.dislikes,
			coments: this.coments,
		};
	}

	constructor(
		private id: string,
		private userId: string,
		private userName: string,
		private contents: string,
		private creation_date: string,
		private information_update: string,
		private likes: number,
		private dislikes: number,
		private coments: number
	) {}
}
export interface PostDB {
	id: string;
	user_id: string;
	user_name: string;
	contents: string;
	creation_date: string;
	information_update: string;
	likes: number;
	dislikes: number;
	coments: number;
}
export interface PostModel {
	id: string;
	contents: string;
	creation_date: string;
	information_update: string;
	likes: number;
	dislikes: number;
	coments: number;
	creator: {
		id: string;
		name: string;
	};
}
export interface inputPost {
	authorization: string;
	contents: string;
}
export interface inputGetAllPosts {
	authorization: string;
}
export interface inputFindPostById {
	authorization: string;
	id: string;
}

export const inputPostSchemma = z
	.object({
		authorization: z.string(),
		contents: z.string(),
	})
	.transform((data) => data as inputPost);

export const inputFindPostByIdSchemma = z
	.object({
		authorization: z.string(),
		id: z.string(),
	})
	.transform((data) => data as inputFindPostById);

export const inputGetAllPostSchemma = z
	.object({
		authorization: z.string(),
	})
	.transform((data) => data as inputGetAllPosts);

export interface likesDislikes {
	user_id: string;
	post_id: string;
	like: number;
}

export const inputLikeDislikeSchemma = z
	.object({
		user_id: z.string(),
		post_id: z.string(),
		like: z.number(),
	})
	.transform((data) => data as likesDislikes);

export interface inputLike {
	authorization: string;
	id: string;
	like: number;
}

export const inputLikeSchemma = z
	.object({
		authorization: z.string(),
		id: z.string(),
		like: z.number(),
	})
	.transform((data) => data as inputLike);
