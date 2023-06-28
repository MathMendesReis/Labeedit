"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputLikeDislikeComentsSchema = void 0;
const zod_1 = require("zod");
exports.inputLikeDislikeComentsSchema = zod_1.z
    .object({
    token: zod_1.z.string().nonempty(),
    coments_id: zod_1.z.string().nonempty(),
    like: zod_1.z.number(),
})
    .transform((data) => data);
//# sourceMappingURL=InputLikeComents.DTO.js.map