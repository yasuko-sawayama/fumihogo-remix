import { Form, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

const draftKey = "draft";
export const loader: LoaderFunction = async () => {
  return json(await FUMIHOGO_KV.get(draftKey, { type: "text" }));
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = (formData.get("title") as string) || "";
  const content = formData.get("content") as string;
  const data = { title, content };
  await FUMIHOGO_KV.put(draftKey, JSON.stringify(data));

  return "ok";
};

export default function CreateStory() {
  const data = JSON.parse(useLoaderData());

  return (
    <Form method="post">
      <label>
        タイトル
        <input type="text" name="title" defaultValue={data.title} />
      </label>
      <label htmlFor="content">
        <textarea
          name="content"
          id="content"
          cols={30}
          rows={10}
          defaultValue={data.content}
        ></textarea>
      </label>

      <input type="reset" value="変更を戻す" />

      <button>保存</button>
    </Form>
  );
}
