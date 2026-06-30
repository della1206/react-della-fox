import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BsArrowUpRight,
  BsBasket2Fill,
  BsCashCoin,
  BsPeopleFill,
  BsWater,
} from "react-icons/bs";

const summaryCards = [
  {
    title: "Total Pesanan",
    value: "1,240",
    trend: "+15%",
    icon: <BsBasket2Fill />,
  },
  {
    title: "Pendapatan (Jt)",
    value: "Rp 45.2",
    trend: "+8%",
    icon: <BsCashCoin />,
  },
  {
    title: "Pelanggan Baru",
    value: "156",
    trend: "+22%",
    icon: <BsPeopleFill />,
  },
  {
    title: "Cucian Selesai",
    value: "982 kg",
    trend: "+10%",
    icon: <BsWater />,
  },
];

const productionData = [
  { day: "Sen", kiloan: 180, satuan: 70 },
  { day: "Sel", kiloan: 260, satuan: 95 },
  { day: "Rab", kiloan: 225, satuan: 115 },
  { day: "Kam", kiloan: 380, satuan: 205 },
  { day: "Jum", kiloan: 335, satuan: 190 },
  { day: "Sab", kiloan: 370, satuan: 225 },
  { day: "Min", kiloan: 460, satuan: 285 },
];

const statusData = [
  { name: "Selesai", value: 65, color: "#5da5e8" },
  { name: "Proses", value: 35, color: "#eef2f7" },
];

const ordersToday = [
  { id: "ORD-2401", customer: "Ketrin Vinensky", service: "Cuci Komplit", status: "Selesai", total: "Rp 110.000" },
  { id: "ORD-2402", customer: "Aira", service: "Kiloan Reguler", status: "Proses", total: "Rp 48.000" },
  { id: "ORD-2403", customer: "Naila Yohanda", service: "Dry Clean", status: "Diambil", total: "Rp 95.000" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 text-left">
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="min-h-[142px] rounded-lg bg-[#5da5e8] p-6 text-white shadow-sm"
          >
            <div className="mb-5 flex items-start justify-between">
              <div className="text-2xl text-white/45">{card.icon}</div>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-extrabold">
                {card.trend}
              </span>
            </div>
            <p className="text-3xl font-black leading-none tracking-normal">{card.value}</p>
            <p className="mt-2 text-[11px] font-extrabold uppercase tracking-widest text-white/90">
              {card.title}
            </p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-gray-900">Produksi Laundry (Kg)</h1>
              <div className="mt-3 flex items-center gap-5 text-xs font-medium text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#4d83f1]" />
                  Kiloan
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#23459a]" />
                  Satuan/Dry Clean
                </span>
              </div>
            </div>
            <button
              type="button"
              aria-label="Lihat detail produksi"
              className="rounded-md p-2 text-gray-400 transition hover:bg-gray-50 hover:text-gray-700"
            >
              <BsArrowUpRight />
            </button>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="kiloanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5da5e8" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#5da5e8" stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="satuanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#23459a" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#23459a" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 4" vertical={false} stroke="#e8edf5" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9aa4b2", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9aa4b2", fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="kiloan" stroke="#5da5e8" strokeWidth={3} fill="url(#kiloanGradient)" />
                <Area type="monotone" dataKey="satuan" stroke="#23459a" strokeWidth={3} fill="url(#satuanGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-gray-900">Status Laundry Hari Ini</h2>
          <div className="relative mx-auto mt-8 h-[250px] max-w-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  innerRadius="68%"
                  outerRadius="88%"
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-black uppercase text-gray-400">Selesai</span>
              <span className="text-4xl font-black text-gray-800">65%</span>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-xs font-bold uppercase text-blue-400">Selesai</p>
              <p className="mt-1 text-2xl font-black text-gray-900">42</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs font-bold uppercase text-gray-400">Proses</p>
              <p className="mt-1 text-2xl font-black text-gray-900">23</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-900">Pesanan Terbaru</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Hari Ini</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-black uppercase tracking-wider text-gray-400">
                <th className="py-3 pr-4">No Pesanan</th>
                <th className="py-3 pr-4">Pelanggan</th>
                <th className="py-3 pr-4">Layanan</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {ordersToday.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 text-sm text-gray-600 last:border-0">
                  <td className="py-4 pr-4 font-bold text-gray-900">{order.id}</td>
                  <td className="py-4 pr-4">{order.customer}</td>
                  <td className="py-4 pr-4">{order.service}</td>
                  <td className="py-4 pr-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-right font-bold text-gray-900">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
