import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    // 'flex' di sini memastikan Sidebar dan Main Content berjejer ke samping
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden font-sans">
      
      {/* 1. SIDEBAR: Berikan lebar tetap (misal w-64) agar tidak mengecil */}
      <div className="w-64 flex-shrink-0 border-r border-gray-100 bg-white">
        <Sidebar />
      </div>

      {/* 2. AREA KANAN: Gunakan flex-1 agar mengambil sisa ruang yang ada */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER / NAVBAR MANUAL (Supaya tidak error import) */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 flex-shrink-0">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Dashboard Utama</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-600">Della Admin</span>
            <div className="w-8 h-8 bg-[#5da5e8] rounded-full shadow-sm"></div>
          </div>
        </header>

        {/* 3. AREA KONTEN (DASHBOARD): Berikan overflow-y-auto agar bisa di-scroll */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Outlet adalah tempat Dashboard.jsx muncul */}
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}