"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coments = void 0;
class Coments {
    constructor(id, user_id, post_id, contents) {
        this.id = id;
        this.user_id = user_id;
        this.post_id = post_id;
        this.contents = contents;
    }
    getId() {
        return this.id;
    }
    getUserId() {
        return this.user_id;
    }
    getPostId() {
        return this.user_id;
    }
    getContents() {
        return this.contents;
    }
}
exports.Coments = Coments;
//# sourceMappingURL=Coments.js.map