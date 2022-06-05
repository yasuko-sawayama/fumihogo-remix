import type { LoaderFunction } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import PrimaryLinkButton from "~/components/atoms/PrimaryLinkButton";
import { authenticator } from "~/services/auth.server";
import Layout from "../components/Layout/index";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  return { user };
};

const newButton = () => {
  return <PrimaryLinkButton to="stories/new">新規作成</PrimaryLinkButton>;
};

export const handle = {
  title: "小説",
  buttons: [newButton],
};

export default function StoriesRoute() {
  const { user } = useLoaderData();

  const profile = user
    ? {
        name: user?.name,
        profile_image_url: user?.profile_image_url,
        username: user?.username,
      }
    : null;

  return (
    <Layout profile={profile}>
      <Outlet context={user} />
    </Layout>
  );
}
