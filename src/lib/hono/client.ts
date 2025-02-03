import { AppType } from "@/server/hono";
import { hc } from "hono/client";

export const hono = hc<AppType>('https://nextjs-hono-demo-2.pages.dev', {
  fetch: (input: RequestInfo | URL, requestInit?: RequestInit) =>
    fetch(input, {
      cache: "no-cache",
      ...requestInit,
    }),
});
