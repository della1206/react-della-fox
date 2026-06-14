import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../../services/userAPI"; // Pastikan path impor ini benar

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataForm, setDataForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // FIX MUTLAK: Menggunakan checkLogin (bukan loginCheck) agar sinkron dengan userAPI.js
      const result = await userAPI.checkLogin(dataForm.email);

      if (result.length > 0) {
        const userObj = result[0];

        // Validasi kecocokan password plaintext
        if (userObj.password === dataForm.password) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("activeUser", userObj.nama); 
          navigate("/dashboard");
        } else {
          alert("Maaf, Kata Sandi salah!");
        }
      } else {
        alert("Maaf, Username tidak ditemukan di database Supabase!");
      }
    } catch (err) {
      alert(`Terjadi masalah koneksi server: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* Ornamen Latar Belakang Estetik */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40 animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse pointer-events-none" />

      {/* Kontainer Utama Kartu Login Centered (Tanpa Banner Besar) */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-2xl border border-blue-50 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Logo & Judul Sambutan */}
        <div className="text-center mb-8">
          <div className="w-16 h-14 bg-gradient-to-tr from-[#5da5e8] to-[#4a8ecc] rounded-2xl flex items-center justify-center text-2xl shadow-md shadow-blue-200 mx-auto mb-4 transform hover:rotate-12 transition-transform duration-300">
            <span className="animate-spin" style={{ animationDuration: '6s' }}>🌀</span>
          </div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Halo Della! 👋
          </h2>
          <p className="text-gray-400 text-xs mt-2 font-medium">
            Selamat datang kembali. Silakan masuk menggunakan akun Supabase Anda.
          </p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Input Username */}
          <div className="group">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 group-focus-within:text-[#5da5e8] transition-colors">
              Username / Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#5da5e8] transition-colors text-sm">👤</span>
              <input
                type="text"
                disabled={loading}
                className="w-full pl-11 pr-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#5da5e8]/10 focus:border-[#5da5e8] transition-all outline-none text-xs font-semibold text-gray-700 disabled:opacity-50"
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
                disabled={loading}
                className="w-full pl-11 pr-12 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#5da5e8]/10 focus:border-[#5da5e8] transition-all outline-none text-xs font-semibold text-gray-700 disabled:opacity-50"
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
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] hover:from-[#4a8ecc] hover:to-[#3d7ab3] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200/50 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-xs uppercase tracking-wider mt-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Mohon Tunggu..." : "Masuk Manajemen →"}
          </button>
        </form>

        {/* Link Sambung Kembali Ke Halaman Register */}
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
    </div>
  );
}