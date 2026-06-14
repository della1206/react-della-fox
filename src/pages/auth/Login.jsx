import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataForm.email === "della" && dataForm.password === "dellapass") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Maaf Della, Username atau Password salah!");
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      {/* Logo & Judul Sambutan */}
      <div className="text-center mb-8">
        <div className="w-16 h-14 bg-gradient-to-tr from-[#5da5e8] to-[#4a8ecc] rounded-2xl flex items-center justify-center text-2xl shadow-md shadow-blue-200 mx-auto mb-4 transform hover:rotate-12 transition-transform duration-300">
          <span className="animate-spin" style={{ animationDuration: '6s' }}>🌀</span>
        </div>
        <h2 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
          Halo Della! 👋
        </h2>
        <p className="text-gray-400 text-xs mt-2 font-medium">
          Selamat datang kembali. Silakan masuk untuk mengelola ekosistem transaksi Berry Laundry.
        </p>
      </div>

      {/* Form Login */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Input Username */}
        <div className="group">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#5da5e8] transition-colors">
            Username
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#5da5e8] transition-colors text-sm">👤</span>
            <input
              type="text"
              className="w-full pl-11 pr-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#5da5e8]/10 focus:border-[#5da5e8] transition-all outline-none text-xs font-semibold text-gray-700"
              placeholder="Masukkan username Anda"
              onChange={(e) => setDataForm({ ...dataForm, email: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Input Password */}
        <div className="group">
          <div className="flex justify-between mb-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider group-focus-within:text-[#5da5e8] transition-colors">
              Kata Sandi
            </label>
            <span onClick={() => navigate("/forgot")} className="text-[#5da5e8] text-[11px] font-bold cursor-pointer hover:text-[#4a8ecc] transition-colors">
              Lupa Sandi?
            </span>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#5da5e8] transition-colors text-sm">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-11 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#5da5e8]/10 focus:border-[#5da5e8] transition-all outline-none text-xs font-semibold text-gray-700"
              placeholder="••••••••"
              onChange={(e) => setDataForm({ ...dataForm, password: e.target.value })}
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

        {/* Tombol Masuk */}
        <button className="w-full bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] hover:from-[#4a8ecc] hover:to-[#3d7ab3] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200/50 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-xs uppercase tracking-wider mt-2 cursor-pointer">
          Masuk Manajemen &rarr;
        </button>
      </form>

      {/* FIX: Link Sambung ke Register Terpasang Cantik Kembali */}
      <div className="text-center mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 font-medium">
          Belum memiliki kredensial akun?{" "}
          <span 
            onClick={() => navigate("/register")} 
            className="text-[#5da5e8] font-bold cursor-pointer hover:text-[#4a8ecc] hover:underline transition-colors ml-0.5"
          >
            Daftar Akun Baru
          </span>
        </p>
      </div>

    </div>
  );
}