import React from "react";
import { BsList, BsSearch, BsBell, BsGear, BsSliders } from "react-icons/bs";

export default function Header({ role, setRole, userActive, setUserActive }) {
  // FIX: Menggunakan data nama dari props global App.jsx, jika kosong pakai fallback default
  const namaTampilan = userActive || "Della Admin";

  // Fungsi interaktif untuk membersihkan sesi login (Logout)
  const handleLogout = () => {
    const siapLogout = window.confirm("Apakah Anda ingin keluar sistem dan membersihkan sesi login?");
    if (siapLogout) {
      localStorage.clear(); // Bersihkan semua data login termasuk status isLoggedIn
      if (setUserActive) setUserActive(""); // Reset state nama di App.jsx
      window.location.href = "/login"; // Kembalikan paksa ke halaman login utama
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md px-8 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      
      {/* Bagian Kiri: Toggle & Search Bar */}
      <div className="flex items-center space-x-6">
        <button className="p-3 bg-[#ede7f6] text-[#5e35b1] rounded-xl hover:bg-[#5e35b1] hover:text-white transition-all cursor-pointer">
          <BsList size={20} />
        </button>

        <div className="hidden md:flex items-center bg-[#f8faff] border border-gray-100 rounded-2xl px-4 py-2 w-80 group focus-within:border-[#b39ddb] focus-within:bg-white transition-all">
          <BsSearch className="text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Cari transaksi atau pelanggan..."
            className="bg-transparent border-none outline-none px-3 text-sm w-full text-gray-600 placeholder-gray-400 font-medium"
          />
          <button className="p-1.5 bg-[#ede7f6] text-[#5e35b1] rounded-lg hover:bg-[#d1c4e9] cursor-pointer">
            <BsSliders size={12} />
          </button>
        </div>
      </div>

      {/* Bagian Kanan: Role Switcher & Profil Operator Dinamis */}
      <div className="flex items-center space-x-4">
        {/* Switcher Role (Admin / Guest) */}
        <div className="flex bg-[#f5f5f5] p-1 rounded-xl border border-gray-200">
          <button 
            onClick={() => setRole("Admin")}
            className={`px-4 py-1.5 text-[10px] rounded-lg transition-all font-black uppercase tracking-wider cursor-pointer ${
              role === "Admin" 
                ? "bg-white text-[#5e35b1] shadow-sm" 
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Admin
          </button>
          <button 
            onClick={() => setRole("Guest")}
            className={`px-4 py-1.5 text-[10px] rounded-lg transition-all font-black uppercase tracking-wider cursor-pointer ${
              role === "Guest" 
                ? "bg-white text-[#5e35b1] shadow-sm" 
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Guest
          </button>
        </div>

        {/* Tombol Notifikasi */}
        <button className="p-3 bg-[#f8faff] text-gray-500 rounded-xl hover:bg-[#ede7f6] hover:text-[#5e35b1] transition-all relative cursor-pointer">
          <BsBell size={20} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-[#f44336] rounded-full border-2 border-white"></span>
        </button>

        {/* Profil Mini Interaktif: Dinamis Mengikuti Akun Login & Bisa Di-klik Untuk Logout */}
        <div 
          onClick={handleLogout}
          className="flex items-center space-x-3 bg-[#e3f2fd] pl-2 pr-4 py-1.5 rounded-full border border-[#bbdefb] hover:bg-red-50 hover:border-red-200 cursor-pointer transition-all group"
          title="Klik untuk keluar dari akun"
        >
          {/* Avatar Otomatis Berdasarkan Inisial Nama User */}
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-200 flex items-center justify-center">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(namaTampilan)}&background=5e35b1&color=fff`} 
              alt={namaTampilan}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Teks Nama Dinamis: Berubah seketika setelah login ulang */}
          <span className="text-xs font-bold text-gray-700 group-hover:text-red-600 transition-colors hidden sm:inline">
            {namaTampilan}
          </span>
          <BsGear className="text-[#1e88e5] group-hover:text-red-500 transition-colors" size={18} />
        </div>
      </div>
    </header>
  );
}