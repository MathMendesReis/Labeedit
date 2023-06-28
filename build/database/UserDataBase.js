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
exports.UserDataBase = void 0;
const Database_1 = require("./sqlite/Database");
class UserDataBase extends Database_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.foundUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const result = (yield Database_1.BaseDatabase.connection(UserDataBase.TABLES_ACCOUNTS).where({
                email,
            }))[0];
            return result;
        });
        this.addNewUserInDB = (newUser) => __awaiter(this, void 0, void 0, function* () {
            yield Database_1.BaseDatabase.connection(UserDataBase.TABLES_ACCOUNTS).insert(newUser);
        });
        this.foundUserByID = (id) => __awaiter(this, void 0, void 0, function* () {
            return (yield Database_1.BaseDatabase.connection(UserDataBase.TABLES_ACCOUNTS).where({
                id,
            }))[0];
        });
    }
}
exports.UserDataBase = UserDataBase;
UserDataBase.TABLES_ACCOUNTS = 'users';
//# sourceMappingURL=UserDataBase.js.map