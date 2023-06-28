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
exports.Like_dislike_coments_database = void 0;
const Database_1 = require("./sqlite/Database");
class Like_dislike_coments_database extends Database_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getAllLikesComents = (coments_id, like) => __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.BaseDatabase.connection(Like_dislike_coments_database.TABLES_ACCOUNTS)
                .select(`${Like_dislike_coments_database.TABLES_ACCOUNTS}.like`)
                .where({ coments_id })
                .andWhere({ like });
        });
        this.addNewLike = (data) => __awaiter(this, void 0, void 0, function* () {
            yield Database_1.BaseDatabase.connection(Like_dislike_coments_database.TABLES_ACCOUNTS).insert(data);
        });
        this.findLikeByUserIdAndComentsID = (user_id, coments_id) => __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.BaseDatabase.connection(Like_dislike_coments_database.TABLES_ACCOUNTS)
                .where({ user_id })
                .andWhere({ coments_id });
        });
        this.updateLike = (data) => __awaiter(this, void 0, void 0, function* () {
            yield Database_1.BaseDatabase.connection(Like_dislike_coments_database.TABLES_ACCOUNTS)
                .where({ user_id: data.getUser_id() })
                .update({
                like: data.getLike(),
            });
        });
    }
}
exports.Like_dislike_coments_database = Like_dislike_coments_database;
Like_dislike_coments_database.TABLES_ACCOUNTS = 'coments_like_dislike';
//# sourceMappingURL=Like_dislike_coments_database.js.map