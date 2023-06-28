"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputLikeDislikeSchema = void 0;
const zod_1 = require("zod");
exports.inputLikeDislikeSchema = zod_1.z
    .object({
    token: zod_1.z.string().nonempty(),
    post_id: zod_1.z.string().nonempty(),
    like: zod_1.z.number(),
})
    .transform((data) => data);
//# sourceMappingURL=InputLike.DTO.js.map