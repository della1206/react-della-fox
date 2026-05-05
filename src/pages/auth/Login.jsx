import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataForm.email === "della" && dataForm.password === "dellapass") {
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      alert("Maaf Della, Username atau Password salah!");
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-800">Halo Della! 👋</h2>
        <p className="text-gray-400 text-sm mt-1">Silakan masuk untuk mengelola transaksi.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Username</label>
          <input
            type="text"
            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#5da5e8]/20 focus:border-[#5da5e8] transition-all outline-none text-sm"
            placeholder="Masukkan username"
            onChange={(e) => setDataForm({...dataForm, email: e.target.value})}
            required
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <label className="block text-xs font-bold text-gray-500 uppercase">Kata Sandi</label>
            <span onClick={() => navigate("/forgot")} className="text-[#5da5e8] text-xs font-bold cursor-pointer">Lupa Sandi?</span>
          </div>
          <input
            type="password"
            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#5da5e8]/20 focus:border-[#5da5e8] transition-all outline-none text-sm"
            placeholder="********"
            onChange={(e) => setDataForm({...dataForm, password: e.target.value})}
            required
          />
        </div>

        <button className="w-full bg-[#5da5e8] hover:bg-[#4a8ecc] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#5da5e8]/30">
          Masuk Sekarang
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-gray-500">
        Belum punya akun? <span onClick={() => navigate("/register")} className="text-[#5da5e8] font-bold cursor-pointer hover:underline">Daftar Akun</span>
      </p>
    </div>
  );
}