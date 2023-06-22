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
exports.LikesDislikesDataBase = void 0;
const BaseDataBase_1 = require("./BaseDataBase");
class LikesDislikesDataBase extends BaseDataBase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.createLikeDislike = (like) => __awaiter(this, void 0, void 0, function* () {
            return yield BaseDataBase_1.BaseDatabase.connection(LikesDislikesDataBase.TABLE_ACCOUNTS).insert({
                id: like.getId(),
                post_id: like.getPostId(),
                type: like.getType(),
                user_id: like.getUserId(),
            });
        });
        this.updateLikeDislike = (like) => __awaiter(this, void 0, void 0, function* () {
            return yield BaseDataBase_1.BaseDatabase.connection(LikesDislikesDataBase.TABLE_ACCOUNTS)
                .where({ id: like.getId() })
                .update({
                type: like.getType(),
            });
        });
        this.foundLikeDiliskeByUserId = (user_id) => __awaiter(this, void 0, void 0, function* () {
            return (yield BaseDataBase_1.BaseDatabase.connection(LikesDislikesDataBase.TABLE_ACCOUNTS).where({ user_id: user_id }))[0];
        });
        this.foundLikeDiliskeByPostId = (post_id) => __awaiter(this, void 0, void 0, function* () {
            return (yield BaseDataBase_1.BaseDatabase.connection(LikesDislikesDataBase.TABLE_ACCOUNTS).where({ user_id: post_id }))[0];
        });
        this.gelAllLikesDislikes = () => __awaiter(this, void 0, void 0, function* () {
            return yield BaseDataBase_1.BaseDatabase.connection(LikesDislikesDataBase.TABLE_ACCOUNTS)
                .innerJoin('users', `${LikesDislikesDataBase.TABLE_ACCOUNTS}.user_id`, 'users.id')
                .select(`${LikesDislikesDataBase.TABLE_ACCOUNTS}.*`, 'users.name as userName');
        });
        this.foundLikeByPostId = (post_id) => __awaiter(this, void 0, void 0, function* () {
            return yield BaseDataBase_1.BaseDatabase.connection(LikesDislikesDataBase.TABLE_ACCOUNTS)
                .where({ type: 1 })
                .where({ post_id: post_id });
        });
        this.foundDiliskeByPostId = (post_id) => __awaiter(this, void 0, void 0, function* () {
            return yield BaseDataBase_1.BaseDatabase.connection(LikesDislikesDataBase.TABLE_ACCOUNTS)
                .where({ type: 0 })
                .where({ post_id: post_id });
        });
    }
}
exports.LikesDislikesDataBase = LikesDislikesDataBase;
LikesDislikesDataBase.TABLE_ACCOUNTS = 'likesDislikes';
//# sourceMappingURL=LikeDislikeDataBase.js.map