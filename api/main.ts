import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { createAuthRouter } from "./resources/auth/auth.route.ts";
import prisma from "../prisma/prisma.ts";
import { createHealthRouter } from "./resources/health/health.route.ts";
import userRouter from "./resources/user/user.route.ts";

const app = new Application();

// Logger middleware
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  console.log(`${ctx.response.status} ${ctx.request.url} - ${rt}`);
});

// Response time middleware
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Routes
const authRouter = createAuthRouter(prisma);
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

const healthRouter = createHealthRouter();
app.use(healthRouter.routes());
app.use(healthRouter.allowedMethods());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

// Start the server
const port = 8000;
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });
