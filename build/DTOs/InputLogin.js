"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSchema = void 0;
const zod_1 = require("zod");
exports.InputSchema = zod_1.z
    .object({
    email: zod_1.z.string().email().nonempty(),
    password: zod_1.z.string(),
})
    .refine((value) => value.email && value.password, {
    message: 'Email and password are required.',
});
//# sourceMappingURL=InputLogin.js.map