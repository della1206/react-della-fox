import React from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { BsArrowUpRight, BsClockHistory, BsFillBoxSeamFill } from "react-icons/bs";

export default function Dashboard() {
  // Data dummy tetap sama
  const dataProduksi = [
    { name: '2021', kilo: 120, satuan: 80 }, { name: '2022', kilo: 250, satuan: 150 },
    { name: '2023', kilo: 210, satuan: 130 }, { name: '2024', kilo: 380, satuan: 210 },
    { name: '2025', kilo: 330, satuan: 190 }, { name: '2026', kilo: 460, satuan: 280 },
  ];

  const stats = [
    { label: "Total Pesanan", value: "1,240", icon: "🧺", trend: "+15%" },
    { label: "Pendapatan (Jt)", value: "Rp 45.2", icon: "💰", trend: "+8%" },
    { label: "Pelanggan Baru", value: "156", icon: "👤", trend: "+22%" },
    { label: "Cucian Selesai", value: "982 kg", icon: "🧼", trend: "+10%" },
  ];

  return (
    /* PERBAIKAN: Hapus max-width jika ada, gunakan w-full dan p-4 atau p-6 saja */
    <div className="w-full bg-[#f8fafc] min-h-screen p-4 md:p-6 space-y-6 animate-fade-in">
      
      {/* 1. TOP STATS - Grid 4 Kolom tetap memenuhi lebar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#5da5e8] p-5 rounded-xl shadow-sm text-white relative overflow-hidden group">
            <div className="z-10 relative">
              <div className="flex justify-between items-start">
                <span className="text-2xl opacity-40 group-hover:scale-110 transition-transform">{s.icon}</span>
                <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full font-bold">{s.trend}</span>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl md:text-3xl font-extrabold">{s.value}</h3>
                <p className="text-[10px] font-medium opacity-80 uppercase tracking-widest">{s.label}</p>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        ))}
      </div>

      {/* 2. GRAFIK UTAMA - Gunakan lg:col-span-8 untuk area chart agar lebih lebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h4 className="text-gray-800 font-bold text-lg">Produksi Laundry (Kg)</h4>
              <p className="text-xs text-gray-400 mt-1 flex gap-4">
                <span><b className="text-blue-500">●</b> Kiloan</span>
                <span><b className="text-blue-900">●</b> Satuan/Dry Clean</span>
              </p>
            </div>
            <button className="text-gray-400 hover:text-blue-500"><BsArrowUpRight /></button>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataProduksi}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={11} tick={{fill: '#94a3b8'}} axisLine={false} />
                <YAxis fontSize={11} tick={{fill: '#94a3b8'}} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="kilo" stroke="#5da5e8" strokeWidth={3} fill="#5da5e8" fillOpacity={0.1} />
                <Area type="monotone" dataKey="satuan" stroke="#1e3a8a" strokeWidth={3} fill="#1e3a8a" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Hari Ini - lg:col-span-4 */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <h4 className="text-gray-800 font-bold text-lg">Status Laundry Hari Ini</h4>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{v:65}, {v:35}]} innerRadius={75} outerRadius={95} dataKey="v" startAngle={90} endAngle={450}>
                  <Cell fill="#5da5e8" />
                  <Cell fill="#f1f5f9" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-sm font-bold text-gray-400 uppercase">Selesai</span>
               <span className="text-4xl font-black text-gray-800">65%</span>
            </div>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between text-xs">
                <span className="text-gray-500">Antrean Proses</span>
                <span className="font-bold text-orange-500">12 Order</span>
             </div>
             <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-400 h-full w-[40%]"></div>
             </div>
          </div>
        </div>
      </div>

      {/* 3. TABEL & SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h4 className="font-bold text-gray-800 text-lg">Antrean Order Terbaru</h4>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-bold">LIVE UPDATE</span>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="p-5">Pelanggan</th>
                  <th className="p-5">Layanan</th>
                  <th className="p-5 text-center">Status</th>
                  <th className="p-5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {[
                  { name: "Della Wijaya", service: "Cuci Lipat (5kg)", status: "Proses", price: "Rp 35.000" },
                  { name: "Andi Saputra", service: "Bedcover King", status: "Selesai", price: "Rp 45.000" },
                  { name: "Siti Aminah", service: "Dry Clean Jas", status: "Antri", price: "Rp 60.000" },
                  { name: "Budi Rejeki", service: "Express 6 Jam", status: "Proses", price: "Rp 55.000" },
                ].map((order, i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-5 font-bold text-gray-700">{order.name}</td>
                    <td className="p-5 text-gray-500">{order.service}</td>
                    <td className="p-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase 
                        ${order.status === 'Selesai' ? 'bg-green-100 text-green-600' : 
                          order.status === 'Proses' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-5 text-right font-bold text-gray-600">{order.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BsClockHistory className="text-blue-500" /> Log Aktivitas Laundry
            </h4>
            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              <div className="relative pl-8">
                <div className="absolute left-1.5 top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm bg-blue-500"></div>
                <p className="text-xs font-bold text-gray-800">Kurir Pickup Order #098</p>
                <p className="text-[10px] text-gray-400">3 menit yang lalu</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-1.5 top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm bg-green-500"></div>
                <p className="text-xs font-bold text-gray-800">Mesin 02: Siklus Cuci Selesai</p>
                <p className="text-[10px] text-gray-400">12 menit yang lalu</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-6 rounded-xl shadow-lg text-white">
            <div className="flex justify-between items-center mb-4">
              <BsFillBoxSeamFill size={24} className="text-blue-300" />
              <span className="text-[10px] font-bold tracking-widest opacity-60">KASIR CEPAT</span>
            </div>
            <p className="text-xs opacity-80">Saldo Kas Hari Ini</p>
            <h3 className="text-2xl font-black mt-1">Rp 1.420.500</h3>
            <div className="grid grid-cols-2 gap-2 mt-6">
               <button className="py-2 bg-white/10 hover:bg-white/20 text-[10px] font-bold rounded-lg transition-all border border-white/20">+ ORDER</button>
               <button className="py-2 bg-blue-500 hover:bg-blue-600 text-[10px] font-bold rounded-lg transition-all shadow-lg">CATAT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}