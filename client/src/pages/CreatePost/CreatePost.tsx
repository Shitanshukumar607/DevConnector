import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCreatePostMutation } from "../../redux/posts/postApi";
import refreshAccessToken from "../../utils/refreshAccessoken";

type PostInputs = {
  title: string;
  description: string;
};

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostInputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createPost] = useCreatePostMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<PostInputs> = async (data) => {
    setIsSubmitting(true);

    try {
      await createPost(data).unwrap();
      reset();
      navigate("/");
    } catch (err: any) {
      const refreshed = await refreshAccessToken();

      if (refreshed) {
        try {
          await createPost(data).unwrap();
          reset();
          navigate("/");
        } catch (err) {
          console.error("Error retrying post creation:", err);
        }
      } else {
        navigate("/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-primary min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-[#111111] rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Create a New Post
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="flex text-sm font-medium text-white/70 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              className="font-secondary w-full px-4 py-2 bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1 flex">
                Title is required
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="flex text-sm font-medium text-white/70 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Write your post..."
              rows={6}
              className="font-secondary w-full px-4 py-2 bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1 flex">
                Description is required
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
