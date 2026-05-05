import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BsSpeedometer2, BsClipboardData, BsPeople } from "react-icons/bs";

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <BsSpeedometer2 /> },
    { name: "Orders", path: "/orders", icon: <BsClipboardData /> },
    { name: "Customers", path: "/customers", icon: <BsPeople /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-40">
      {/* Logo Section */}
      <div className="px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Berry<span className="text-[#5e35b1]">Laundry</span><span className="text-[#5e35b1]">.</span>
        </h1>
      </div>

      <div className="px-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4 mb-4">
          Menu Utama
        </p>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                isActive(item.path)
                  ? "bg-[#ede7f6] text-[#5e35b1]"
                  : "text-gray-600 hover:bg-[#f8faff] hover:text-[#5e35b1]"
              }`}
            >
              <span className={`text-xl ${isActive(item.path) ? "text-[#5e35b1]" : "text-gray-400 group-hover:text-[#5e35b1]"}`}>
                {item.icon}
              </span>
              <span className="font-semibold text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Banner Bantuan di Bawah Sidebar */}
      <div className="mt-auto p-6">
        <div className="bg-[#e3f2fd] rounded-[24px] p-5 border border-[#bbdefb]">
          <p className="text-sm font-bold text-[#1565c0] mb-1">Butuh Bantuan?</p>
          <p className="text-[11px] text-[#1e88e5] leading-relaxed mb-4">
            Hubungi tim IT jika terjadi kendala pada sistem.
          </p>
          <button className="w-full py-2.5 bg-[#2196f3] text-white text-[11px] font-bold rounded-xl shadow-md hover:bg-[#1e88e5] transition-all">
            PUSAT BANTUAN
          </button>
        </div>
      </div>
    </div>
  );
}