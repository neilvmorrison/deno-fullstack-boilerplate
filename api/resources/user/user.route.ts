import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { UserService } from "./user.service.ts";
import prisma from "../../../prisma/prisma.ts";

const router = new Router({ prefix: "/users" });
const userService = new UserService(prisma);

router
  .get("/:id", async (ctx) => {
    try {
      const { id } = ctx.params;
      const profile = await userService.getUserProfileById(id);
      ctx.response.body = profile;
    } catch (error: unknown) {
      ctx.response.status = 404;
      ctx.response.body = { message: "User not found" };
      throw error;
    }
  })
  .get("/", async (cts) => {
    try {
      const users = await userService.getAllUsers();
      cts.response.body = users;
    } catch (error: unknown) {
      cts.response.status = 500;
      cts.response.body = { message: "Error fetching users" };
      throw error;
    }
  })
  .put("/:id", async (ctx) => {
    // TODO: Implement update profile
  })
  .delete("/:id", async (ctx) => {
    // TODO: Implement delete profile
  });

export default router;
