import { Outlet } from "@remix-run/react";

export default function StoriesRoute() {
  return (
    <div>
      <h1>小説一覧</h1>
      <Outlet />
    </div>
  );
}
