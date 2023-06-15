import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  POST: async (req) => {
    const newCount = await req.json();
    const kv = await Deno.openKv();
    const oldCount = (await kv.get(["count"])).value ?? 0;
    if (newCount > oldCount) {
      await kv.set(["count"], newCount);
    }
    kv.close();
    return new Response(newCount > oldCount ? newCount : oldCount, {
      status: 200,
    });
  },
};
