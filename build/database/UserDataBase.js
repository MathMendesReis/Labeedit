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
const BaseDataBase_1 = require("./BaseDataBase");
class UserDataBase extends BaseDataBase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.findUsersByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return (yield BaseDataBase_1.BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS).where({
                email,
            }))[0];
        });
        this.findUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            return (yield BaseDataBase_1.BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS).where({ id }))[0];
        });
        this.insertUserInDB = (user) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS).insert({
                id: user.getId(),
                apelido: user.getApelido(),
                email: user.getEmail(),
                role: user.getRole(),
                password: user.getPassword(),
                checkbox: user.getCheckbox(),
                created_at: user.getCreated_at(),
            });
        });
        this.updateUser = (user) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDataBase_1.BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS)
                .where({ id: user.getId() })
                .update({
                apelido: user.getApelido(),
                email: user.getEmail(),
            });
            return;
        });
        this.deleteUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield BaseDataBase_1.BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS)
                .where({ id })
                .del();
        });
        this.deleteUserByUserId = (user_id) => __awaiter(this, void 0, void 0, function* () {
            return yield BaseDataBase_1.BaseDatabase.connection(UserDataBase.TABLE_ACCOUNTS)
                .where({ user_id })
                .del();
        });
    }
}
exports.UserDataBase = UserDataBase;
UserDataBase.TABLE_ACCOUNTS = 'users';
//# sourceMappingURL=UserDataBase.js.map