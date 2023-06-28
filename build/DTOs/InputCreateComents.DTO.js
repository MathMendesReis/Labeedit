"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputCreateComentsSchema = void 0;
const zod_1 = require("zod");
exports.InputCreateComentsSchema = zod_1.z
    .object({
    id: zod_1.z.string(),
    token: zod_1.z.string(),
    contents: zod_1.z.string(),
})
    .transform((data) => data);
//# sourceMappingURL=InputCreateComents.DTO.js.map