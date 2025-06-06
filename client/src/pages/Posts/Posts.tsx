import { ArrowLeft, MoreHorizontal, ThumbsDown, ThumbsUp } from "lucide-react";
import { useParams } from "react-router";
import { useGetPostByIdQuery } from "../../redux/posts/postApi";
import CommentSection from "./CommentSection";
import PostMain from "./PostMain";

export default function Post() {
  const { id } = useParams<{ id: string }>();
  // console.log(id);
  const { data, error, isLoading } = useGetPostByIdQuery(id!, {
    skip: !id,
  });

  const postData = data?.data || [];
  // console.log(postData, error, isLoading);

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

  let userVote = "like"; // This should be replaced with actual user vote state

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <button className="p-2 hover:bg-[#1a1a1a] rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-lg truncate">{postData.title}</h1>
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
                className={`p-2 rounded-lg transition-colors ${
                  userVote === "like"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-[#1a1a1a] text-gray-400 hover:text-white"
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium">0</span>
              <button
                className={`p-2 rounded-lg transition-colors ${
                  userVote === "dislike"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-[#1a1a1a] text-gray-400 hover:text-white"
                }`}
              >
                <ThumbsDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-11 space-y-6">
            <PostMain postData={postData} />
            <CommentSection postData={postData} />
          </div>
        </div>
      </main>
    </div>
  );
}
