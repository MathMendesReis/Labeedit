"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeDislikeComents = void 0;
class LikeDislikeComents {
    constructor(user_id, coments_id, like) {
        this.user_id = user_id;
        this.coments_id = coments_id;
        this.like = like;
    }
    getUser_id() {
        return this.user_id;
    }
    getPost_id() {
        return this.coments_id;
    }
    getLike() {
        return this.like;
    }
}
exports.LikeDislikeComents = LikeDislikeComents;
//# sourceMappingURL=LikeDislikeComents.js.map