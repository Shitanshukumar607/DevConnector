import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCommentToPost } from "../../api/posts";

import refreshAccessToken from "../../utils/refreshAccessoken";
import UnauthorizedPopup from "../Popup/Popup";
import Comment from "./Comment";

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

type PostData = {
  comments: CommentType[];
};

type Inputs = {
  content: string;
};

const CommentSection = ({ postData }: { postData: PostData }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: addComment } = useMutation({
    mutationFn: (payload: { postId: string; content: string }) =>
      addCommentToPost(payload),
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["post", id] });
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { id } = useParams<{ id: string }>();

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsCommenting(true);

    try {
      await addComment({
        postId: id!,
        content: data.content,
      });
      reset();
    } catch (err) {
      console.error("Error commenting on post:", err);

      const refreshed = await refreshAccessToken();

      if (refreshed) {
        try {
          await addComment({
            postId: id!,
            content: data.content,
          });
          reset();
        } catch (err) {
          console.error("Error retrying comment on post:", err);
        }
      } else {
        setShowPopup(true);
      }
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <>
      {showPopup && (
        <UnauthorizedPopup
          message="You need to be logged in to comment on posts."
          onClose={() => setShowPopup(false)}
        />
      )}

      <section className="bg-[#18181b] border border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-8">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
            <div className="p-2 bg-[#27272a] rounded-lg border border-white/10">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
            </div>
            Comments{" "}
            <span className="text-gray-500 text-lg font-normal">
              ({postData?.comments?.length})
            </span>
          </h2>

          {/* Add Comment */}
          <div className="mb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="relative">
              <textarea
                {...register("content", { required: true })}
                placeholder="What are your thoughts?"
                className="w-full bg-[#27272a] text-white placeholder-gray-500 rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-white/10 resize-y transition-all"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCommenting}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
                >
                  {isCommenting ? "Posting..." : "Comment"}
                </button>
              </div>
            </form>
          </div>
          <div className="space-y-6">
            {postData.comments.length === 0
              ? "No comments yet."
              : postData.comments.map((comment, idx) => (
                  <Comment key={idx} comment={comment} />
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CommentSection;
