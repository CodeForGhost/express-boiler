import { Prisma } from "@prisma/client";
import { AuthModel } from "../models/auth.model";
import { UserModel } from "../models/user.model";
import { LoginInput, AuthResponse } from "../types/auth.types";
import { UserInput } from "../types/user.types";
import { generateToken } from "../utils/jwt.utils";

export class AuthService {
  private authModel: AuthModel;
  private userModel: UserModel;

  constructor() {
    this.authModel = new AuthModel();
    this.userModel = new UserModel();
  }

  async register(
    tx: Prisma.TransactionClient,
    userData: UserInput
  ): Promise<AuthResponse> {
    const existingUser = await this.userModel.findByEmail(tx, userData.email);

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const user = await this.userModel.create(tx, userData);

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async login(
    tx: Prisma.TransactionClient,
    credentials: LoginInput
  ): Promise<AuthResponse> {
    const user = await this.authModel.validateUser(
      tx,
      credentials.email,
      credentials.password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    return {
      token,
      user,
    };
  }
}
