import { MessageCircle, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";

type User = {
  _id: string;
  username: string;
};

const PostFooter = ({ likes, comments }: { likes: User[]; comments: User[]; }) => {
  return (
    <div>
      <div className="flex items-center space-x-4 text-sm">
        <div className=" flex items-center transition-all rounded-full bg-[#1a282d] ">
          <div className="flex items-center">
            <button className="bg-[#1a282d] hover:bg-[#FFFFFF26] p-3 rounded-full hover:text-red-600 transition">
              <ThumbsUp size={16} />
            </button>
            <span>{likes.length}</span>
          </div>
          <button className="bg-[#1a282d] hover:bg-[#FFFFFF26] p-3 rounded-full hover:text-blue-600 transition">
            <ThumbsDown size={16} />
          </button>
        </div>

        <button className="flex items-center space-x-1 hover:bg-[#FFFFFF26] transition-all gap-1 px-3 py-2.5 rounded-full bg-[#1a282d]">
          <MessageCircle size={16} />
          <span>{comments.length}</span>
        </button>
        <button className="flex items-center space-x-1 hover:bg-[#FFFFFF26] transition-all gap-1 px-3 py-2.5 rounded-full bg-[#1a282d]">
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostFooter;
