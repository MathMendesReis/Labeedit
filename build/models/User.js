"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCEPT_TERMS = exports.userControllerSchemmaLogin = exports.userControllerSchemma = exports.User = void 0;
const zod_1 = require("zod");
class User {
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getCREATION_DATE() {
        return this.creation_date;
    }
    getInformationUpdate() {
        return this.update_date;
    }
    getRole() {
        return this.role;
    }
    getAccept_terms() {
        return this.accept_terms;
    }
    constructor(id, name, email, password, creation_date, update_date, role, accept_terms) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.creation_date = creation_date;
        this.update_date = update_date;
        this.role = role;
        this.accept_terms = accept_terms;
    }
}
exports.User = User;
exports.userControllerSchemma = zod_1.z
    .object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    accept_terms: zod_1.z.string().nonempty(),
})
    .transform((data) => data);
exports.userControllerSchemmaLogin = zod_1.z
    .object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
})
    .transform((data) => data);
var ACCEPT_TERMS;
(function (ACCEPT_TERMS) {
    ACCEPT_TERMS["accept"] = "accepted";
})(ACCEPT_TERMS || (exports.ACCEPT_TERMS = ACCEPT_TERMS = {}));
//# sourceMappingURL=User.js.map