"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundHandler = (req, res, next) => {
    res.status(404).send({ message: "Not Found" });
};
exports.default = notFoundHandler;
