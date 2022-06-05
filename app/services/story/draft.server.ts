import type { User } from "../auth.server";

export const draftKey = (user: User) => `draft:${user.id}`;

export const getDraft = async (draftKey: string) => {
  const draft = await FUMIHOGO_KV.get(draftKey, { type: "text" });
  return draft;
};
