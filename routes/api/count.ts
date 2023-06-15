import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  POST: async (req) => {
    const newCount = await req.json();
    const kv = await Deno.openKv();
    const oldCount = (await kv.get(["count"])).value ?? 0;
    if (newCount > oldCount) {
      await kv.set(["count"], newCount);
    } else {
      await kv.set(["count"], oldCount + 1);
    }
    kv.close();
    return new Response(newCount > oldCount ? newCount : oldCount + 1, {
      status: 200,
    });
  },
};
