import {
  ArrowLeft,
  MessageSquare,
  MoreHorizontal,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useDislikePostMutation,
  useGetPostByIdQuery,
  useLikePostMutation,
} from "../../redux/posts/postApi";
import CommentSection from "./CommentSection";
import { formatDistanceToNowStrict } from "date-fns";
import UnauthorizedPopup from "../Popup/Popup";
import refreshAccessToken from "../../utils/refreshAccessoken";

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetPostByIdQuery(id!, {
    skip: !id,
  });

  const navigate = useNavigate();

  const [likePost] = useLikePostMutation();
  const [dislikePost] = useDislikePostMutation();

  const [likedStatus, setLikedStatus] = useState<string>("");
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [isDisliking, setIsDisliking] = useState<boolean>(false);

  const [showPopup, setShowPopup] = useState(false);

  const postData = data?.data || [];
  // console.log(postData, error, isLoading);

  useEffect(() => {
    setLikedStatus("");

    if (postData?.isLikedByUser) {
      setLikedStatus("like");
    } else if (postData?.isDislikedByUser) {
      setLikedStatus("dislike");
    }
  }, [postData]);

  const dateFromNow: string = postData?.createdAt
    ? formatDistanceToNowStrict(new Date(postData?.createdAt), {
        addSuffix: true,
      })
    : "";

  if (isLoading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading post: {JSON.stringify(error)}
      </div>
    );
  }

  const handleLike = async () => {
    if (isLiking || likedStatus === "like") return;
    setIsLiking(true);

    try {
      const likePostData = await likePost(id!).unwrap();
      if (likePostData) {
        setLikedStatus("like");
      }
    } catch (err: any) {
      console.error("Error liking post:", err);

      const refreshed = await refreshAccessToken();

      if (refreshed) {
        try {
          const retryLike = await likePost(id!).unwrap();

          if (retryLike) {
            setLikedStatus("like");
          }
        } catch (err) {
          console.error("Error retrying like post:", err);
        }
      } else {
        setShowPopup(true);
      }
    } finally {
      setIsLiking(false);
    }
  };

  const handleDislike = async () => {
    if (isDisliking || likedStatus === "dislike") return;
    setIsDisliking(true);

    try {
      const dislikePostData = await dislikePost(id!).unwrap();
      if (dislikePostData) {
        setLikedStatus("dislike");
      }
    } catch (err) {
      console.error("Error disliking post:", err);
      const refreshed = await refreshAccessToken();

      if (refreshed) {
        try {
          const retryDislike = await dislikePost(id!).unwrap();
          if (retryDislike) {
            setLikedStatus("dislike");
          }
        } catch (err) {
          console.error("Error retrying dislike post:", err);
        }
      } else {
        setShowPopup(true);
      }
    } finally {
      setIsDisliking(false);
    }
  };

  return (
    <>
      {showPopup && (
        <UnauthorizedPopup
          message="You need to be logged in to perform this action."
          onClose={() => setShowPopup(false)}
        />
      )}

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1a1a1a]">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-[#1a1a1a] rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="font-semibold text-lg truncate">
                {postData.title}
              </h1>
            </div>
            <button className="p-2 hover:bg-[#1a1a1a] rounded-full transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Voting Sidebar - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 flex flex-col items-center gap-2 bg-[#111111] rounded-xl p-3">
                <button
                  onClick={handleLike}
                  className={`p-2 rounded-lg transition-colors ${
                    likedStatus === "like"
                      ? "bg-orange-500 text-white"
                      : "hover:bg-[#1a1a1a] text-gray-400 hover:text-white"
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium">
                  {postData.likes.length - postData.dislikes.length}
                </span>
                <button
                  onClick={handleDislike}
                  className={`p-2 rounded-lg transition-colors ${
                    likedStatus === "dislike"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-[#1a1a1a] text-gray-400 hover:text-white"
                  }`}
                >
                  <ThumbsDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-11 space-y-6">
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
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                          likedStatus === "like"
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
                        onClick={handleDislike}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                          likedStatus === "dislike"
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
              <CommentSection postData={postData} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
