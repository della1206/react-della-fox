import React from "react";

export default function Avatar({ name, size = "md" }) {
  // Menyesuaikan ukuran lingkaran avatar
  const sizes = { 
    sm: "w-8 h-8 text-xs", 
    md: "w-10 h-10 text-sm", 
    lg: "w-14 h-14 text-lg" 
  };

  return (
    <div className={`${sizes[size]} rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold uppercase shadow-sm flex-shrink-0`}>
      {name ? name.charAt(0) : "?"}
    </div>
  );
}