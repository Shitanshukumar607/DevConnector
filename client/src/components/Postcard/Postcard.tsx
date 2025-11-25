import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { useNavigate } from "react-router";

type User = {
  _id: string;
  username: string;
};

type PostCardProps = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  user: User;
  likes: User[];
  dislikes: User[];
  comments: User[];
};

export default function PostCard({ post }: { post: PostCardProps }) {
  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate(`/posts/${post._id}`);
  };

  return (
    <article
      className="group w-full max-w-4xl bg-[#18181b] hover:bg-[#27272a] border border-white/10 hover:border-white/20 rounded-2xl p-6 text-white mx-auto mt-6 transition-all duration-300 ease-out shadow-sm hover:shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <PostHeader user={post.user} createdAt={post.createdAt} />

      <h2 className="text-xl font-bold mb-3 text-start text-gray-100 group-hover:text-white transition-colors">
        {post.title}
      </h2>

      <p className="text-gray-400 mb-6 text-start leading-relaxed line-clamp-3">
        {post.description}
      </p>

      <PostFooter
        likes={post.likes}
        dislikes={post.dislikes}
        comments={post.comments}
        postId={post._id}
      />
    </article>
  );
}
