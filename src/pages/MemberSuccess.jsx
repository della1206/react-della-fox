import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MemberSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { memberName, packageName } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-2xl font-black text-gray-900">Pendaftaran Berhasil!</h2>
        <p className="text-gray-500 text-sm mt-3">
          Selamat <span className="font-bold text-[#5da5e8]">{memberName}</span>! 
          Anda telah berhasil mendaftar paket <span className="font-bold text-[#5da5e8]">{packageName}</span>.
        </p>
        <div className="my-6 p-4 bg-green-50 rounded-xl">
          <p className="text-xs text-gray-600">
            ✅ Email konfirmasi telah dikirim ke email Anda
          </p>
          <p className="text-xs text-gray-600 mt-1">
            📱 Kami akan menghubungi Anda melalui WhatsApp dalam 1x24 jam
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5da5e8] to-[#4a8ecc] text-white font-bold text-sm hover:from-[#4a8ecc] hover:to-[#3d7ab3] transition-all shadow-md"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}