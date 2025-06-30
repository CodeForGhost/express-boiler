import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.utils";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(`[${req.method}] ${req.url} - ${err.message}`, {
    stack: err.stack,
    body: req.body,
    query: req.query
  });

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
}
