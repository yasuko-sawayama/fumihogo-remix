import { useOutletContext } from "@remix-run/react";
import type { User } from "~/services/auth.server";

export default function useUser() {
  const user = useOutletContext<User>();

  return user;
}
