import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MemberConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  
  // Ambil data paket yang dipilih dari location state
  useEffect(() => {
    if (location.state && location.state.packageName) {
      setSelectedPackage(location.state);
    } else {
      alert("Silakan pilih paket terlebih dahulu!");
      navigate("/member-package");
    }
  }, [location, navigate]);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    noHp: "",
    alamat: "",
    password: "",
    confirmPassword: "",
    metodePembayaran: "transfer",
    catatan: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Konfirmasi Password tidak sama!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    if (!formData.nama || !formData.email || !formData.noHp || !formData.alamat) {
      alert("Semua field wajib diisi!");
      return;
    }

    // Tampilkan informasi pembayaran
    setShowPaymentInfo(true);
  };

  const handlePaymentConfirm = () => {
    setLoading(true);

    setTimeout(() => {
      // Simpan data member ke localStorage
      const members = JSON.parse(localStorage.getItem("members") || "[]");
      
      const emailExists = members.some(m => m.email === formData.email);
      if (emailExists) {
        alert("Email sudah terdaftar! Silakan gunakan email lain.");
        setLoading(false);
        return;
      }

      const newMember = {
        id: Date.now(),
        nama: formData.nama,
        email: formData.email,
        noHp: formData.noHp,
        alamat: formData.alamat,
        password: formData.password,
        paket: selectedPackage?.packageName || "Reguler",
        harga: selectedPackage?.price || "Rp 50.000",
        metodePembayaran: formData.metodePembayaran,
        catatan: formData.catatan,
        status: "aktif",
        createdAt: new Date().toISOString()
      };

      members.push(newMember);
      localStorage.setItem("members", JSON.stringify(members));
      
      localStorage.setItem("isMemberLoggedIn", "true");
      localStorage.setItem("activeMember", formData.nama);
      localStorage.setItem("memberEmail", formData.email);
      localStorage.setItem("memberId", newMember.id);
      localStorage.setItem("memberPaket", selectedPackage?.packageName || "Reguler");

      alert(`🎉 Selamat! Anda telah berhasil mendaftar sebagai member ${selectedPackage?.packageName || "Reguler"}.\n\nTerima kasih telah bergabung dengan Berry Laundry!`);
      
      setLoading(false);
      
      navigate("/member-success", { 
        state: { 
          memberName: formData.nama,
          packageName: selectedPackage?.packageName || "Reguler"
        }
      });
    }, 2000);
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    );
  }

  // Jika showPaymentInfo true, tampilkan informasi pembayaran
  if (showPaymentInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">
                {formData.metodePembayaran === "qris" ? "📱" : "🏦"}
              </div>
              <h2 className="text-2xl font-black text-gray-900">
                {formData.metodePembayaran === "qris" ? "Pembayaran Via QRIS" : "Pembayaran Via Transfer Bank"}
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                {formData.metodePembayaran === "qris" 
                  ? "Scan QR Code di bawah untuk melakukan pembayaran" 
                  : "Transfer ke rekening berikut untuk menyelesaikan pendaftaran"}
              </p>
              <div className="mt-3 inline-block bg-blue-50 px-4 py-2 rounded-full">
                <span className="text-sm font-bold text-[#5da5e8]">
                  {selectedPackage.packageName} - {selectedPackage.price}
                </span>
              </div>
            </div>

          {/* QRIS */}
            {formData.metodePembayaran === "qris" && (
            <div className="mb-6">
                <div className="bg-gray-50 rounded-2xl p-6 text-center border-2 border-dashed border-blue-200">
                <div className="flex justify-center">
                    <div className="w-96 h-96 bg-white rounded-xl shadow-lg flex items-center justify-center border-2 border-gray-200 p-4">
                    <div className="w-full h-full bg-blue-50 rounded-lg flex items-center justify-center border-2 border-blue-200 overflow-hidden relative">
                        <img 
                        src="/qris-della.jpg" 
                        alt="QRIS"
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            const parent = e.target.parentElement;
                            parent.innerHTML = `
                            <div class="text-center p-4 w-full">
                                <div class="text-8xl mb-3">💳</div>
                                <p class="text-sm font-bold text-gray-700">QRIS</p>
                                <div class="mt-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                                <p class="text-[10px] text-gray-600">
                                    ⚠️ Gambar QRIS belum diupload.<br/>
                                    Simpan gambar dengan nama <strong>qris-della.jpg</strong><br/>
                                    di folder <strong>public/</strong>
                                </p>
                                </div>
                            </div>
                            `;
                        }}
                        />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )}
            

            {/* Transfer Bank */}
            {formData.metodePembayaran === "transfer" && (
              <div className="mb-6">
                <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-blue-200">
                  <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      BRI
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Bank Rakyat Indonesia (BRI)</p>
                      <p className="text-xl font-bold text-gray-800">7013 0102 7676 531</p>
                      <p className="text-xs text-gray-500">a.n. Della Marcelina</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                  </div>
                </div>
              </div>
            )}

            {/* Cash */}
            {formData.metodePembayaran === "cash" && (
              <div className="mb-6">
                <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-blue-200 text-center">
                  <div className="text-5xl mb-4">💰</div>
                  <h3 className="font-bold text-gray-800">Bayar Tunai di Tempat</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Silakan datang ke outlet Berry Laundry untuk melakukan pembayaran tunai.
                  </p>
                  <div className="mt-4 p-3 bg-yellow-50 rounded-xl">
                    <p className="text-xs text-gray-600">
                      📍 Jl. Umban Sari Atas, Kelurahan Umban Sari, <br />
                      Kecamatan Rumbai, Kota Pekanbaru, Riau 28266
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Informasi Member */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs font-bold text-gray-600 mb-2">📋 Data Member:</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <div><span className="font-medium">Nama:</span> {formData.nama}</div>
                <div><span className="font-medium">Email:</span> {formData.email}</div>
                <div><span className="font-medium">No HP:</span> {formData.noHp}</div>
                <div><span className="font-medium">Paket:</span> {selectedPackage.packageName}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowPaymentInfo(false)}
                className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-all"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={handlePaymentConfirm}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-sm hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  "Saya Sudah Bayar ✅"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">📝</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900">Konfirmasi Pendaftaran Member</h2>
          <p className="text-gray-400 text-sm mt-2">
            Lengkapi data diri Anda untuk menyelesaikan pendaftaran paket <span className="font-bold text-[#5da5e8]">{selectedPackage.packageName}</span>
          </p>
          <div className="mt-2 inline-block bg-blue-50 px-4 py-2 rounded-full">
            <span className="text-sm font-bold text-[#5da5e8]">
              Paket: {selectedPackage.packageName} - {selectedPackage.price}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Nama Lengkap */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm focus:border-[#5da5e8] focus:ring-2 focus:ring-blue-100 transition-all"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm focus:border-[#5da5e8] focus:ring-2 focus:ring-blue-100 transition-all"
                placeholder="email@example.com"
              />
            </div>

            {/* No Handphone */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Nomor Handphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="noHp"
                value={formData.noHp}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm focus:border-[#5da5e8] focus:ring-2 focus:ring-blue-100 transition-all"
                placeholder="0812-3456-7890"
              />
            </div>

            {/* Alamat */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm focus:border-[#5da5e8] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                placeholder="Masukkan alamat lengkap Anda (jalan, kelurahan, kecamatan, kota)"
              />
            </div>


            {/* Metode Pembayaran */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Metode Pembayaran <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { value: "transfer", label: "Transfer Bank", icon: "🏦", desc: "BRI" },
                  { value: "qris", label: "QRIS", icon: "📱", desc: "Scan QR Code" },
                  { value: "cash", label: "Cash", icon: "💰", desc: "Bayar di Tempat" },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.metodePembayaran === method.value
                        ? "border-[#5da5e8] bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="metodePembayaran"
                      value={method.value}
                      checked={formData.metodePembayaran === method.value}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="text-3xl">{method.icon}</span>
                    <span className="text-sm font-bold text-gray-700">{method.label}</span>
                    <span className="text-[10px] text-gray-400">{method.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Catatan */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Catatan Tambahan
              </label>
              <textarea
                name="catatan"
                value={formData.catatan}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm focus:border-[#5da5e8] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                placeholder="Catatan khusus untuk paket Anda (opsional)"
              />
            </div>
          </div>

          {/* Tombol Submit */}
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/member-package")}
              className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-all"
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] text-white font-bold text-sm hover:from-[#4a8ecc] hover:to-[#3d7ab3] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              Lanjut ke Pembayaran →
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-[10px] text-gray-500 text-center">
            🔒 Data Anda aman dan tidak akan disalahgunakan. 
            Dengan mendaftar, Anda menyetujui Syarat & Ketentuan Berry Laundry.
          </p>
        </div>
      </div>
    </div>
  );
}