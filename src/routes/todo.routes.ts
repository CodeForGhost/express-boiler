import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { todoInputSchema, todoUpdateSchema } from "../schemas/todo.schema";

const router = Router();
const todoController = new TodoController();

router.post(
  "/",
  validate(todoInputSchema),
  authenticate,
  todoController.createTodo
);
router.get("/", authenticate, todoController.getAllTodos);
router.get("/:id", authenticate, todoController.getTodoById);
router.put(
  "/:id",
  validate(todoUpdateSchema),
  authenticate,
  todoController.updateTodo
);
router.delete("/:id", authenticate, todoController.deleteTodo);

export default router;
