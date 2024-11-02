import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

export function createHealthRouter() {
  const router = new Router();

  router.get("/health", (ctx) => {
    ctx.response.status = 200;
    ctx.response.body = { status: "ok" };
  });

  return router;
}
