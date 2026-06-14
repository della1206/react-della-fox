import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Akun untuk ${formData.name} berhasil didaftarkan secara simulasi! ✨`);
    navigate("/login");
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      {/* Logo & Judul Sambutan */}
      <div className="text-center mb-8">
        <div className="w-16 h-14 bg-gradient-to-tr from-[#5da5e8] to-[#4a8ecc] rounded-2xl flex items-center justify-center text-2xl shadow-md shadow-blue-200 mx-auto mb-4 transform hover:rotate-12 transition-transform duration-300">
          <span className="animate-spin" style={{ animationDuration: '6s' }}>🌀</span>
        </div>
        <h2 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
          Daftar Akun ✨
        </h2>
        <p className="text-gray-400 text-xs mt-2 font-medium">
          Lengkapi detail kredensial di bawah untuk bergabung ke ekosistem Berry Laundry.
        </p>
      </div>

      {/* Form Pendaftaran */}
      <form onSubmit={handleRegister} className="space-y-5">
        <div className="group">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#5da5e8] transition-colors">
            Nama Lengkap
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#5da5e8] transition-colors text-sm">📝</span>
            <input 
              type="text" 
              className="w-full pl-11 pr-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#5da5e8]/10 focus:border-[#5da5e8] transition-all outline-none text-xs font-semibold text-gray-700" 
              placeholder="Nama Lengkap Della"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="group">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#5da5e8] transition-colors">
            Alamat Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#5da5e8] transition-colors text-sm">✉️</span>
            <input 
              type="email" 
              className="w-full pl-11 pr-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#5da5e8]/10 focus:border-[#5da5e8] transition-all outline-none text-xs font-semibold text-gray-700" 
              placeholder="email@laundry.com" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="group">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#5da5e8] transition-colors">
            Kata Sandi Baru
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#5da5e8] transition-colors text-sm">🔒</span>
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full pl-11 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#5da5e8]/10 focus:border-[#5da5e8] transition-all outline-none text-xs font-semibold text-gray-700" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 text-xs font-bold focus:outline-none"
            >
              {showPassword ? "Sembunyikan" : "Intip"}
            </button>
          </div>
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] hover:from-[#4a8ecc] hover:to-[#3d7ab3] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200/50 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-xs uppercase tracking-wider mt-2 cursor-pointer">
          Buat Akun Anda &rarr;
        </button>
      </form>
    </div>
  );
}