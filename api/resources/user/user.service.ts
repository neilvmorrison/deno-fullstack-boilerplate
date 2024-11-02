import type { PrismaClient } from "../../../generated/client/deno/index.d.ts";

export class UserService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getUserProfileById(id: string) {
    const profile = await this.prisma.userProfile.findFirstOrThrow({
      where: { id },
    });
    return profile;
  }

  async getAllUsers() {
    const all_users = await this.prisma.userProfile.findMany();
    return all_users;
  }
}
