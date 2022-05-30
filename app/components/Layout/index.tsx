/* This example requires Tailwind CSS v2.0+ */

import NavBar from "../NavBar";

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <>
      <div className="min-h-full">
        <NavBar />
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                {title ? title : "FumiHOGO"}
              </h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
