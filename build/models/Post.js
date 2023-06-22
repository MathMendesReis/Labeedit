"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
class Posts {
    constructor(id, content, update_at, user_id) {
        this.id = id;
        this.content = content;
        this.update_at = update_at;
        this.user_id = user_id;
    }
    getId() {
        return this.id;
    }
    getContent() {
        return this.content;
    }
    getUserId() {
        return this.user_id;
    }
    getUpdatAt() {
        return this.update_at;
    }
}
exports.Posts = Posts;
//# sourceMappingURL=Post.js.map