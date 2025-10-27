import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { withTransaction } from "../utils/withTransaction.util";

const router = Router();
const userController = new UserController();

router.get("/profile", authenticate, withTransaction(userController.getProfile));
router.put("/profile", authenticate, withTransaction(userController.updateProfile));
router.delete("/profile", authenticate, withTransaction(userController.deleteProfile));

export default router;
