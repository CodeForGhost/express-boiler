import { Prisma } from "@prisma/client";
import { TodoInput, TodoOutput } from "../types/todo.types";

export class TodoModel {
  async create(
    tx: Prisma.TransactionClient,
    data: TodoInput,
    userId: string
  ): Promise<TodoOutput> {
    const todo = await tx.todo.create({
      data: {
        ...data,
        user: {
          connect: { id: userId },
        },
      },
    });

    return todo;
  }

  async findById(
    tx: Prisma.TransactionClient,
    id: string,
    userId: string
  ): Promise<TodoOutput | null> {
    const todo = await tx.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    return todo;
  }

  async findAll(
    tx: Prisma.TransactionClient,
    userId: string
  ): Promise<TodoOutput[]> {
    const todos = await tx.todo.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return todos;
  }

  async update(
    tx: Prisma.TransactionClient,
    id: string,
    userId: string,
    data: Partial<TodoInput>
  ): Promise<TodoOutput | null> {
    const todo = await tx.todo.updateMany({
      where: {
        id,
        userId,
      },
      data,
    });

    if (todo.count === 0) {
      return null;
    }

    return this.findById(id, userId);
  }

  async delete(
    tx: Prisma.TransactionClient,
    id: string,
    userId: string
  ): Promise<boolean> {
    const todo = await tx.todo.deleteMany({
      where: {
        id,
        userId,
      },
    });

    return todo.count > 0;
  }
}
