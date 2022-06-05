import type { LoaderFunction } from "@remix-run/cloudflare";
import { authenticator } from "~/services/auth.server";

// This will be called after twitter auth page
export let loader: LoaderFunction = async ({ request }) => {
  await authenticator.authenticate("twitter", request, {
    successRedirect: "/",
    failureRedirect: "/login/failure",
  });
};
