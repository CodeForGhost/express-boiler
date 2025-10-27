// utils/withTransaction.ts

import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prismaConfig";

export function withTransaction(
  handler: (
    tx: Prisma.TransactionClient,
    req: Request,
    res: Response
  ) => Promise<any>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.$transaction(async (tx) => {
        return await handler(tx, req, res);
      });
    } catch (error) {
      next(error); // Delegates to Express error middleware
    }
  };
}
