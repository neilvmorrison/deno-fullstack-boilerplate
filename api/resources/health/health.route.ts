import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const router = new Router({ prefix: "/api/health" });

router.get("/", (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = { status: "ok" };
});

export default router;
