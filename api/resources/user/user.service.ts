import type { PrismaClient } from "../../../generated/client/deno/edge.ts";

export class UserService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getUserProfileById(id: string) {
    const profile = await this.prisma.user_profile.findFirstOrThrow({
      where: { id },
    });
    return profile;
  }

  async getAllUsers() {
    const all_users = await this.prisma.user_profile.findMany();
    return all_users;
  }
}
