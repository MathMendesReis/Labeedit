"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputDeleteByIdSchema = void 0;
const zod_1 = require("zod");
exports.InputDeleteByIdSchema = zod_1.z
    .object({
    id: zod_1.z.string().nonempty(),
})
    .refine((value) => value.id, {
    message: 'id are required.',
});
//# sourceMappingURL=inputDelete.DTO.js.map