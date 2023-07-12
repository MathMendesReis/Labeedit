"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDataBase = void 0;
const Database_1 = require("./sqlite/Database");
class PostDataBase extends Database_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insertPost = (data) => __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT).insert(data);
        });
        this.updatePost = (data) => __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT)
                .where({ id: data.id })
                .update({
                contents: data.contents,
                information_update: data.information_update,
                likes: data.likes,
                dislikes: data.dislikes,
            });
        });
        this.postById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT).where({
                id,
            });
        });
        this.userById = (id) => __awaiter(this, void 0, void 0, function* () {
            return (yield Database_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT_USERS).where({
                id,
            }))[0];
        });
        this.getAllPosts = () => __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT);
        });
        this.insertLike = (data) => __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT_LIKE).insert(data);
        });
        this.updateLike = (data) => __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT_LIKE)
                .where({
                user_id: data.user_id,
                post_id: data.post_id,
            })
                .update(data);
        });
        this.deleteLike = (user_id, post_id, like) => __awaiter(this, void 0, void 0, function* () {
            yield Database_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT_LIKE)
                .where({
                user_id,
                post_id,
                like,
            })
                .del();
        });
        this.getLike = (user_id, post_id) => __awaiter(this, void 0, void 0, function* () {
            return (yield Database_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT_LIKE).where({
                user_id,
                post_id,
            }))[0];
        });
    }
}
exports.PostDataBase = PostDataBase;
PostDataBase.TABLE_ACCOUNT = 'posts';
PostDataBase.TABLE_ACCOUNT_LIKE = 'like_dislike';
PostDataBase.TABLE_ACCOUNT_USERS = 'users';
//# sourceMappingURL=PostDataBase.js.map