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
        this.addPostInDB = (data) => __awaiter(this, void 0, void 0, function* () {
            yield Database_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT).insert(data);
        });
        this.getAllPosts = () => __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT)
                .select(`${PostDataBase.TABLE_ACCOUNT}.id`, `${PostDataBase.TABLE_ACCOUNT}.contents`, `${PostDataBase.TABLE_ACCOUNT_USERS}.name as name_user`)
                .leftJoin(PostDataBase.TABLE_ACCOUNT_USERS, `${PostDataBase.TABLE_ACCOUNT}.user_id`, `${PostDataBase.TABLE_ACCOUNT_USERS}.id`);
        });
        this.findPostById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.BaseDatabase.connection(PostDataBase.TABLE_ACCOUNT)
                .where({ 'posts.id': id })
                .select(`${PostDataBase.TABLE_ACCOUNT}.id`, `${PostDataBase.TABLE_ACCOUNT}.contents`, `${PostDataBase.TABLE_ACCOUNT_USERS}.name as name_user`)
                .leftJoin(PostDataBase.TABLE_ACCOUNT_USERS, `${PostDataBase.TABLE_ACCOUNT}.user_id`, `${PostDataBase.TABLE_ACCOUNT_USERS}.id`);
        });
    }
}
exports.PostDataBase = PostDataBase;
PostDataBase.TABLE_ACCOUNT = 'posts';
PostDataBase.TABLE_ACCOUNT_USERS = 'users';
PostDataBase.TABLE_ACCOUNT_LIKE_DISLIKE = 'like_dislike';
//# sourceMappingURL=PostDataBase.js.map