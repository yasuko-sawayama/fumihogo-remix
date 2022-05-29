import type { LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  return "loader";
};

export default function StoriesIndexRoute() {
  const data = useLoaderData();

  return (
    <div>
      {data}
      <p>Here's a random story:</p>
      <p>I was wondering why the frisbee was getting bigger, then it hit me.</p>
    </div>
  );
}
