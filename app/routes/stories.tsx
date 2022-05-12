import { Outlet } from "@remix-run/react";

export default function StoriesRoute() {
  return (
    <div>
      <h1>Stories</h1>
      Stories
      <Outlet />
    </div>
  );
}
