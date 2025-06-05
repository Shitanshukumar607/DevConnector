import { formatDistanceToNowStrict } from "date-fns";

type User = {
  _id: string;
  username: string;
};

const PostHeader = ({ user, createdAt }: { user: User; createdAt: string }) => {
  const dateFromNow: string = formatDistanceToNowStrict(new Date(createdAt), {
    addSuffix: true,
  });

  return (
    <div className="flex items-center mb-3">
      <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center text-sm font-bold">
        U
      </div>
      <div className="ml-3 text-sm text-gray-400">
        <span className="font-medium text-white">u/{user.username}</span> •{" "}
        {dateFromNow}
      </div>
    </div>
  );
};

export default PostHeader;
