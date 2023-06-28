"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    get_information_update() {
        return this.information_update;
    }
    get_creation_date() {
        return this.creation_date;
    }
    get_contents() {
        return this.contents;
    }
    get_user_id() {
        return this.user_id;
    }
    get_id() {
        return this.id;
    }
    constructor(id, user_id, contents, creation_date, information_update) {
        this.id = id;
        this.user_id = user_id;
        this.contents = contents;
        this.creation_date = creation_date;
        this.information_update = information_update;
    }
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map