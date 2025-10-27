import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

export class AuthModel {
  async validateUser(
    tx: Prisma.TransactionClient,
    email: string,
    password: string
  ) {
    const user = await tx.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
