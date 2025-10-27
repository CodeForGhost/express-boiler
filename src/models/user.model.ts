import { Prisma } from "@prisma/client";
import { UserInput, UserOutput } from "../types/user.types";
import bcrypt from "bcrypt";
export class UserModel {
  async create(
    tx: Prisma.TransactionClient,
    data: UserInput
  ): Promise<UserOutput> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await tx.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async findByEmail(tx: Prisma.TransactionClient, email: string) {
    return tx.user.findUnique({
      where: { email },
    });
  }

  async findById(
    tx: Prisma.TransactionClient,
    id: string
  ): Promise<UserOutput | null> {
    const user = await tx.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async update(
    tx: Prisma.TransactionClient,
    id: string,
    data: Partial<UserInput>
  ): Promise<UserOutput | null> {
    const updateData: any = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await tx.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async delete(
    tx: Prisma.TransactionClient,
    id: string
  ): Promise<UserOutput | null> {
    const user = await tx.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
}
