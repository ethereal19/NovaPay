import React from "react";

const Loader = ({ size = "md", text }) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-6">
      <div className="relative">
        {/* Outer glowing ring */}
        <div 
          className={`animate-ping absolute inset-0 rounded-full bg-cyan-500/10 ${
            size === "sm" ? "p-1" : size === "md" ? "p-2" : "p-4"
          }`}
        />
        {/* Spinner */}
        <div
          className={`${sizeClasses[size]} border-t-cyan-400 border-r-transparent border-b-violet-500 border-l-transparent rounded-full animate-spin`}
        />
      </div>
      {text && (
        <p className="text-slate-400 text-sm font-medium tracking-wide animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
