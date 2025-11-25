import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, MessageSquare, Plus, UserRoundIcon, X, Search } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import fullIcon from "/full-icon.png";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import useAuthStore from "@/store/authStore";
import useSearchStore from "@/store/searchStore";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { searchTerm, setSearchTerm } = useSearchStore();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce search term updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [localSearchTerm, setSearchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setLocalSearchTerm("");
    setSearchTerm("");
  };

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
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-10 py-2 text-sm placeholder:text-gray-500 bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-md focus:outline-none focus:ring-1 focus:ring-white font-secondary"
              name="search"
              value={localSearchTerm}
              onChange={handleSearchChange}
            />
            {localSearchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search bar */}
        <div className="md:hidden flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-7 pr-7 py-2 text-xs placeholder:text-gray-500 bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-md focus:outline-none focus:ring-1 focus:ring-white font-secondary"
              name="search-mobile"
              value={localSearchTerm}
              onChange={handleSearchChange}
            />
            {localSearchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
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
