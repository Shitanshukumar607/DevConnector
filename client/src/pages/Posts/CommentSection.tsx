import { MessageSquare } from "lucide-react";
import Comment from "./Comment";

type CommentType = {
  id: number;
  user: string;
  text: string;
  time: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  dislikes: number[];
};

type PostData = {
  comments: CommentType[];
};

// {
//     "_id": "6841cf6eb8f495f4f425522b",
//     "user": {
//         "_id": "683b0d169a358bbfd52543b7",
//         "username": "shitanshu"
//     },
//     "title": "Dummy Post Title 9",
//     "description": "Dummy Post Description",
//     "comments": [
//         "68431325069acaa2cb092565"
//     ],
//     "likes": [
//         "683b0d169a358bbfd52543b7"
//     ],
//     "createdAt": "2025-06-05T17:10:06.085Z",
//     "updatedAt": "2025-06-06T16:15:09.847Z",
//     "__v": 13,
//     "dislikes": []
// }

const CommentSection = ({ postData }: { postData: PostData }) => {
    console.log("Post Data in CommentSection:", postData);

  //   console.log(postData?.comments?.length, "comments length");

  return (
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
              />
              <div className="flex justify-end mt-3">
                <button className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors font-medium">
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {postData.comments.length === 0
            ? "No comments yet."
            : postData.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
