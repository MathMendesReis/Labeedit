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
const BaseDataBase_1 = require("./BaseDataBase");
class PostDataBase extends BaseDataBase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.createPost = (input) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS).insert({
                id: input.getId(),
                content: input.getContent(),
                update_at: input.getUpdatAt(),
                user_id: input.getUserId(),
            });
            return;
        });
        this.updatePost = (input) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
                .where({ user_id: input.getUserId() })
                .update({
                content: input.getContent(),
            });
            return;
        });
        this.findPOstByID = (id) => __awaiter(this, void 0, void 0, function* () {
            return (yield BaseDataBase_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS).where({ id }))[0];
        });
        this.findPOstByUserId = (user_id) => __awaiter(this, void 0, void 0, function* () {
            return (yield BaseDataBase_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS).where({
                user_id,
            }))[0];
        });
        this.deletePostById = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
                .where({ id })
                .del();
        });
        this.deletePostByUserId = (user_id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
                .where({ user_id })
                .del();
        });
        this.getAllpost = () => __awaiter(this, void 0, void 0, function* () {
            return yield BaseDataBase_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
                .innerJoin('users', 'posts.user_id', 'users.id')
                .select('posts.id as post_id', 'users.id as user_id', 'posts.content as content', 'posts.created_at as created_at_post', 'posts.update_at as update_at_post', 'users.apelido as nameUser');
        });
        this.findPostByUserId = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield BaseDataBase_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNTS)
                .innerJoin('users', 'posts.user_id', 'users.id')
                .select('posts.id as post_id', 'posts.content', 'users.apelido as username', 'post.update_at', 'post.created_at')
                .where('users.id', id);
        });
    }
}
exports.PostDataBase = PostDataBase;
PostDataBase.TABLE_ACCOUNTS = 'posts';
//# sourceMappingURL=PostDataBase.js.map