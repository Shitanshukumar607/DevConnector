import { formatDistanceToNowStrict } from "date-fns";
import { ThumbsDown, ThumbsUp } from "lucide-react";

type CommentType = {
  user: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  content: string;
  likes: string[];
  dislikes: string[];
};

const Comment = ({ comment: commentData }: { comment: CommentType }) => {
  //   console.log("Comment Data:", commentData);

  const dateFromNow: string = formatDistanceToNowStrict(
    commentData?.updatedAt,
    {
      addSuffix: true,
    }
  );

  return (
    <div className="group">
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 rounded-full flex items-center justify-center text-indigo-400 font-bold text-xs flex-shrink-0">
            {commentData.user.username[0].toUpperCase()}
          </div>
          <div className="w-px h-full bg-white/5 my-2 group-last:hidden"></div>
        </div>

        <div className="flex-1 min-w-0 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-sm text-gray-200 hover:text-white cursor-pointer transition-colors">
              u/{commentData.user.username}
            </span>
            <span className="text-gray-600 text-xs">•</span>
            <span className="text-gray-500 text-xs font-medium">
              {dateFromNow}
            </span>
          </div>

          <div className="text-gray-300 leading-relaxed mb-3 text-sm text-start">
            {commentData.content}
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-gray-500 hover:text-orange-500 transition-colors group/btn">
              <ThumbsUp className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              <span className="text-xs font-medium">{commentData.likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors group/btn">
              <ThumbsDown className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            </button>
            <button className="text-gray-500 hover:text-white transition-colors text-xs font-medium hover:underline">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
