import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { todoInputSchema, todoUpdateSchema } from "../schemas/todo.schema";
import { withTransaction } from "../utils/withTransaction.util";

const router = Router();
const todoController = new TodoController();

router.post(
  "/",
  validate(todoInputSchema),
  authenticate,
  withTransaction(todoController.createTodo)
);
router.get("/", authenticate, withTransaction(todoController.getAllTodos));
router.get("/:id", authenticate, withTransaction(todoController.getTodoById));
router.put(
  "/:id",
  validate(todoUpdateSchema),
  authenticate,
  withTransaction(todoController.updateTodo)
);
router.delete("/:id", authenticate, withTransaction(todoController.deleteTodo));

export default router;
