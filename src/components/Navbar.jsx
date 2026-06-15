import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ activeSection, onNavClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Beranda", id: "beranda" },
    { name: "Fitur", id: "keunggulan" },
    { name: "Layanan", id: "layanan" },
    { name: "Artikel", id: "artikel" },
    { name: "Testimonial", id: "testimonial" },
    { name: "Kontak", id: "kontak" },
    { name: "Cek Status", id: "cek-status" }
  ];

  const handleItemClick = (e, id) => {
    // Jika sedang tidak di halaman guest (/) dan menu diklik, arahkan dulu ke halaman utama baru scroll
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate(`/#${id}`);
    } else if (onNavClick) {
      onNavClick(e, id);
    }
  };

  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-40 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto rounded-full mt-4 border border-blue-100 transition-all duration-300 hover:shadow-lg">
      
      {/* Logo Group */}
      <div 
        onClick={() => navigate("/")} 
        className="flex items-center gap-2 font-black text-xl text-[#5da5e8] tracking-tight transform hover:scale-105 transition-all duration-300 cursor-pointer group"
      >
        <span className="inline-block group-hover:rotate-12 transition-transform duration-300">🌀</span> 
        <span className="bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] bg-clip-text text-transparent">Berry Laundry</span>
      </div>
      
      {/* Menu Navigasi Tengah dengan Fitur Scroll Anchor */}
      <div className="hidden md:flex gap-6 font-medium">
        {navItems.map((item, idx) => (
          <a 
            key={idx}
            href={location.pathname === "/" ? `#${item.id}` : `/#${item.id}`}
            onClick={(e) => handleItemClick(e, item.id)}
            className={`relative group transition-all duration-300 transform hover:scale-110 cursor-pointer ${
              location.pathname === "/" && activeSection === item.id 
                ? 'text-[#5da5e8] font-bold' 
                : 'text-gray-600 hover:text-[#5da5e8]'
            }`}
          >
            {item.name}
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] transition-all duration-300 ${
              location.pathname === "/" && activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </a>
        ))}
      </div>
      
      {/* Bagian Tombol Kanan */}
      <div className="flex gap-4 items-center">
        {/* Tombol Masuk Admin */}
        <button 
          onClick={() => navigate("/login")} 
          className="font-bold text-gray-600 hover:text-[#5da5e8] text-sm transition-all duration-300 cursor-pointer transform hover:scale-110 active:scale-95 group"
        >
          <span className="relative">
            Masuk
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5da5e8] transition-all duration-300 group-hover:w-full"></span>
          </span>
        </button>
        
        {/* FIX MUTLAK: Klik tombol ini langsung memisahkan user menuju Login Member khusus */}
        <button 
          onClick={() => navigate("/login-member")} 
          className="bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] hover:from-[#4a8ecc] hover:to-[#3d7ab3] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-md shadow-blue-100 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          Pesan Sekarang &rarr;
        </button>
      </div>
    </nav>
  );
}