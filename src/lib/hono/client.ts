import { AppType } from "@/server/hono";
import { hc } from "hono/client";

export const hono = hc<AppType>('http://localhost:3000', {
  fetch: (input: RequestInfo | URL, requestInit?: RequestInit) =>
    fetch(input, {
      cache: "no-cache",
      ...requestInit,
    }),
});
