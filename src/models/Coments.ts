export class Coments {
	constructor(
		private id: string,
		private user_id: string,
		private post_id: string,
		private contents: string
	) {}

	public getId(): string {
		return this.id;
	}
	public getUserId(): string {
		return this.user_id;
	}
	public getPostId(): string {
		return this.user_id;
	}
	public getContents(): string {
		return this.contents;
	}
}

export interface coments {
	id: string;
	user_id: string;
	post_id: string;
	contents: string;
}
