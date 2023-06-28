"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostSchemma = void 0;
const zod_1 = require("zod");
exports.createPostSchemma = zod_1.z
    .object({
    token: zod_1.z.string().nonempty(),
    contents: zod_1.z.string().nonempty(),
})
    .transform((data) => data);
//# sourceMappingURL=inputCreatePost.DTO.js.map