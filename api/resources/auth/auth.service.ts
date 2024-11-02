import type { PrismaClient } from "../../../generated/client/deno/index.d.ts";
import {
  comparePasswords,
  generateJWT,
  hashPassword,
} from "../../utils/auth.ts";

export class AuthService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async register(
    email: string,
    password: string,
  ): Promise<{ id: string; email: string }> {
    const hashedPassword = await hashPassword(password);

    return await this.prisma.auth_user.create({
      data: {
        id: crypto.randomUUID(),
        email,
        password: hashedPassword,
        updated_at: new Date(),
      },
      select: {
        id: true,
        email: true,
      },
    });
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: { id: string; email: string }; token: string } | null> {
    const user = await this.prisma.auth_user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const token = await generateJWT({
      id: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    };
  }
}
