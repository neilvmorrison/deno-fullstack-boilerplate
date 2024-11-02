import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { AuthService } from "./auth.service.ts";
import prisma from "../../../prisma/prisma.ts";

const router = new Router({ prefix: "/api" });
const authService = new AuthService(prisma);

router.post("/register", async (ctx) => {
  try {
    const body = ctx.request.body();
    const { email, password } = await body.value;

    if (!email || !password) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Email and password are required" };
      return;
    }

    const user = await authService.register(email, password);

    ctx.response.status = 201;
    ctx.response.body = user;
  } catch (error) {
    console.error("Registration error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});

router.post("/login", async (ctx) => {
  try {
    const body = ctx.request.body();
    const { email, password } = await body.value;

    if (!email || !password) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Email and password are required" };
      return;
    }

    const result = await authService.login(email, password);

    if (!result) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Invalid credentials" };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = result;
  } catch (error) {
    console.error("Login error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});

export default router;
