import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginInput } from "../types/auth.types";
import { UserInput } from "../types/user.types";
import { errorResponse, successResponse } from "../utils/response.utils";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response) => {
    try {
      const userData: UserInput = req.body;
      const result = await this.authService.register(userData);
      return successResponse(res, result, "User registered successfully", 201);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const credentials: LoginInput = req.body;
      const result = await this.authService.login(credentials);

      return successResponse(res, result, "User logged in successfully");
    } catch (error: any) {
      return errorResponse(res, error.message, 401);
    }
  };
}
