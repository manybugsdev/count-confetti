import { Handler } from "$fresh/server.ts";

export const handler: Handler = async (req, ctx) => {
  const kv = await Deno.openKv();
  const count = (await kv.get(["count"])).value ?? 0;
  await kv.set(["count"], count + 1);
  return new Response(count, { status: 200 });
};
