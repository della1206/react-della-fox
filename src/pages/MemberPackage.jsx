import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MemberPackage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPaket, setSelectedPaket] = useState(null);
  
  const activeMember = localStorage.getItem("activeMember") || "Member";

  const tiers = [
    {
      name: "Silver",
      price: "Rp 35.000",
      period: "/bulan",
      color: "from-gray-400 to-gray-600",
      features: ["Cuci lipat reguler (2-3 hari)", "Maksimal 7 kg / bulan", "Antar jemput standar"],
    },
    {
      name: "Reguler",
      price: "Rp 50.000",
      period: "/bulan",
      color: "from-gray-500 to-gray-700",
      features: ["Cuci setrika reguler (3-4 hari)", "Maksimal 10 kg / bulan", "Antar jemput standar"],
    },
    {
      name: "Premium",
      price: "Rp 120.000",
      period: "/bulan",
      color: "from-blue-500 to-blue-700",
      features: ["Cuci kilat express (1 hari)", "Maksimal 30 kg / bulan", "Gratis antar jemput prioritas", "Parfum premium khusus"],
      popular: true
    },
    {
      name: "Gold",
      price: "Rp 250.000",
      period: "/bulan",
      color: "from-amber-500 to-amber-700",
      features: ["Cuci super express (6 jam)", "Kuota tanpa batas (Unlimited)", "Antar jemput VIP kapan saja", "Treatment khusus jas & bedcover", "Asuransi kerusakan pakaian"],
    }
  ];

  const handleSelectPackage = (packageName, price) => {
    // Redirect ke halaman konfirmasi dengan data paket yang dipilih
    navigate("/member-confirmation", {
      state: {
        packageName: packageName,
        price: price
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isMemberLoggedIn");
    localStorage.removeItem("activeMember");
    localStorage.removeItem("memberEmail");
    localStorage.removeItem("memberId");
    localStorage.removeItem("memberPaket");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12 pb-4 border-b border-gray-100 flex-wrap gap-4">
          <h1 className="text-2xl font-black text-gray-800">Berry<span className="text-purple-600">Member</span>.</h1>
          <div className="flex gap-3">
            <span className="text-sm font-bold text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
              Halo, 👋 {activeMember}
            </span>
            <button 
              onClick={() => navigate("/")} 
              className="text-xs px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
            >
              Beranda
            </button>
            <button 
              onClick={handleLogout} 
              className="text-xs px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
            >
              Keluar Sesi
            </button>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">Pilih Paket Langganan Member Anda ✨</h2>
          <p className="text-gray-400 text-sm md:text-base mt-3">
            Pilih paket yang sesuai dengan kebutuhan Anda. Klik tombol di bawah untuk melanjutkan ke konfirmasi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, idx) => (
            <div key={idx} className={`bg-white rounded-2xl p-6 shadow-lg relative transition-all hover:-translate-y-2 hover:shadow-xl ${tier.popular ? 'border-2 border-blue-400 scale-105' : ''}`}>
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-4 py-1.5 rounded-full font-bold shadow-md">
                  ⭐ Paling Populer
                </span>
              )}
              <h3 className="text-2xl font-bold text-gray-800">{tier.name}</h3>
              <div className="my-4">
                <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                <span className="text-gray-400 text-sm">{tier.period}</span>
              </div>
              <ul className="space-y-2 mb-6 min-h-[160px]">
                {tier.features.map((f, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleSelectPackage(tier.name, tier.price)}
                className={`w-full py-3 rounded-xl text-white font-bold bg-gradient-to-r ${tier.color} hover:opacity-90 transition-all transform hover:scale-105`}
              >
                Pilih Paket {tier.name}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400">Bergabunglah bersama ribuan pelanggan puas lainnya! 🧺💙</p>
        </div>
      </div>
    </div>
  );
}