"use strict";
// import { NextFunction, Request, Response } from 'express';
// import { AnyZodObject } from 'zod';
// import catchAsynce from '../utils/catchAsynce';
// const validateRequest = (schema: AnyZodObject) => {
//   return catchAsynce(
//     async (req: Request, res: Response, next: NextFunction) => {
//       await schema.parseAsync({
//         body: req.body,
//         cookies: req.cookies,
//       });
//       next();
//     },
//   );
// };
// export default validateRequest;