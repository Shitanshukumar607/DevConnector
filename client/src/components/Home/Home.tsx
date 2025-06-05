import Postcard from "../Postcard/Postcard";

import { useGetPostsQuery } from "../../redux/posts/postApi";

type PostCardProps = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  user: {
    _id: string;
    username: string;
  };
  likes: {
    _id: string;
    username: string;
  }[];
  comments: {
    _id: string;
    username: string;
  }[];
};

const Home = () => {
  const { data, error, isLoading } = useGetPostsQuery({});

  const posts: PostCardProps[] = data?.data ?? [];

  return (
    <div>
      {isLoading && <p>Loading...</p>}

      {error && <p>{JSON.stringify(error)}</p>}

      {posts.map((post: PostCardProps) => (
        <Postcard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
