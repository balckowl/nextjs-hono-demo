import { AppType } from "@/server/hono";
import { hc } from "hono/client";

export const hono = hc<AppType>('http://localhost:3000');
