export class LikeDislikeComents {
	constructor(
		private user_id: string,
		private coments_id: string,
		private like: number
	) {}
	public getUser_id(): string {
		return this.user_id;
	}
	public getComents_id(): string {
		return this.coments_id;
	}
	public getLike(): number {
		return this.like;
	}
}

export interface likeDislikeComents {
	user_id: string;
	coments_id: string;
	like: number;
}
