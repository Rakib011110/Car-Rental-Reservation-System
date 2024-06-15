"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = require("../Modules/Users/user.router");
const car_router_1 = require("../Modules/Car/car.router");
const booking_router_1 = require("../Modules/Bookings/booking.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: user_router_1.UserRoutes,
    },
    {
        path: "/cars",
        route: car_router_1.CarRoutes,
    },
    {
        path: "/bookings",
        route: booking_router_1.BookingRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
router.use("/users", user_router_1.UserRoutes);
exports.default = router;
