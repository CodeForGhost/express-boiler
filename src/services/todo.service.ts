import { Prisma } from "@prisma/client";
import { TodoModel } from "../models/todo.model";
import { TodoInput, TodoOutput } from "../types/todo.types";

export class TodoService {
  private todoModel: TodoModel;

  constructor() {
    this.todoModel = new TodoModel();
  }

  async createTodo(
    tx: Prisma.TransactionClient,
    data: TodoInput,
    userId: string
  ): Promise<TodoOutput> {
    return this.todoModel.create(tx, data, userId);
  }

  async getTodoById(
    tx: Prisma.TransactionClient,
    id: string,
    userId: string
  ): Promise<TodoOutput> {
    const todo = await this.todoModel.findById(tx, id, userId);

    if (!todo) {
      throw new Error("Todo not found");
    }

    return todo;
  }

  async getAllTodos(
    tx: Prisma.TransactionClient,
    userId: string
  ): Promise<TodoOutput[]> {
    return this.todoModel.findAll(tx, userId);
  }

  async updateTodo(
    tx: Prisma.TransactionClient,
    id: string,
    userId: string,
    data: Partial<TodoInput>
  ): Promise<TodoOutput> {
    const todo = await this.todoModel.update(tx, id, userId, data);

    if (!todo) {
      throw new Error("Todo not found");
    }

    return todo;
  }

  async deleteTodo(
    tx: Prisma.TransactionClient,
    id: string,
    userId: string
  ): Promise<boolean> {
    const deleted = await this.todoModel.delete(tx, id, userId);

    if (!deleted) {
      throw new Error("Todo not found");
    }

    return true;
  }
}
