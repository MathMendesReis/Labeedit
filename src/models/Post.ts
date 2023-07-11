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
	public get_dislikes(): number {
		return this.dislikes;
	}
	public get_likes(): number {
		return this.likes;
	}
	public get_information_update(): string {
		return this.information_update;
	}

	public get_creation_date(): string {
		return this.creation_date;
	}

	public get_contents(): string {
		return this.contents;
	}

	public get_user_id(): string {
		return this.user_id;
	}
	public get_id(): string {
		return this.id;
	}
	public postModel(): PostDB {
		return {
			id: this.id,
			user_id: this.user_id,
			contents: this.contents,
			creation_date: this.creation_date,
			information_update: this.information_update,
			likes: this.likes,
			dislikes: this.dislikes,
		};
	}

	constructor(
		private id: string,
		private user_id: string,
		private contents: string,
		private creation_date: string,
		private information_update: string,
		private likes: number,
		private dislikes: number
	) {}
}
export interface PostDB {
	id: string;
	user_id: string;
	contents: string;
	creation_date: string;
	information_update: string;
	likes: number;
	dislikes: number;
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
