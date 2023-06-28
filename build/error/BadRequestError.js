"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const BaseError_1 = require("./BaseError");
class BadRequestError extends BaseError_1.BaseError {
    constructor(message) {
        super(400, message);
        this.message = message;
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=BadRequestError.js.map