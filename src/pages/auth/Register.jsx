import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Daftar Akun Baru ✨</h2>
        <p className="text-gray-400 text-sm mt-1">Lengkapi data untuk bergabung dengan kami.</p>
      </div>

      <form className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nama Lengkap</label>
          <input type="text" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#5da5e8]/20 focus:border-[#5da5e8] outline-none text-sm" placeholder="Nama Lengkap Della" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Alamat Email</label>
          <input type="email" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#5da5e8]/20 focus:border-[#5da5e8] outline-none text-sm" placeholder="email@laundry.com" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Kata Sandi Baru</label>
          <input type="password" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#5da5e8]/20 focus:border-[#5da5e8] outline-none text-sm" placeholder="********" />
        </div>

        <button className="w-full bg-[#5da5e8] hover:bg-[#4a8ecc] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#5da5e8]/30">
          Daftar Sekarang
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-gray-500">
        Sudah punya akun? <span onClick={() => navigate("/login")} className="text-[#5da5e8] font-bold cursor-pointer hover:underline">Masuk Di Sini</span>
      </p>
    </div>
  );
}