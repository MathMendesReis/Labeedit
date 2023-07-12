"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputGetComentsSchemma = exports.inputNewLikeSchemma = exports.inputNewComentSchemma = exports.Comment = void 0;
const zod_1 = require("zod");
class Comment {
    constructor(id, userId, postId, userName, contents, creation_date, information_update, likes, dislikes) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.userName = userName;
        this.contents = contents;
        this.creation_date = creation_date;
        this.information_update = information_update;
        this.likes = likes;
        this.dislikes = dislikes;
    }
    addDislike() {
        this.dislikes = this.dislikes + 1;
    }
    addLike() {
        this.likes = this.likes + 1;
    }
    removeDislike() {
        this.dislikes = this.dislikes - 1;
    }
    removeLike() {
        this.likes = this.likes - 1;
    }
    comentsModel() {
        return {
            id: this.id,
            user_id: this.userId,
            post_Id: this.postId,
            user_name: this.userName,
            contents: this.contents,
            creation_date: this.creation_date,
            information_update: this.information_update,
            likes: this.likes,
            dislikes: this.dislikes,
        };
    }
}
exports.Comment = Comment;
exports.inputNewComentSchemma = zod_1.z
    .object({
    authorization: zod_1.z.string(),
    contents: zod_1.z.string(),
    id: zod_1.z.string(),
})
    .transform((data) => data);
exports.inputNewLikeSchemma = zod_1.z
    .object({
    authorization: zod_1.z.string(),
    id: zod_1.z.string(),
    post_id: zod_1.z.string(),
    like: zod_1.z.number(),
})
    .transform((data) => data);
exports.inputGetComentsSchemma = zod_1.z
    .object({
    authorization: zod_1.z.string(),
    id: zod_1.z.string(),
})
    .transform((data) => data);
//# sourceMappingURL=Coments.js.map