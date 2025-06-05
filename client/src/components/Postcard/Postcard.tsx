import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

type User = {
  _id: string;
  username: string;
};

type PostCardProps = {
  title: string;
  description: string;
  createdAt: string;
  user: User;
  likes: User[];
  comments: User[];
};

export default function PostCard({ post }: { post: PostCardProps }) {
  return (
    <article className="w-full max-w-4xl bg-[#111111] rounded-2xl p-5 shadow-lg text-white mx-auto mt-6">
      <PostHeader user={post.user} createdAt={post.createdAt} />

      <h2 className="flex flex-start text-lg font-semibold mb-2 text-start">
        {post.title}
      </h2>

      <p className="flex text-[#B8C5C9] mb-4 text-start">{post.description}</p>

      <PostFooter likes={post.likes} comments={post.comments} />
    </article>
  );
}
