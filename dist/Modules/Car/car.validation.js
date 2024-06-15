"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarSchema = exports.CarStatusSchema = void 0;
const zod_1 = require("zod");
exports.CarStatusSchema = zod_1.z.enum(["available", "unavailable"]);
exports.CarSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Name is required"),
    description: zod_1.z.string().nonempty("Description is required"),
    color: zod_1.z.string().nonempty("Color is required"),
    isElectric: zod_1.z.boolean(),
    status: exports.CarStatusSchema,
    features: zod_1.z.array(zod_1.z.string().nonempty("Feature cannot be empty")),
    pricePerHour: zod_1.z.number().positive("Price per hour must be a positive number"),
    isDeleted: zod_1.z.boolean(),
});
