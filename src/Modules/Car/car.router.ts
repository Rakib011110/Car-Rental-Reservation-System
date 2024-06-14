import { Router } from "express";
import {
  createCar,
  deleteCar,
  getAllCars,
  getCar,
  updateCar,
} from "./car.controller";
import { isAdmin, isAuthenticated } from "../../app/auth/auth";

const router = Router();

router.post("/", isAdmin, createCar);
router.get("/", getAllCars);
router.get("/:id", getCar);
router.put("/:id", isAdmin, updateCar);
router.delete("/:id", isAdmin, deleteCar);

export const CarRoutes = router;
