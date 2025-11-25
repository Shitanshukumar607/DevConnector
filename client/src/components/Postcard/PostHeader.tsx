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
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-sm font-bold text-indigo-400">
        {user.username.charAt(0).toUpperCase()}
      </div>
      <div className="ml-3 flex flex-col items-start">
        <span className="font-semibold text-sm text-gray-200 hover:text-white transition-colors">
          u/{user.username}
        </span>
        <span className="text-xs text-gray-500 font-medium">{dateFromNow}</span>
      </div>
    </div>
  );
};

export default PostHeader;
