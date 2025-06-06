import { formatDistanceToNowStrict } from "date-fns";
import { ThumbsDown, ThumbsUp } from "lucide-react";

type CommentType = {
  user: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  text: string;
  likes: string[];
  dislikes: string[];
};

// createdAt: "2025-06-06T16:11:17.777Z";
// dislikes: [];
// likes: [];
// text: "This is a edited comment ";
// updatedAt: "2025-06-06T16:22:43.621Z";
// user: "683b0d169a358bbfd52543b7";
// __v: 0;
// _id: "68431325069acaa2cb092565";

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
      <div className="flex gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
          {commentData.user.username[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 pt-1 mb-2">
            <span className="font-medium text-sm">
              u/{commentData.user.username}
            </span>
            <span className="text-gray-500 text-xs">•</span>
            <span className="text-gray-500 text-xs">{dateFromNow}</span>
          </div>
          <p className="text-gray-200 leading-relaxed mb-3 flex">
            {commentData.text}
          </p>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-gray-400 hover:text-orange-400 transition-colors">
              <ThumbsUp className="w-3 h-3" />
              <span className="text-xs">{commentData.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
              <ThumbsDown className="w-3 h-3" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors text-xs font-medium">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
