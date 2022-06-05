import type { User } from "~/services/auth.server";

type Props = {
  user: User;
};

const UserStoryList = ({ user }: Props) => {
  return <div>TODO: ユーザーの小説一覧を表示</div>;
};

export default UserStoryList;
