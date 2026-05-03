import React from "react";
// Import komponen grafik
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Dashboard({ role }) {
  // Data dummy untuk grafik batang (Tema Laundry)
  const dataGrafik = [
    { name: 'Jan', total: 400 },
    { name: 'Feb', total: 300 },
    { name: 'Mar', total: 500 },
    { name: 'Apr', total: 700 },
    { name: 'Mei', total: 600 },
    { name: 'Jun', total: 800 },
  ];

  // Data untuk Admin
  const adminStats = [
    { id: 1, name: "Pendapatan Hari Ini", value: "Rp 2.500.000", icon: "💰", color: "from-purple-600 to-purple-400" },
    { id: 2, name: "Total Orderan", value: "45 Nota", icon: "📝", color: "from-blue-600 to-blue-400" },
    { id: 3, name: "Pelanggan Baru", value: "12 Orang", icon: "👥", color: "from-blue-500 to-blue-300" },
    { id: 4, name: "Mesin Aktif", value: "8/10", icon: "⚙️", color: "from-cyan-600 to-cyan-400" },
  ];

  // Data untuk Guest
  const guestStats = [
    { id: 1, name: "Cucian Diproses", value: "2 Paket", icon: "🧺", color: "from-blue-600 to-blue-400" },
    { id: 2, name: "Saldo Deposit", value: "Rp 75.000", icon: "💳", color: "from-purple-600 to-purple-400" },
    { id: 3, name: "Poin Reward", value: "450 pts", icon: "✨", color: "from-yellow-500 to-orange-400" },
    { id: 4, name: "Total Laundry", value: "12x", icon: "👕", color: "from-blue-600 to-blue-400" },
  ];

  const currentStats = role === "Admin" ? adminStats : guestStats;

  return (
    <div className="p-1 space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {role === "Admin" ? "Dashboard Operasional Admin 📈" : "Halo, Emily Selman! 👋"}
          </h2>
          <p className="text-gray-500 mt-1 font-medium text-sm">
            {role === "Admin" 
              ? "Ringkasan data transaksi laundry Anda hari ini." 
              : "Senang melihat Anda kembali! Cek kemajuan cucian Anda."}
          </p>
        </div>
        <div className="flex gap-2">
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-bold border border-purple-100 uppercase tracking-tighter">
                {role} Mode
            </span>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentStats.map((item) => (
          <div 
            key={item.id} 
            className={`relative overflow-hidden bg-gradient-to-br ${item.color} p-6 rounded-[24px] shadow-lg shadow-purple-100 transition-transform hover:scale-105 duration-300`}
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-20 rounded-full"></div>
            <div className="relative z-10 text-white">
              <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4">
                {item.icon}
              </div>
              <p className="text-sm font-medium opacity-90 uppercase tracking-wider">{item.name}</p>
              <h3 className="text-2xl font-black mt-1">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content: Bar Chart & Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Grafik Batang (Total Growth) - Posisi Pertama */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {role === "Admin" ? "Total Pertumbuhan Bisnis" : "Aktivitas Mencuci Anda"}
              </h3>
              <p className="text-sm text-gray-400 font-medium">Januari - Juni 2024</p>
            </div>
            <select className="bg-gray-50 border border-gray-100 text-xs rounded-lg p-2 outline-none font-bold text-gray-600">
              <option>Bulan Ini</option>
              <option>Tahun Ini</option>
            </select>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataGrafik}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9e9e9e', fontSize: 12}}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f3f0ff'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                />
                <Bar dataKey="total" radius={[8, 8, 8, 8]} barSize={25}>
                  {dataGrafik.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index % 2 === 0 ? '#5e35b1' : '#bbdefb'} // Warna Ungu & Biru khas Berry
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Info/Action Side Section */}
        <div className="flex flex-col gap-6">
            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wider">
                    {role === "Admin" ? "Status Mesin" : "Voucher & Promo"}
                </h3>
                <div className="space-y-4">
                    {role === "Admin" ? (
                    <>
                        <div className="p-4 bg-green-50 rounded-2xl flex items-center justify-between border border-green-100">
                            <span className="font-bold text-green-800 text-sm">Mesin Cuci 01</span>
                            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-2xl flex items-center justify-between border border-orange-100 text-sm font-bold text-orange-800">
                            <span>Mesin Pengering 02</span>
                            <span className="text-xs bg-orange-200 px-2 py-0.5 rounded-lg">SIBUK</span>
                        </div>
                    </>
                    ) : (
                    <div className="p-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-white shadow-lg">
                        <p className="text-[10px] opacity-80 uppercase font-black">Member Gold</p>
                        <h4 className="text-lg font-black mt-1 leading-tight">Diskon 20% <br/> Semua Layanan</h4>
                    </div>
                    )}
                </div>

                <button className={`w-full mt-8 py-4 text-white rounded-[16px] text-xs font-black tracking-widest shadow-md transition-all active:scale-95 ${
                    role === "Admin" 
                    ? "bg-purple-600 hover:bg-purple-700 shadow-purple-100" 
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
                }`}>
                    {role === "Admin" ? "GENERATE LAPORAN PDF" : "PESAN LAYANAN"}
                </button>
            </div>
        </div>
      </div>

      {/* Table Section (Antrian/Riwayat) */}
      <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">
          {role === "Admin" ? "Daftar Antrian Laundry" : "Status Cucian Terakhir"}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-gray-50">
                <th className="pb-4 font-bold">No. Nota</th>
                <th className="pb-4 font-bold">{role === "Admin" ? "Pelanggan" : "Detail Paket"}</th>
                <th className="pb-4 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              <tr className="group border-b border-gray-50 last:border-0">
                <td className="py-5 text-purple-700 font-black">#LD-9901</td>
                <td className="py-5 text-gray-700">{role === "Admin" ? "Emily Selman" : "Cuci Kering Lipat (5kg)"}</td>
                <td className="py-5 text-center">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase ${
                    role === "Admin" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {role === "Admin" ? "Selesai" : "Proses"}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
