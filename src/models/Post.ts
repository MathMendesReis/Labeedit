export class Post {
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

	constructor(
		private id: string,
		private user_id: string,
		private contents: string,
		private creation_date: string,
		private information_update: string
	) {}
}
export interface post {
	id: string;
	user_id: string;
	contents: string;
	creation_date: string;
	information_update: string;
}
