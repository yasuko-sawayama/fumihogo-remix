/* This example requires Tailwind CSS v2.0+ */

import { useMatches } from "@remix-run/react";
import type { Profile } from "~/services/auth.server";
import NavBar from "../NavBar";

type Props = {
  children: React.ReactNode;
  profile: Profile | null;
};

export default function Layout({ children, profile }: Props) {
  const matches = useMatches();

  const titleString = matches
    // タイトルが設定されている場合のみ抽出
    .filter((match) => match.handle && match.handle.title)
    // 子階層にあるtitleを優先
    .pop()?.handle?.title;

  const buttons = matches
    .filter((match) => match.handle && match.handle.buttons)
    .pop()?.handle?.buttons;
  //.flatMap((match) => match.handle.buttons);

  return (
    <>
      <div className="min-h-full">
        <NavBar profile={profile} />
        <div className="py-10">
          {titleString ? (
            <header>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                      {titleString}
                    </h2>
                  </div>
                  {buttons ? (
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                      {/* JSX.Elementの呼び出しができないのでany...
                      {buttons.map(
                        (Button: JSX.Element, index: number) =>
                          Button && <Button key={index} />
                      )} */}
                      {buttons.map(
                        (Button: any, index: number) =>
                          Button && <Button key={index} />
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </header>
          ) : null}
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
