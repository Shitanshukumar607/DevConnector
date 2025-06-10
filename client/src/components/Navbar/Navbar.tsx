import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, MessageSquare, Plus, UserRoundIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import fullIcon from "/full-icon.png";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a]">
      <div className="mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-white font-semibold text-lg tracking-tight">
          <NavLink to="/" className="flex items-center gap-2">
            <img src={fullIcon} alt="DevConnector" className="w-30" />
          </NavLink>
        </div>

        {/* Search bar - hide on small screens */}
        <div className="hidden md:flex flex-1 justify-center">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full max-w-md px-4 py-2  text-sm placeholder:text-gray-500 bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-md focus:outline-none focus:ring-1 focus:ring-white font-secondary"
            name="search"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Message Icon */}
          <button className="p-2 rounded-full hover:bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* Notification Icon */}
          <button className="p-2 rounded-full hover:bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          {/* Create Button */}
          <button
            onClick={() => navigate("/create-post")}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm text-white font-medium transition-colors border border-[#2a2a2a] font-primary"
          >
            <Plus className="w-4 h-4" />
            Create
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white font-primary">
            {user?.username ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 hover:bg-red-500/10 focus:bg-red-500 focus:text-white">
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLink to="/login" className="text-white">
                <UserRoundIcon className="w-5 h-5" />
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
