import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginInput } from "../types/auth.types";
import { UserInput } from "../types/user.types";
import { errorResponse, successResponse } from "../utils/response.utils";
import { Prisma } from "@prisma/client";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (
    tx: Prisma.TransactionClient,
    req: Request,
    res: Response
  ) => {
    try {
      const userData: UserInput = req.body;
      const result = await this.authService.register(tx, userData);
      return successResponse(res, result, "User registered successfully", 201);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  };

  login = async (tx: Prisma.TransactionClient, req: Request, res: Response) => {
    try {
      const credentials: LoginInput = req.body;
      const result = await this.authService.login(tx, credentials);

      return successResponse(res, result, "User logged in successfully");
    } catch (error: any) {
      return errorResponse(res, error.message, 401);
    }
  };
}
