import { Link } from "react-router";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="font-primary min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111111] rounded-2xl shadow-xl p-8">
        <h2 className=" text-2xl font-semibold text-white text-center mb-6">
          Sign in to your account
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className=" flex text-sm font-medium text-gray-400 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="font-secondary w-full px-4 py-2 bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className=" flex text-sm font-medium text-gray-400 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="font-secondary w-full px-4 py-2 bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              {...register("password", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-white underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
