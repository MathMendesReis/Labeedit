"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountSchemma = void 0;
const zod_1 = require("zod");
exports.CreateAccountSchemma = zod_1.z
    .object({
    name: zod_1.z.string().nonempty(),
    email: zod_1.z.string().email().nonempty(),
    password: zod_1.z.string().nonempty(),
    accept_terms: zod_1.z.string(),
})
    .transform((data) => data);
//# sourceMappingURL=InputCreateAccount.DTO.js.map