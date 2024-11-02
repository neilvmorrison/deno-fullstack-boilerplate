import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import health_router from "./resources/health/health.route.ts";
import user_router from "./resources/user/user.route.ts";
import auth_router from "./resources/auth/auth.route.ts";

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

function useRouter(router: Router) {
  app.use(router.routes());
  app.use(router.allowedMethods());
}

useRouter(auth_router);
useRouter(health_router);
useRouter(user_router);

const port = 8000;
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });
