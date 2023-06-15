import { Head } from "$fresh/runtime.ts";
import { Handler, PageProps } from "$fresh/server.ts";
import App from "../islands/App.tsx";

export const handler: Handler = async (req, ctx) => {
  const kv = await Deno.openKv();
  const count = (await kv.get(["count"])).value ?? 0;
  return ctx.render(count);
};

export default function Home(props: PageProps<number>) {
  return (
    <>
      <Head>
        <title>Count Confetti</title>
        <link rel="stylesheet" href="/global.css" />
      </Head>
      <div class="fixed bottom-4 right-4 z-30 ">
        <a href="https://fresh.deno.dev">
          <img
            width="197"
            height="37"
            src="https://fresh.deno.dev/fresh-badge.svg"
            alt="Made with Fresh"
          />
        </a>
      </div>
      <App count={props.data} />
    </>
  );
}
