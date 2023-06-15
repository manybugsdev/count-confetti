import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  POST: async (req) => {
    const newCount = await req.json();
    const kv = await Deno.openKv();
    const oldCount = (await kv.get(["count"])).value ?? 0;
    const dc = newCount - oldCount;
    // for security and ux...
    if (newCount - oldCount > 10) {
      await kv.set(["count"], oldCount + 10);
    } else if (newCount - oldCount > 0) {
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
