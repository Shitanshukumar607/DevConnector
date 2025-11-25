export const LoadingSpinner = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-6 h-6",
    large: "w-8 h-8"
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} border-2 border-gray-600 border-t-white rounded-full animate-spin`}></div>
    </div>
  );
};

export const LoadingMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <LoadingSpinner />
      <span className="text-gray-400 text-sm">{message}</span>
    </div>
  );
};