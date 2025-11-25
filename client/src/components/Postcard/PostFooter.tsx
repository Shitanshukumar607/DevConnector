import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Check,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost, dislikePost } from "../../api/posts";
import useAuthStore from "../../store/authStore";
import { useState } from "react";
import UnauthorizedPopup from "../../pages/Popup/Popup";

type User = {
  _id: string;
  username: string;
};

const PostFooter = ({
  likes,
  dislikes,
  comments,
  postId,
}: {
  likes: User[];
  dislikes: User[];
  comments: User[];
  postId: string;
}) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [showPopup, setShowPopup] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const isLiked = user ? likes.some((like) => like._id === user._id) : false;
  const isDisliked = user
    ? dislikes.some((dislike) => dislike._id === user._id)
    : false;

  const { mutate: handleLike } = useMutation({
    mutationFn: () => likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: handleDislike } = useMutation({
    mutationFn: () => dislikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const onLikeClick = () => {
    if (!user) {
      setShowPopup(true);
      return;
    }
    handleLike();
  };

  const onDislikeClick = () => {
    if (!user) {
      setShowPopup(true);
      return;
    }
    handleDislike();
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/posts/${postId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this post",
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <>
      {showPopup && <UnauthorizedPopup onClose={() => setShowPopup(false)} />}
      <div
        className="flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center bg-[#27272a] rounded-full p-1 border border-white/10 hover:border-white/20 transition-colors">
          <button
            onClick={onLikeClick}
            className={`p-2 hover:bg-white/10 rounded-full transition-colors ${
              isLiked
                ? "text-orange-500"
                : "text-gray-400 hover:text-orange-500"
            }`}
          >
            <ThumbsUp size={18} />
          </button>
          <span className="px-1 text-sm font-medium text-gray-300 min-w-[1.5rem] text-center">
            {likes.length}
          </span>
          <div className="w-px h-4 bg-white/10 mx-1"></div>
          <button
            onClick={onDislikeClick}
            className={`p-2 hover:bg-white/10 rounded-full transition-colors ${
              isDisliked ? "text-blue-500" : "text-gray-400 hover:text-blue-500"
            }`}
          >
            <ThumbsDown size={18} />
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#27272a] hover:bg-[#3f3f46] border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all text-sm font-medium">
          <MessageCircle size={18} />
          <span>{comments.length}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#27272a] hover:bg-[#3f3f46] border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all text-sm font-medium ml-auto"
        >
          {isCopied ? <Check size={18} /> : <Share2 size={18} />}
          <span className="hidden sm:inline">
            {isCopied ? "Copied!" : "Share"}
          </span>
        </button>
      </div>
    </>
  );
};

export default PostFooter;
