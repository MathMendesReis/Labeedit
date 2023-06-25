export class Like_dislike {
	constructor(private user_id: string, private post_id: string) {}
	public getUser_id(): string {
		return this.user_id;
	}
	public getPost_id(): string {
		return this.post_id;
	}
}

export interface like_dislike {
	user_id: string;
	post_id: string;
}
