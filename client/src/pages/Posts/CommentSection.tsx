import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router";
import { useAddCommentMutation } from "../../redux/posts/postApi";

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

  const [addComment, { isLoading }] = useAddCommentMutation();

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
    } catch (err: any) {
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

      <section className="bg-[#111111] rounded-2xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Comments {postData?.comments?.length}
          </h2>

          {/* Add Comment */}
          <div className="mb-8 p-4 bg-[#0a0a0a] rounded-xl">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                U
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="What are your thoughts?"
                  className="w-full px-4 py-3 bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={3}
                  {...register("content", { required: true })}
                />
                <div className="flex justify-end mt-3">
                  <button
                    disabled={isCommenting || isLoading}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors font-medium"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
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
