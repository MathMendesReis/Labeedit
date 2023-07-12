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
        this.findEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return (yield UserDataBase.connection(UserDataBase.TABLES_ACCOUNTS).where({
                email,
            }))[0];
        });
        this.findUserId = (id) => __awaiter(this, void 0, void 0, function* () {
            return (yield UserDataBase.connection(UserDataBase.TABLES_ACCOUNTS).where({
                id,
            }))[0];
        });
        this.getUserDB = (email) => __awaiter(this, void 0, void 0, function* () {
            return (yield UserDataBase.connection(UserDataBase.TABLES_ACCOUNTS).where({
                email,
            }))[0];
        });
        this.compareUser = (email, password) => __awaiter(this, void 0, void 0, function* () {
            return (yield UserDataBase.connection(UserDataBase.TABLES_ACCOUNTS).where({
                email,
                password,
            }))[0];
        });
        this.insertUser = (user) => __awaiter(this, void 0, void 0, function* () {
            yield UserDataBase.connection(UserDataBase.TABLES_ACCOUNTS).insert(user);
        });
    }
}
exports.UserDataBase = UserDataBase;
UserDataBase.TABLES_ACCOUNTS = 'users';
//# sourceMappingURL=UserDataBase.js.map