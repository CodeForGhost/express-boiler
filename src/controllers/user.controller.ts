import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { errorResponse, successResponse } from "../utils/response.utils";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getProfile = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = req.user.userId;
      const user = await this.userService.getUserById(userId);

      return successResponse(res, user, "User retrieved successfully");
    } catch (error: any) {
      return errorResponse(res, error.message, 404);
    }
  };

  updateProfile = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = req.user.userId;
      const userData = req.body;
      const user = await this.userService.updateUser(userId, userData);

      return successResponse(res, user, "User updated successfully");
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  };

  deleteProfile = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = req.user.userId;
      await this.userService.deleteUser(userId);

      return successResponse(res, null, "User deleted successfully", 204);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  };
}
