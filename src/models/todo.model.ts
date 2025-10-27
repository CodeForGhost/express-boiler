import prisma from "../lib/prismaConfig";
import { TodoInput, TodoOutput } from "../types/todo.types";

export class TodoModel {
  async create(data: TodoInput, userId: string): Promise<TodoOutput> {
    const todo = await prisma.todo.create({
      data: {
        ...data,
        user: {
          connect: { id: userId },
        },
      },
    });

    return todo;
  }

  async findById(id: string, userId: string): Promise<TodoOutput | null> {
    const todo = await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    return todo;
  }

  async findAll(userId: string): Promise<TodoOutput[]> {
    const todos = await prisma.todo.findMany({
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
    id: string,
    userId: string,
    data: Partial<TodoInput>
  ): Promise<TodoOutput | null> {
    const todo = await prisma.todo.updateMany({
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

  async delete(id: string, userId: string): Promise<boolean> {
    const todo = await prisma.todo.deleteMany({
      where: {
        id,
        userId,
      },
    });

    return todo.count > 0;
  }
}
