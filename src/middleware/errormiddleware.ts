import { Request, Response, NextFunction } from "express";
import { Error } from "../interface/errorinterface";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "oops , something went wrong";
  res.status(status).json({ status: message });
};

export default errorMiddleware;
