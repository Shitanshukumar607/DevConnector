import { formatDistanceToNowStrict } from "date-fns";
import { MessageSquare, Share2, ThumbsDown, ThumbsUp } from "lucide-react";

type User = {
  username: string;
};

type PostData = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  user: User;
  likes: User[];
  comments: User[];
};

const PostMain = ({ postData }: { postData: PostData }) => {
  const dateFromNow: string = formatDistanceToNowStrict(
    new Date(postData?.createdAt),
    {
      addSuffix: true,
    }
  );

  return (
    <article className="bg-[#111111] rounded-2xl overflow-hidden">
      <div className="p-6">
        {/* Post Meta */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
            {postData.user.username[0].toUpperCase()}
          </div>
          <span>u/{postData.user.username}</span>
          <span>•</span>
          <span>{dateFromNow}</span>
        </div>

        {/* Post Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight flex">
          {postData.title}
        </h1>

        {/* Post Content */}
        <div className="prose prose-invert max-w-none mb-6">
          <p className="text-gray-300 leading-relaxed text-base md:text-lg flex">
            {postData.description}
          </p>
        </div>

        {/* Action Buttons - Mobile */}
        <div className="flex items-center justify-between lg:hidden border-t border-[#1a1a1a] pt-4">
          <div className="flex items-center gap-4">
            <button
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                "like" === "like"
                  ? "bg-orange-500/20 text-orange-400"
                  : "hover:bg-[#1a1a1a] text-gray-400"
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                {postData.likes.length}
              </span>
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                "dislike" === "dislike"
                  ? "bg-blue-500/20 text-blue-400"
                  : "hover:bg-[#1a1a1a] text-gray-400"
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span className="text-sm font-medium">0</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-gray-400 text-sm">
              <MessageSquare className="w-4 h-4" />
              {postData.comments.length}
            </span>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1a1a1a] text-gray-400 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>

        {/* Action Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-6 border-t border-[#1a1a1a] pt-4">
          <span className="flex items-center gap-2 text-gray-400 text-sm">
            <MessageSquare className="w-4 h-4" />
            {postData.comments.length} Comments
          </span>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1a1a1a] text-gray-400 transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostMain;
