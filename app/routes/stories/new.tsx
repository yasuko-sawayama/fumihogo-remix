import { Form, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { authenticator } from "~/services/auth.server";
import { draftKey, getDraft } from "../../services/story/draft.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  const draft = await getDraft(draftKey(user));
  console.log("draft", draft);

  return json({
    draft,
    user,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) throw new Error("ログインしてください");

  const formData = await request.formData();
  console.log("formdata", formData);

  const title = (formData.get("title") as string) || "";
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const data = { title, description, content };
  await FUMIHOGO_KV.put(draftKey(user), JSON.stringify(data));

  return "ok";
};

export const handle = {
  title: "新規作成",
  // 新規作成ボタンが表示されないようにする
  buttons: [],
};

export default function CreateStory() {
  const data = useLoaderData();

  console.log(data);
  const draft = JSON.parse(data.draft);

  return (
    <Form method="post" className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              新規作成
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                タイトル
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={draft?.title}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                概要
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={draft?.description}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences description yourself.
              </p>
            </div>
          </div>
          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  本文
                </label>
                <div className="mt-1">
                  <textarea
                    id="content"
                    name="content"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={draft?.content}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Write a few sentences content yourself.
                </p>
              </div>
            </div>

            <input type="reset" value="変更を戻す" />

            <button type="submit">保存</button>
            <button type="submit">TODO: 作成する</button>
          </div>
        </div>
      </div>
    </Form>
  );
}
