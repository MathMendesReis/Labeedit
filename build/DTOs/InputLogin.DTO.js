"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputLoginSchema = void 0;
const zod_1 = require("zod");
exports.inputLoginSchema = zod_1.z
    .object({
    email: zod_1.z.string().nonempty().min(1, 'Required Email'),
    password: zod_1.z.string().nonempty().min(1, 'Required password'),
})
    .transform((data) => data);
//# sourceMappingURL=InputLogin.DTO.js.map