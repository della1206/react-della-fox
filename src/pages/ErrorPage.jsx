import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage({ errorCode, title }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8">
      <h1 className="text-9xl font-black text-red-100">{errorCode}</h1>
      <h2 className="text-2xl font-bold text-slate-800 -mt-8 mb-4">{title}</h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Maaf, sepertinya terjadi kesalahan akses. Silakan hubungi tim IT BerryLaundry jika ini adalah masalah sistem.
      </p>
      <button 
        onClick={() => navigate("/dashboard")}
        className="px-8 py-3 bg-[#5e35b1] text-white rounded-xl font-bold shadow-lg hover:bg-[#4527a0] transition-all"
      >
        Kembali ke Dashboard
      </button>
    </div>
  );
}