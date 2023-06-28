"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like_dislike = void 0;
class Like_dislike {
    constructor(user_id, post_id, like) {
        this.user_id = user_id;
        this.post_id = post_id;
        this.like = like;
    }
    getUser_id() {
        return this.user_id;
    }
    getPost_id() {
        return this.post_id;
    }
    getLike() {
        return this.like;
    }
}
exports.Like_dislike = Like_dislike;
//# sourceMappingURL=LikeDislike.js.map