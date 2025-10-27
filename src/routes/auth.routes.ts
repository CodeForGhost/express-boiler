import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { withTransaction } from "../utils/withTransaction.util";

const router = Router();
const authController = new AuthController();

router.post(
  "/register",
  validate(registerSchema),
  withTransaction(authController.register)
);
router.post(
  "/login",
  validate(loginSchema),
  withTransaction(authController.login)
);

export default router;
