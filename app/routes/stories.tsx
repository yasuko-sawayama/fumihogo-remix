import { Outlet } from "@remix-run/react";
import PrimaryLinkButton from "~/components/atoms/PrimaryLinkButton";

const newButton = () => {
  return <PrimaryLinkButton to="stories/new">新規作成</PrimaryLinkButton>;
};

export const handle = {
  title: "小説",
  buttons: [newButton],
};

export default function StoriesRoute() {
  return <Outlet />;
}
