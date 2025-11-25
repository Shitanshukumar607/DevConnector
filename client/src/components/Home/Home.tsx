import Postcard from "../Postcard/Postcard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/posts";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useSearchStore from "@/store/searchStore";
import { LoadingMessage } from "@/components/ui/loading";

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
  const { searchTerm, setSearchTerm } = useSearchStore();

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", searchTerm],
    queryFn: ({ pageParam = 1 }) => 
      getPosts({ 
        page: pageParam, 
        limit: 10, 
        search: searchTerm || undefined 
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.pagination.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const posts: PostCardProps[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingMessage message="Loading posts..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500">Error: {JSON.stringify(error)}</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-400">
          {searchTerm ? `No posts found for "${searchTerm}"` : "No posts available"}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Search Results Header */}
      {searchTerm && (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 mb-4 mx-4">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h3 className="text-lg font-semibold">Search Results</h3>
              <p className="text-gray-400 text-sm">
                Showing results for "{searchTerm}"
                {data?.pages[0]?.pagination?.totalPosts !== undefined && 
                  ` (${data.pages[0].pagination.totalPosts} total)`
                }
              </p>
            </div>
            <button
              onClick={() => {
                setSearchTerm("");
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<LoadingMessage message="Loading more posts..." />}
        endMessage={
          <div className="flex justify-center items-center py-4">
            <div className="text-gray-400">
              {searchTerm ? 
                `No more results for "${searchTerm}"` : 
                "No more posts to load"
              }
            </div>
          </div>
        }
        refreshFunction={() => window.location.reload()}
        pullDownToRefresh={false}
      >
        {posts.map((post: PostCardProps) => (
          <Postcard key={post._id} post={post} />
        ))}
      </InfiniteScroll>
      
      {isFetchingNextPage && (
        <div className="flex justify-center items-center py-4">
          <LoadingMessage message="Fetching more posts..." />
        </div>
      )}
    </div>
  );
};

export default Home;
