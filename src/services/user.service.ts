import { Prisma } from "@prisma/client";
import { UserModel } from "../models/user.model";
import { UserInput, UserOutput } from "../types/user.types";

export class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async getUserById(
    tx: Prisma.TransactionClient,
    id: string
  ): Promise<UserOutput> {
    const user = await this.userModel.findById(tx, id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async updateUser(
    tx: Prisma.TransactionClient,
    id: string,
    data: Partial<UserInput>
  ): Promise<UserOutput> {
    const user = await this.userModel.update(tx, id, data);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async deleteUser(
    tx: Prisma.TransactionClient,
    id: string
  ): Promise<UserOutput> {
    const user = await this.userModel.delete(tx, id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
