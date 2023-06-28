"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, email, password, creation_date, information_update, role, accept_terms) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.creation_date = creation_date;
        this.information_update = information_update;
        this.role = role;
        this.accept_terms = accept_terms;
    }
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
        return this.information_update;
    }
    getRole() {
        return this.role;
    }
    getAccept_terms() {
        return this.accept_terms;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map