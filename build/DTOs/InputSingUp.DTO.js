"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSingUpSchema = void 0;
const zod_1 = require("zod");
exports.InputSingUpSchema = zod_1.z
    .object({
    apelido: zod_1.z.string().nonempty(),
    checkbox: zod_1.z.string(),
    email: zod_1.z.string().email().nonempty(),
    password: zod_1.z.string(),
})
    .refine((value) => value.email && value.password, {
    message: 'Email and password are required.',
});
//# sourceMappingURL=InputSingUp.DTO.js.map