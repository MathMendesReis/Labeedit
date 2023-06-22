"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.Role = void 0;
var Role;
(function (Role) {
    Role["USER"] = "user";
    Role["ADMIN"] = "admin";
})(Role = exports.Role || (exports.Role = {}));
class Users {
    constructor(id, apelido, email, role, password, checkbox, created_at) {
        this.id = id;
        this.apelido = apelido;
        this.email = email;
        this.role = role;
        this.password = password;
        this.checkbox = checkbox;
        this.created_at = created_at;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.apelido;
    }
    getCheckbox() {
        return this.checkbox;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return this.role;
    }
    getPassword() {
        return this.password;
    }
    getApelido() {
        return this.apelido;
    }
    getCreated_at() {
        return this.created_at;
    }
}
exports.Users = Users;
//# sourceMappingURL=User.js.map