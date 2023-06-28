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
exports.ComentsDataBase = void 0;
const Database_1 = require("./sqlite/Database");
class ComentsDataBase extends Database_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.addComents = (data) => __awaiter(this, void 0, void 0, function* () {
            yield Database_1.BaseDatabase.connection(ComentsDataBase.TABLES_ACCOUNT).insert(data);
        });
        this.findComentsByPostId = (post_id) => __awaiter(this, void 0, void 0, function* () {
            return yield Database_1.BaseDatabase.connection(ComentsDataBase.TABLES_ACCOUNT)
                .select('comments.id', 'comments.contents', 'users.name as name_user')
                .leftJoin('users', 'comments.user_id', 'users.id')
                .where({
                post_id,
            });
        });
    }
}
exports.ComentsDataBase = ComentsDataBase;
ComentsDataBase.TABLES_ACCOUNT = 'comments';
//# sourceMappingURL=ComentsDataBase.js.map