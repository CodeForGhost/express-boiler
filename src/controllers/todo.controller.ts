import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { TodoInput } from "../types/todo.types";
import { errorResponse, successResponse } from "../utils/response.utils";

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  createTodo = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const todoData: TodoInput = req.body;
      const userId = req.user.userId;

      const todo = await this.todoService.createTodo(todoData, userId);

      return successResponse(res, todo, "Todo created successfully", 201);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  };

  getTodoById = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const todoId = req.params.id;
      const userId = req.user.userId;

      const todo = await this.todoService.getTodoById(todoId, userId);

      return successResponse(res, todo, "Todo retrieved successfully");
    } catch (error: any) {
      return errorResponse(res, error.message, 404);
    }
  };

  getAllTodos = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = req.user.userId;
      const todos = await this.todoService.getAllTodos(userId);

      return successResponse(res, todos, "Todos retrieved successfully");
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  };

  updateTodo = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const todoId = req.params.id;
      const userId = req.user.userId;
      const todoData: Partial<TodoInput> = req.body;

      const todo = await this.todoService.updateTodo(todoId, userId, todoData);

      return successResponse(res, todo, "Todo updated successfully");
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  };

  deleteTodo = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const todoId = req.params.id;
      const userId = req.user.userId;

      await this.todoService.deleteTodo(todoId, userId);

      return successResponse(res, null, "Todo deleted successfully", 204);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  };
}
