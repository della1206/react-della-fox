import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterMember() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    noHp: "",
    alamat: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi form
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Konfirmasi Password tidak sama!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    if (!formData.nama || !formData.email || !formData.username) {
      alert("Nama, Email, dan Username wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      // Ambil data member yang sudah terdaftar dari localStorage
      const existingMembers = JSON.parse(localStorage.getItem("members") || "[]");
      
      // Cek apakah email sudah terdaftar
      const emailExists = existingMembers.some(member => member.email === formData.email);
      if (emailExists) {
        alert("Email sudah terdaftar! Silakan gunakan email lain.");
        setLoading(false);
        return;
      }

      // Cek apakah username sudah terdaftar
      const usernameExists = existingMembers.some(member => member.username === formData.username);
      if (usernameExists) {
        alert("Username sudah terdaftar! Silakan gunakan username lain.");
        setLoading(false);
        return;
      }

      // Buat member baru (TANPA paket - nanti pilih setelah login)
      const newMember = {
        id: Date.now(),
        nama: formData.nama,
        email: formData.email,
        username: formData.username,
        password: formData.password, // Simpan plain text dulu (nanti bisa dihash)
        noHp: formData.noHp || "",
        alamat: formData.alamat || "",
        paket: null, // Belum memilih paket
        status: "active",
        createdAt: new Date().toISOString()
      };

      existingMembers.push(newMember);
      localStorage.setItem("members", JSON.stringify(existingMembers));
      
      alert(`Selamat! Akun ${formData.nama} berhasil didaftarkan.\n\nSilakan login untuk memilih paket langganan Anda.`);
      
      // Redirect ke halaman login member
      navigate("/login-member");
      
    } catch (error) {
      alert(`Terjadi kesalahan: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 font-sans py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-blue-50">
        <button 
          onClick={() => navigate("/login-member")}
          className="mb-4 flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors text-sm"
        >
          ← Kembali ke Login
        </button>

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌀</div>
          <h2 className="text-2xl font-black text-gray-800">Daftar Member Baru</h2>
          <p className="text-gray-400 text-xs mt-2 font-medium">
            Bergabunglah bersama Berry Laundry dan nikmati berbagai keuntungan member!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="contoh: nama@email.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Masukkan username unik Anda"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Nomor Handphone
            </label>
            <input
              type="tel"
              name="noHp"
              value={formData.noHp}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="0812-3456-7890"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Alamat
            </label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
              placeholder="Masukkan alamat lengkap Anda"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Minimal 6 karakter"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Konfirmasi Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Ketik ulang password Anda"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-0.5 w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-[10px] text-gray-500">
              Saya menyetujui <span className="text-blue-500 cursor-pointer hover:underline">Syarat dan Ketentuan</span> serta 
              <span className="text-blue-500 cursor-pointer hover:underline"> Kebijakan Privasi</span> Berry Laundry
            </label>
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
                Memproses Pendaftaran...
              </span>
            ) : (
              "Daftar Member Sekarang →"
            )}
          </button>
        </form>

        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <p className="text-[11px] font-bold text-gray-700 text-center mb-3">✨ Keuntungan Menjadi Member Berry Laundry ✨</p>
          <div className="grid grid-cols-2 gap-2 text-[9px] text-gray-600">
            <div className="flex items-center gap-1">✓ Diskon khusus member 10%</div>
            <div className="flex items-center gap-1">✓ Gratis antar jemput</div>
            <div className="flex items-center gap-1">✓ Poin reward setiap transaksi</div>
            <div className="flex items-center gap-1">✓ Akses prioritas layanan</div>
            <div className="flex items-center gap-1">✓ Voucher ulang tahun</div>
            <div className="flex items-center gap-1">✓ Free parfum premium</div>
          </div>
        </div>
      </div>
    </div>
  );
}