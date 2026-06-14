import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    alamat: "",
    jenisLaundry: "Cuci Lipat",
    berat: "1",
    catatan: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Price list
  const priceList = {
    "Cuci Lipat": 6000,
    "Cuci Setrika": 8000,
    "Dry Cleaning": 15000
  };

  // Track scroll for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate estimated price
  useEffect(() => {
    const price = priceList[formData.jenisLaundry] * parseInt(formData.berat || 0);
    setEstimatedPrice(price);
  }, [formData.jenisLaundry, formData.berat]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert(`✨ Pesanan atas nama ${formData.nama} berhasil dibuat! ✨\n\n📦 Total: Rp ${estimatedPrice.toLocaleString()}\n🚀 Kurir Berry Laundry akan segera meluncur ke lokasi Anda.\n\nTerima kasih telah mempercayakan cucian Anda kepada kami! 💙`);
    setIsSubmitting(false);
    navigate("/");
  };

  const getParallaxStyle = (speed, direction = 1) => ({
    transform: `translateY(${scrollY * speed * direction}px)`
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-sans relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Floating Orbs with Parallax */}
      <div className="fixed top-20 left-10 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-20 pointer-events-none" style={getParallaxStyle(0.03, -1)} />
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-20 pointer-events-none" style={getParallaxStyle(0.05, 1)} />
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-10 pointer-events-none" style={getParallaxStyle(0.02, -1)} />

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-20 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-blue-100 text-gray-600 hover:text-[#5da5e8] transition-all duration-300 flex items-center gap-2 text-sm font-medium group hover:scale-105 hover:-translate-x-1"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full">
          {/* Animated Badge */}
          <div className="text-center mb-6 animate-slideInDown">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4 shadow-sm">
              <span className="text-sm animate-pulse">🚀</span>
              <span className="text-xs font-bold text-[#5da5e8] uppercase tracking-wider">Gratis Ongkir!</span>
              <span className="text-sm animate-pulse">✨</span>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-100 overflow-hidden transform transition-all duration-500 hover:shadow-3xl animate-slideInUp">
            {/* Card Header with Wave Decoration */}
            <div className="relative bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] px-6 py-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10 text-center">
                <div className="text-5xl mb-3 animate-bounce inline-block">🌀</div>
                <h2 className="text-3xl font-black tracking-tight">Formulir Pesanan</h2>
                <p className="text-blue-100 text-sm mt-2 flex items-center justify-center gap-2">
                  <span>🏠</span> Gratis Penjemputan & Pengantaran 
                  <span>🎉</span>
                </p>
              </div>
              
              {/* Wave SVG */}
              <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 48L60 44C120 40 240 32 360 32C480 32 600 40 720 42C840 44 960 40 1080 36C1200 32 1320 28 1380 26L1440 24V48H1380C1320 48 1200 48 1080 48C960 48 840 48 720 48C600 48 480 48 360 48C240 48 120 48 60 48H0Z" fill="white"/>
              </svg>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Nama Field */}
              <div className="group transform transition-all duration-300 hover:translate-x-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-2 group-focus-within:text-[#5da5e8] transition-colors">
                  <span>👤</span> Nama Lengkap
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'nama' ? 'scale-105' : ''}`}>
                  <input
                    type="text"
                    name="nama"
                    required
                    value={formData.nama}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('nama')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#5da5e8] focus:bg-white text-sm transition-all duration-300"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                  <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-focus-within:border-[#5da5e8] transition-all duration-300"></div>
                </div>
              </div>

              {/* Telepon Field */}
              <div className="group transform transition-all duration-300 hover:translate-x-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-2">
                  <span>📱</span> No. WhatsApp
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'telepon' ? 'scale-105' : ''}`}>
                  <input
                    type="tel"
                    name="telepon"
                    required
                    value={formData.telepon}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('telepon')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#5da5e8] focus:bg-white text-sm transition-all duration-300"
                    placeholder="Contoh: 08123456789"
                  />
                </div>
              </div>

              {/* Alamat Field */}
              <div className="group transform transition-all duration-300 hover:translate-x-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-2">
                  <span>📍</span> Alamat Penjemputan
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'alamat' ? 'scale-105' : ''}`}>
                  <textarea
                    name="alamat"
                    required
                    rows="3"
                    value={formData.alamat}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('alamat')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#5da5e8] focus:bg-white text-sm resize-none transition-all duration-300"
                    placeholder="Alamat lengkap rumah/kantor/kos (termasuk patokan)"
                  ></textarea>
                </div>
              </div>

              {/* Layanan & Berat Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-2">
                    <span>🧺</span> Layanan
                  </label>
                  <select
                    name="jenisLaundry"
                    value={formData.jenisLaundry}
                    onChange={handleChange}
                    className="w-full px-3 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#5da5e8] text-sm transition-all duration-300 cursor-pointer hover:bg-white"
                  >
                    <option value="Cuci Lipat">🧺 Cuci Lipat (Rp 6.000/kg)</option>
                    <option value="Cuci Setrika">👔 Cuci Setrika (Rp 8.000/kg)</option>
                    <option value="Dry Cleaning">👗 Dry Cleaning (Rp 15.000/kg)</option>
                  </select>
                </div>
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-2">
                    <span>⚖️</span> Berat (Kg)
                  </label>
                  <input
                    type="number"
                    name="berat"
                    min="1"
                    max="50"
                    required
                    value={formData.berat}
                    onChange={handleChange}
                    className="w-full px-3 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#5da5e8] text-sm transition-all duration-300"
                  />
                </div>
              </div>

              {/* Estimated Price Card */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100 transform transition-all duration-300 hover:scale-105">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="text-xs text-gray-500">Estimasi Harga</p>
                      <p className="text-[10px] text-gray-400">*belum termasuk promo</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 line-through">Rp {(estimatedPrice * 1.1).toLocaleString()}</p>
                    <p className="text-2xl font-black text-[#5da5e8]">Rp {estimatedPrice.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-blue-200">
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>💰 Harga/kg: Rp {priceList[formData.jenisLaundry].toLocaleString()}</span>
                    <span>⚡ Hemat 10%</span>
                  </div>
                </div>
              </div>

              {/* Catatan Field */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5 flex items-center gap-2">
                  <span>📝</span> Catatan (Opsional)
                </label>
                <input
                  type="text"
                  name="catatan"
                  value={formData.catatan}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#5da5e8] focus:bg-white text-sm transition-all duration-300"
                  placeholder="Contoh: Pisahkan baju luntur / laundry tanpa pewangi"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 group flex items-center justify-center gap-2"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  Kembali
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] hover:from-[#4a8ecc] hover:to-[#3d7ab3] text-white rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Memproses...
                    </>
                  ) : (
                    <>
                      Pesan Sekarang
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </button>
              </div>

              {/* Promo Banner */}
              <div className="mt-4 text-center">
                <p className="text-[10px] text-gray-400 flex items-center justify-center gap-2">
                  <span>✨</span> Gratis antar-jemput untuk pesanan di atas 5kg 
                  <span>✨</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInDown {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slideInDown { animation: slideInDown 0.6s ease-out; }
        .animate-slideInUp { animation: slideInUp 0.6s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-bounce { animation: bounce 2s ease-in-out infinite; }
        .animate-spin { animation: spin 1s linear infinite; }
        .hover\\:shadow-3xl:hover { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
      `}</style>
    </div>
  );
}