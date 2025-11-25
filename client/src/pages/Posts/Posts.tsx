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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dislikePost, getPostById, likePost } from "../../api/posts";
import CommentSection from "./CommentSection";
import { formatDistanceToNowStrict } from "date-fns";
import UnauthorizedPopup from "../Popup/Popup";
import refreshAccessToken from "../../utils/refreshAccessoken";

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id!),
    enabled: Boolean(id),
  });

  const navigate = useNavigate();

  const likeMutation = useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["post", id] });
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: (postId: string) => dislikePost(postId),
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["post", id] });
      }
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const [likedStatus, setLikedStatus] = useState<string>("");
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [isDisliking, setIsDisliking] = useState<boolean>(false);

  const [showPopup, setShowPopup] = useState(false);

  const postData = data?.data;
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

  if (!postData) {
    return <div className="text-white text-center">Unable to load post.</div>;
  }

  const handleLike = async () => {
    if (!id || isLiking || likedStatus === "like") return;
    setIsLiking(true);

    try {
      const likePostData = await likeMutation.mutateAsync(id);
      if (likePostData) {
        setLikedStatus("like");
      }
    } catch (err) {
      console.error("Error liking post:", err);

      const refreshed = await refreshAccessToken();
      console.log(`Refreshed access token: ${refreshed}`);

      if (refreshed) {
        try {
          const retryLike = await likeMutation.mutateAsync(id);

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
    if (!id || isDisliking || likedStatus === "dislike") return;
    setIsDisliking(true);

    try {
      const dislikePostData = await dislikeMutation.mutateAsync(id);
      if (dislikePostData) {
        setLikedStatus("dislike");
      }
    } catch (err) {
      console.error("Error disliking post:", err);
      const refreshed = await refreshAccessToken();

      console.log(`Refreshed access token: ${refreshed}`);

      if (refreshed) {
        try {
          const retryDislike = await dislikeMutation.mutateAsync(id);
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

      <div className="min-h-screen bg-[#09090b] text-white">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-[#09090b]/90 backdrop-blur-md border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-[#27272a] rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="font-semibold text-lg truncate text-white">
                {postData.title}
              </h1>
            </div>
            <button className="p-2 hover:bg-[#27272a] rounded-full transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Voting Sidebar - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 flex flex-col items-center gap-4">
                <div className="flex flex-col items-center bg-[#27272a] rounded-full p-1 border border-white/10">
                  <button
                    onClick={handleLike}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      likedStatus === "like"
                        ? "text-orange-500 bg-orange-500/10"
                        : "text-gray-400 hover:bg-white/10 hover:text-orange-500"
                    }`}
                  >
                    <ThumbsUp className="w-6 h-6" />
                  </button>
                  <span className="text-sm font-bold py-2 text-gray-200">
                    {postData.likes.length - postData.dislikes.length}
                  </span>
                  <button
                    onClick={handleDislike}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      likedStatus === "dislike"
                        ? "text-blue-500 bg-blue-500/10"
                        : "text-gray-400 hover:bg-white/10 hover:text-blue-500"
                    }`}
                  >
                    <ThumbsDown className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-11 space-y-6">
              <article className="bg-[#18181b] border border-white/10 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-8">
                  {/* Post Meta */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-sm font-bold text-indigo-400">
                      {postData.user.username[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-200 font-semibold text-sm hover:underline cursor-pointer">
                        u/{postData.user.username}
                      </span>
                      <span className="text-gray-500 text-xs font-medium">
                        {dateFromNow}
                      </span>
                    </div>
                  </div>

                  {/* Post Title */}
                  <h1 className="text-3xl md:text-2xl font-bold mb-6 leading-tight text-white tracking-tight text-start">
                    {postData.title}
                  </h1>

                  {/* Post Content */}
                  <div className="prose prose-invert max-w-none mb-8">
                    <p className="text-gray-300 leading-relaxed text-md text-start">
                      {postData.description}
                    </p>
                  </div>

                  {/* Action Buttons - Mobile */}
                  <div className="flex items-center justify-between lg:hidden border-t border-white/10 pt-6">
                    <div className="flex items-center bg-[#27272a] rounded-full p-1 border border-white/10">
                      <button
                        onClick={handleLike}
                        className={`p-2 rounded-full transition-colors ${
                          likedStatus === "like"
                            ? "text-orange-500 bg-orange-500/10"
                            : "text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                      </button>
                      <span className="px-2 text-sm font-medium text-gray-300">
                        {postData.likes.length}
                      </span>
                      <div className="w-px h-4 bg-white/10 mx-1"></div>
                      <button
                        onClick={handleDislike}
                        className={`p-2 rounded-full transition-colors ${
                          likedStatus === "dislike"
                            ? "text-blue-500 bg-blue-500/10"
                            : "text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#27272a] border border-white/10 text-gray-400 hover:text-white transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {postData.comments.length}
                        </span>
                      </button>
                      <button className="p-2 rounded-full bg-[#27272a] border border-white/10 text-gray-400 hover:text-white transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons - Desktop */}
                  <div className="hidden lg:flex items-center gap-4 border-t border-white/10 pt-6">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#27272a] hover:bg-[#3f3f46] border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all text-sm font-medium">
                      <MessageSquare className="w-5 h-5" />
                      <span>{postData.comments.length} Comments</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#27272a] hover:bg-[#3f3f46] border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all text-sm font-medium">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-[#27272a] text-gray-400 hover:text-white transition-colors ml-auto">
                      <MoreHorizontal className="w-5 h-5" />
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
