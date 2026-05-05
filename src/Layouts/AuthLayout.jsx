import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans">
      {/* SISI KIRI: Banner Visual - Warna Biru Fix */}
      <div className="hidden md:flex md:w-1/2 bg-[#5da5e8] relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-white/10 rounded-full"></div>
        
        <div className="relative z-10 text-white max-w-md">
          <h1 className="text-6xl font-black leading-tight mb-4">
            Berry <br /> Mulai Di Sini
          </h1>
          <p className="text-white/80 text-lg font-medium">
            Kelola bisnis laundry Anda dengan dashboard paling elegan dan kuat.
          </p>
        </div>
      </div>

      {/* SISI KANAN: Form Area */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-20 bg-[#f8faff]">
        <div className="w-full max-w-md">
          <div className="flex justify-center md:justify-start mb-10">
             <h1 className="text-3xl font-extrabold tracking-tighter text-gray-800">
               Berry<span className="text-[#5da5e8]">Laundry</span><span className="text-[#5da5e8]">.</span>
             </h1>
          </div>
          <Outlet />
          <p className="text-center md:text-left text-[11px] text-gray-400 mt-12 font-medium tracking-wide uppercase">
            © 2026 BERRYLAUNDRY ADMIN DASHBOARD. HAK CIPTA DILINDUNGI.
          </p>
        </div>
      </div>
    </div>
  );
}