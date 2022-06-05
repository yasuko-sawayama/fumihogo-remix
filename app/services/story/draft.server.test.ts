import { expect, test } from "vitest";
import type { User } from "../auth.server";
import { draftKey } from "./draft.server";

const user: User = {
  id: 1,
  name: "foo",
  username: "なかの",
  profile_image_url: "https://example.com/foo.png",
  oauthToken: {
    key: "key",
    secret: "secret",
  },
};

const user2: User = {
  id: 112345,
  name: "foo",
  username: "なかの",
  profile_image_url: "https://example.com/foo.png",
  oauthToken: {
    key: "key",
    secret: "secret",
  },
};

test("userごとにuniqなkeyが生成されること", () => {
  const key = "draft:1";
  expect(key).eq(draftKey(user));
  expect(draftKey(user2)).not.eq(draftKey(user));
});

test.todo("draftKeyで下書きを取得できること", () => {});
