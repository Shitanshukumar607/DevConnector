import { useEffect } from "react";
import { useNavigate } from "react-router";

type UnauthorizedPopupProps = {
  message?: string;
  onClose: () => void;
};

export default function UnauthorizedPopup({
  message = "You need to be logged in to perform this action.",
  onClose,
}: UnauthorizedPopupProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  const handleLoginRedirect = () => {
    onClose();
    navigate("/login");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm font-primary"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111111] border border-white/10 text-white rounded-2xl shadow-xl px-6 py-5 w-full max-w-sm mx-4 animate-pop"
      >
        <h3 className="text-lg font-semibold mb-2 text-white/90 text-center">
          Unauthorized
        </h3>
        <p className="text-sm text-white/70 text-center mb-4">{message}</p>

        <button
          onClick={handleLoginRedirect}
          className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
