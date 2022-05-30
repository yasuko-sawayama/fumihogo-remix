import { Outlet } from "@remix-run/react";
import Layout from "../components/Layout/index";

export default function StoriesRoute() {
  return (
    <Layout title="小説">
      <Outlet />
    </Layout>
  );
}
