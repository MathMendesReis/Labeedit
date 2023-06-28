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
exports.Like_dislike_database = void 0;
const Database_1 = require("./sqlite/Database");
class Like_dislike_database extends Database_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.findLikeByPostId = (post_id, user_id) => __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.BaseDatabase.connection(Like_dislike_database.TABLES_ACCOUNT)
                .where({ post_id })
                .andWhere({ user_id });
        });
        this.TotalFindLike = (post_id, like) => __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.BaseDatabase.connection(Like_dislike_database.TABLES_ACCOUNT)
                .where({ like: like })
                .andWhere({ post_id });
        });
        this.addLikeInCart = (data) => __awaiter(this, void 0, void 0, function* () {
            yield Database_1.BaseDatabase.connection(Like_dislike_database.TABLES_ACCOUNT).insert(data);
        });
        this.updateLike = (newLike) => __awaiter(this, void 0, void 0, function* () {
            yield Database_1.BaseDatabase.connection(Like_dislike_database.TABLES_ACCOUNT)
                .where({
                user_id: newLike.getUser_id(),
                post_id: newLike.getPost_id(),
            })
                .update({
                like: newLike.getLike(),
            });
        });
    }
}
exports.Like_dislike_database = Like_dislike_database;
Like_dislike_database.TABLES_ACCOUNT = 'like_dislike';
//# sourceMappingURL=Like_dislike_database.js.map