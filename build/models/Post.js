"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputLikeSchemma = exports.inputLikeDislikeSchemma = exports.inputGetAllPostSchemma = exports.inputFindPostByIdSchemma = exports.inputPostSchemma = exports.Post = void 0;
const zod_1 = require("zod");
class Post {
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
    addComents() {
        this.coments = this.coments + 1;
    }
    removeComents() {
        this.coments = this.coments - 1;
    }
    getContent() {
        return this.contents;
    }
    postModel() {
        return {
            id: this.id,
            user_id: this.userId,
            user_name: this.userName,
            contents: this.contents,
            creation_date: this.creation_date,
            information_update: this.information_update,
            likes: this.likes,
            dislikes: this.dislikes,
            coments: this.coments,
        };
    }
    constructor(id, userId, userName, contents, creation_date, information_update, likes, dislikes, coments) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.contents = contents;
        this.creation_date = creation_date;
        this.information_update = information_update;
        this.likes = likes;
        this.dislikes = dislikes;
        this.coments = coments;
    }
}
exports.Post = Post;
exports.inputPostSchemma = zod_1.z
    .object({
    authorization: zod_1.z.string(),
    contents: zod_1.z.string(),
})
    .transform((data) => data);
exports.inputFindPostByIdSchemma = zod_1.z
    .object({
    authorization: zod_1.z.string(),
    id: zod_1.z.string(),
})
    .transform((data) => data);
exports.inputGetAllPostSchemma = zod_1.z
    .object({
    authorization: zod_1.z.string(),
})
    .transform((data) => data);
exports.inputLikeDislikeSchemma = zod_1.z
    .object({
    user_id: zod_1.z.string(),
    post_id: zod_1.z.string(),
    like: zod_1.z.number(),
})
    .transform((data) => data);
exports.inputLikeSchemma = zod_1.z
    .object({
    authorization: zod_1.z.string(),
    id: zod_1.z.string(),
    like: zod_1.z.number(),
})
    .transform((data) => data);
//# sourceMappingURL=Post.js.map