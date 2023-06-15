import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  POST: async () => {
    const kv = await Deno.openKv();
    const oldCount = (await kv.get(["count"])).value ?? 0;
    await kv.set(["count"], oldCount + 1);
    kv.close();
    return new Response(oldCount + 1, {
      status: 200,
    });
  },
};
