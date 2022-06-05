import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import UserStoryList from "~/components/organisms/UserStoryList";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return { user };
};

export const meta: MetaFunction = ({ data }) => {
  const title = data.user ? `${data.user.name}さんの作品一覧` : "作品一覧";
  return {
    title,
    description: "小説一覧",
  };
};

export default function StoriesIndexRoute() {
  const { user } = useLoaderData();

  return (
    <div>
      <UserStoryList user={user} />
    </div>
  );
}
