import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";
import { TodoInput } from "../types/todo.types";
import { errorResponse, successResponse } from "../utils/response.utils";
import { Prisma } from "@prisma/client";

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  createTodo = async (
    tx: Prisma.TransactionClient,
    req: Request,
    res: Response
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const todoData: TodoInput = req.body;
      const userId = req.user.userId;

      const todo = await this.todoService.createTodo(tx, todoData, userId);

      return successResponse(res, todo, "Todo created successfully", 201);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  };

  getTodoById = async (
    tx: Prisma.TransactionClient,
    req: Request,
    res: Response
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const todoId = req.params.id;
      const userId = req.user.userId;

      const todo = await this.todoService.getTodoById(tx, todoId, userId);

      return successResponse(res, todo, "Todo retrieved successfully");
    } catch (error: any) {
      return errorResponse(res, error.message, 404);
    }
  };

  getAllTodos = async (
    tx: Prisma.TransactionClient,
    req: Request,
    res: Response
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = req.user.userId;
      const todos = await this.todoService.getAllTodos(tx, userId);

      return successResponse(res, todos, "Todos retrieved successfully");
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  };

  updateTodo = async (
    tx: Prisma.TransactionClient,
    req: Request,
    res: Response
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const todoId = req.params.id;
      const userId = req.user.userId;
      const todoData: Partial<TodoInput> = req.body;

      const todo = await this.todoService.updateTodo(
        tx,
        todoId,
        userId,
        todoData
      );

      return successResponse(res, todo, "Todo updated successfully");
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  };

  deleteTodo = async (
    tx: Prisma.TransactionClient,
    req: Request,
    res: Response
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const todoId = req.params.id;
      const userId = req.user.userId;

      await this.todoService.deleteTodo(tx, todoId, userId);

      return successResponse(res, null, "Todo deleted successfully", 204);
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  };
}
