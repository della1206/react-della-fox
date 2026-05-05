import React from "react";
import { BsList, BsSearch, BsBell, BsGear, BsSliders } from "react-icons/bs";

export default function Header({ role, setRole }) {
  return (
    <header className="bg-white/80 backdrop-blur-md px-8 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      
      {/* Bagian Kiri: Toggle & Search */}
      <div className="flex items-center space-x-6">
        <button className="p-3 bg-[#ede7f6] text-[#5e35b1] rounded-xl hover:bg-[#5e35b1] hover:text-white transition-all">
          <BsList size={20} />
        </button>

        <div className="hidden md:flex items-center bg-[#f8faff] border border-gray-100 rounded-2xl px-4 py-2 w-80 group focus-within:border-[#b39ddb] focus-within:bg-white transition-all">
          <BsSearch className="text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Cari transaksi atau pelanggan..."
            className="bg-transparent border-none outline-none px-3 text-sm w-full text-gray-600 placeholder-gray-400 font-medium"
          />
          <button className="p-1.5 bg-[#ede7f6] text-[#5e35b1] rounded-lg hover:bg-[#d1c4e9]">
            <BsSliders size={12} />
          </button>
        </div>
      </div>

      {/* Bagian Kanan: Role Switch & Profile */}
      <div className="flex items-center space-x-4">
        {/* Switcher Role */}
        <div className="flex bg-[#f5f5f5] p-1 rounded-xl border border-gray-200">
          <button 
            onClick={() => setRole("Admin")}
            className={`px-4 py-1.5 text-[10px] rounded-lg transition-all font-black uppercase tracking-wider ${
              role === "Admin" 
                ? "bg-white text-[#5e35b1] shadow-sm" 
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Admin
          </button>
          <button 
            onClick={() => setRole("Guest")}
            className={`px-4 py-1.5 text-[10px] rounded-lg transition-all font-black uppercase tracking-wider ${
              role === "Guest" 
                ? "bg-white text-[#5e35b1] shadow-sm" 
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Guest
          </button>
        </div>

        {/* Notifikasi */}
        <button className="p-3 bg-[#f8faff] text-gray-500 rounded-xl hover:bg-[#ede7f6] hover:text-[#5e35b1] transition-all relative">
          <BsBell size={20} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-[#f44336] rounded-full border-2 border-white"></span>
        </button>

        {/* Profil Mini */}
        <div className="flex items-center space-x-3 bg-[#e3f2fd] pl-2 pr-4 py-1.5 rounded-full border border-[#bbdefb] hover:bg-[#bbdefb]/50 cursor-pointer transition-all">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-200">
            <img
              src="https://ui-avatars.com/api/?name=Emily+Selman&background=5e35b1&color=fff" 
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <BsGear className="text-[#1e88e5]" size={18} />
        </div>
      </div>
    </header>
  );
}