import { MessageCircle, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";

export default function PostCard() {
  return (
    <article className="w-full max-w-4xl bg-[#111111] rounded-2xl p-5 shadow-lg text-white mx-auto mt-6">
      <div className="flex items-center mb-3">
        <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center text-sm font-bold">
          U
        </div>
        <div className="ml-3 text-sm text-gray-400">
          <span className="font-medium text-white">u/Mining_Craft</span> • 13
          hr. ago
        </div>
      </div>

      <h2 className="flex flex-start text-lg font-semibold mb-2 text-start">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel fuga nobis
        quisquam ex labore explicabo, voluptate modi repudiandae magni corporis
        quos accusantium obcaecati quo rem quas odit beatae libero veniam. Lorem
        ipsum dolor sit amet consectetur adipisicing elit.
      </h2>

      {/* <div className="inline-block bg-green-600 text-black text-xs px-2 py-1 rounded-full mb-3">
        query
      </div> */}

      <p className="flex text-[#B8C5C9] mb-4 text-start">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel fuga nobis
        quisquam ex labore explicabo, voluptate modi repudiandae magni corporis
        quos accusantium obcaecati quo rem quas odit beatae libero veniam. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Maiores doloribus,
        neque labore sequi blanditiis quia eveniet, molestias sint repellat
        nemo, iure consequatur porro! Dolorem, quisquam! Dolorem minima nesciunt
        soluta corporis?
      </p>

      <div className="flex items-center space-x-4 text-sm">
        <div className=" flex items-center transition-all rounded-full bg-[#1a282d] ">
          <div className="flex items-center">
            <button className="bg-[#1a282d] hover:bg-[#FFFFFF26] p-3 rounded-full hover:text-red-600 transition">
              <ThumbsUp size={16} />
            </button>
            <span>8</span>
          </div>
          <button className="bg-[#1a282d] hover:bg-[#FFFFFF26] p-3 rounded-full hover:text-blue-600 transition">
            <ThumbsDown size={16} />
          </button>
        </div>

        <button className="flex items-center space-x-1 hover:bg-[#FFFFFF26] transition-all gap-1 px-3 py-2.5 rounded-full bg-[#1a282d]">
          <MessageCircle size={16} />
          <span>10</span>
        </button>
        <button className="flex items-center space-x-1 hover:bg-[#FFFFFF26] transition-all gap-1 px-3 py-2.5 rounded-full bg-[#1a282d]">
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>
    </article>
  );
}
