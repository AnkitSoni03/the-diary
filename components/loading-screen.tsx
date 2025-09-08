"use client";

import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring Pulse */}
        <div className="absolute h-24 w-24 rounded-full border-4 border-yellow-400 animate-ping" />
        {/* Middle Glow Ring */}
        <div className="absolute h-16 w-16 rounded-full border-4 border-yellow-500 animate-pulse" />
        {/* Inner Solid Circle */}
        <div className="h-10 w-10 rounded-full bg-yellow-500 shadow-lg shadow-yellow-400/50 animate-bounce" />
      </div>
    </div>
  );
};

export default LoadingScreen;
