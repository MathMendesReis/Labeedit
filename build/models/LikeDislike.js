"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeDislike = void 0;
class LikeDislike {
    constructor(id, post_id, user_id, type) {
        this.id = id;
        this.post_id = post_id;
        this.user_id = user_id;
        this.type = type;
    }
    getId() {
        return this.id;
    }
    getPostId() {
        return this.post_id;
    }
    getUserId() {
        return this.user_id;
    }
    getType() {
        return this.type;
    }
    setType(newTipy) {
        this.type = newTipy;
    }
}
exports.LikeDislike = LikeDislike;
//# sourceMappingURL=LikeDislike.js.map