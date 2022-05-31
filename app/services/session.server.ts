import {
  createCloudflareKVSessionStorage,
  createCookie,
} from "@remix-run/cloudflare";

declare const SESSION_SECRET: string;

if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is not set");
}

// In this example the Cookie is created separately.
const sessionCookie = createCookie("__session", {
  secrets: [SESSION_SECRET],
  sameSite: true,
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
});

export const sessionStorage = createCloudflareKVSessionStorage({
  // The KV Namespace where you want to store sessions
  kv: FUMIHOGO_SESSION,
  cookie: sessionCookie,
});

export const { getSession, commitSession, destroySession } = sessionStorage;
