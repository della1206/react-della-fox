import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BsSpeedometer2, BsClipboardData, BsPeople } from "react-icons/bs";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <BsSpeedometer2 /> },
    { name: "Orders", path: "/orders", icon: <BsClipboardData /> },
    { name: "Customers", path: "/customers", icon: <BsPeople /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-100 p-4 flex flex-col space-y-2">
      {/* Logo Section */}
      <div className="px-4 py-6 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-purple-600">Berry</span> Laundry
        </h1>
      </div>

      {/* Menu Label - Khas Template Berry */}
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">
        Dashboard
      </p>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive(item.path)
                ? "bg-purple-50 text-purple-600"
                : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
            }`}
          >
            <span className={`text-xl ${isActive(item.path) ? "text-purple-600" : "text-gray-500 group-hover:text-purple-600"}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Banner Upgrade/Laundry Info (Opsional - Mengikuti Gaya Berry) */}
      <div className="mt-auto p-4 bg-blue-50 rounded-2xl border border-blue-100">
        <p className="text-xs font-bold text-blue-800 mb-1">Butuh Bantuan?</p>
        <p className="text-[10px] text-blue-600 mb-3">Hubungi admin IT jika terjadi kendala mesin.</p>
        <button className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-blue-700 transition">
          Bantuan
        </button>
      </div>
    </div>
  );
}