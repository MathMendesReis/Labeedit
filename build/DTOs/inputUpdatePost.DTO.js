"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputUpdatePostSchema = void 0;
const zod_1 = require("zod");
exports.InputUpdatePostSchema = zod_1.z.object({
    token: zod_1.z.string().nonempty('O campo "token" é obrigatório.'),
    content: zod_1.z.string().optional(),
});
//# sourceMappingURL=inputUpdatePost.DTO.js.map