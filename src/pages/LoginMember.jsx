import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginMember({ setIsLoggedIn, onLoginSuccess }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataForm, setDataForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ambil data member dari localStorage
      const members = JSON.parse(localStorage.getItem("members") || "[]");
      
      // Cari member berdasarkan email atau username
      const foundMember = members.find(member => 
        (member.email === dataForm.email.trim() || member.username === dataForm.email.trim()) &&
        member.password === dataForm.password
      );
      
      if (foundMember) {
        // Cek apakah member sudah login sebelumnya
        if (foundMember.status === "active") {
          // SET STORAGE UNTUK MEMBER
          localStorage.setItem("isMemberLoggedIn", "true");
          localStorage.setItem("activeMember", foundMember.nama);
          localStorage.setItem("memberEmail", foundMember.email);
          localStorage.setItem("memberId", foundMember.id);
          localStorage.setItem("memberPaket", foundMember.paket || "Belum memilih");
          
          if (setIsLoggedIn) {
            setIsLoggedIn(true);
          }
          
          if (onLoginSuccess) {
            onLoginSuccess(foundMember.nama);
          }
          
          alert(`Selamat datang kembali, ${foundMember.nama}! 🎉`);
          
          // Redirect ke halaman pilih paket
          navigate("/member-package");
        } else {
          alert("Akun Anda sedang tidak aktif. Silakan hubungi admin.");
        }
      } else {
        alert("Email/Username atau Password salah! Silakan coba lagi atau daftar terlebih dahulu.");
      }
    } catch (error) {
      alert(`Terjadi kesalahan: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-blue-50">
        <button 
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors text-sm"
        >
          ← Kembali ke Beranda
        </button>

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌀</div>
          <h2 className="text-2xl font-black text-gray-800">Masuk Member Laundry</h2>
          <p className="text-gray-400 text-xs mt-2 font-medium">
            Masuk untuk memilih paket langganan favorit Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Username / Email
            </label>
            <input
              type="text"
              value={dataForm.email}
              disabled={loading}
              onChange={(e) => setDataForm({ ...dataForm, email: e.target.value })}
              className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Masukkan username atau email Anda"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={dataForm.password}
                disabled={loading}
                onChange={(e) => setDataForm({ ...dataForm, password: e.target.value })}
                className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Masukkan password Anda"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 text-sm"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg text-sm uppercase tracking-wider mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all transform hover:scale-[1.02]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              "Masuk & Pilih Paket →"
            )}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 font-medium">
            Belum punya akun member?{" "}
            <span 
              onClick={() => navigate("/register-member")}
              className="text-blue-500 font-bold cursor-pointer hover:underline ml-0.5"
            >
              Daftar Sekarang
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}