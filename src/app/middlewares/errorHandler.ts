import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
};

export default globalErrorHandler;
