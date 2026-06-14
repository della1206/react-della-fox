import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50/20 via-white to-purple-50/20">
      {/* Spinner animasi putar warna biru premium */}
      <div className="w-12 h-12 border-4 border-[#5da5e8] border-t-transparent rounded-full animate-spin mb-4 shadow-sm"></div>
      
      {/* Teks Loading warna biru senada */}
      <p className="text-[#5da5e8] text-sm font-bold uppercase tracking-widest animate-pulse">
        Mohon Tunggu...
      </p>
    </div>
  );
}