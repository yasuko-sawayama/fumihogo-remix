import { Link } from "@remix-run/react";

type Props = {
  to: string;
  children?: React.ReactNode;
};

export default function PrimaryLinkButton({ to, children }: Props) {
  /*   const path = useResolvedPath(to);
  const location = useLocation();

  console.log("path", path);
  console.log("location", location);
  console.log("match", path.pathname === location.pathname); */
  return (
    <button
      type="button"
      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Link to={to}>{children ? children : "リンク"}</Link>
    </button>
  );
}
