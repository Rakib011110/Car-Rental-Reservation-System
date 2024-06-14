import { Router } from "express";
import {
  createCar,
  deleteCar,
  getAllCars,
  getCar,
  updateCar,
} from "./car.controller";

const router = Router();

router.post("/", createCar);
router.get("/", getAllCars);
router.get("/:id", getCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export const CarRoutes = router;
