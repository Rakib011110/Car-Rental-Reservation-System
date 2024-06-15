"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarServices = exports.deleteCarInDB = exports.updateCarInDB = exports.getSingCarFromDB = exports.getAllCarsFromDB = exports.createCarInDB = void 0;
const car_model_1 = __importDefault(require("./car.model"));
const createCarInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.create(payload);
    return result;
});
exports.createCarInDB = createCarInDB;
const getAllCarsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.find({ isDeleted: false });
    return result;
});
exports.getAllCarsFromDB = getAllCarsFromDB;
const getSingCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.findById(id);
    return result;
});
exports.getSingCarFromDB = getSingCarFromDB;
const updateCarInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.updateCarInDB = updateCarInDB;
const deleteCarInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.deleteCarInDB = deleteCarInDB;
exports.CarServices = {
    createCarInDB: exports.createCarInDB,
    getAllCarsFromDB: exports.getAllCarsFromDB,
    getSingCarFromDB: exports.getSingCarFromDB,
    updateCarInDB: exports.updateCarInDB,
    deleteCarInDB: exports.deleteCarInDB,
};
