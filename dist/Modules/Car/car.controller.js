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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = exports.deleteCar = exports.updateCar = exports.getCar = exports.getAllCars = exports.createCar = void 0;
const car_service_1 = require("./car.service");
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carData = req.body;
        const newCar = yield (0, car_service_1.createCarInDB)(carData);
        res.status(201).json(newCar);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createCar = createCar;
const getAllCars = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield car_service_1.CarServices.getAllCarsFromDB();
        res.status(200).json(cars);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllCars = getAllCars;
const getCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.id;
        const car = yield car_service_1.CarServices.getSingCarFromDB(carId);
        if (car) {
            res.status(200).json(car);
        }
        else {
            res.status(404).json({ message: "Car not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getCar = getCar;
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.id;
        const carData = req.body;
        const updatedCar = yield car_service_1.CarServices.updateCarInDB(carId, carData);
        if (updatedCar) {
            res.status(200).json(updatedCar);
        }
        else {
            res.status(404).json({ message: "Car not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateCar = updateCar;
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.id;
        const deletedCar = yield car_service_1.CarServices.deleteCarInDB(carId);
        if (deletedCar) {
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Car Deleted successfully",
                deletedCar,
            });
        }
        else {
            res.status(404).json({ message: "Car not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteCar = deleteCar;
exports.CarController = {
    createCar: exports.createCar,
    getAllCars: exports.getAllCars,
    updateCar: exports.updateCar,
    deleteCar: exports.deleteCar,
};
