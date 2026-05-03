import React from "react";
import { BsList, BsSearch, BsBell, BsGear, BsSliders } from "react-icons/bs";

export default function Header({ role, setRole }) {
  return (
    <header className="bg-white px-6 py-3 flex flex-col space-y-3 border-b border-gray-100 sticky top-0 z-10 shadow-sm">
      
      {/* Baris Pertama: Tombol Switch Role (Admin & Guest) */}
      <div className="flex justify-between items-center py-1">
        <h1 className="font-extrabold text-sm text-purple-600 uppercase tracking-widest">
          BerryLaundry
        </h1>
        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 shadow-inner">
          <button 
            onClick={() => setRole("Admin")}
            className={`px-6 py-1.5 text-[11px] rounded-lg transition-all duration-200 uppercase font-black ${
              role === "Admin" 
                ? "bg-purple-600 text-white shadow-lg shadow-purple-200" 
                : "text-gray-500 hover:text-purple-600"
            }`}
          >
            Admin
          </button>
          <button 
            onClick={() => setRole("Guest")}
            className={`px-6 py-1.5 text-[11px] rounded-lg transition-all duration-200 uppercase font-black ${
              role === "Guest" 
                ? "bg-purple-600 text-white shadow-lg shadow-purple-200" 
                : "text-gray-500 hover:text-purple-600"
            }`}
          >
            Guest
          </button>
        </div>
      </div>

      {/* Baris Kedua: Elemen Visual Berry (Search & Profile) */}
      <div className="flex items-center justify-between pt-1">
        
        {/* Bagian Kiri: Menu & Search */}
        <div className="flex items-center space-x-4">
          {/* Button Menu Toggle (Ungu Muda) */}
          <button className="p-2.5 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition-all">
            <BsList size={20} />
          </button>

          {/* Search Bar ala Berry */}
          <div className="hidden md:flex items-center bg-white border border-gray-100 rounded-xl px-4 py-1.5 w-72 lg:w-96 group focus-within:border-purple-400 transition-all shadow-sm">
            <BsSearch className="text-gray-300" size={14} />
            <input
              type="text"
              placeholder="Search here. . ."
              className="bg-transparent border-none outline-none px-3 py-1.5 text-xs w-full text-gray-600 placeholder-gray-400"
            />
            {/* Tombol Filter di ujung Search */}
            <button className="p-1.5 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
              <BsSliders size={12} />
            </button>
          </div>
        </div>

        {/* Bagian Kanan: Notifikasi & Profil User */}
        <div className="flex items-center space-x-3">
          {/* Notifikasi Lonceng */}
          <button className="p-2.5 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-all relative">
            <BsBell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Profil User (Pill Shape ala Berry) */}
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 hover:bg-blue-100 cursor-pointer transition-all shadow-sm">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
               <img
                src="img/dellaaa.JPG" 
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <BsGear className="text-blue-600" size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}
