/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

const COUNT = Deno.env.get("COUNT");
if (COUNT) {
  const count = parseInt(COUNT);
  if (!isNaN(count)) {
    const kv = await Deno.openKv();
    await kv.set(["count"], count);
    kv.close();
  }
}

await start(manifest, { plugins: [twindPlugin(twindConfig)] });
