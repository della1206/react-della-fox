import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";

export default function Orders() {
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState([
    { id: "ORD-001", customer: "Emily Selman", service: "Cuci Komplit", weight: "3", status: "Proses" },
    { id: "ORD-002", customer: "Budi Santoso", service: "Cuci Kering", weight: "5", status: "Selesai" },
  ]);

  const [formData, setDataForm] = useState({ customer: "", service: "Cuci Komplit", weight: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: `ORD-00${orders.length + 1}`,
      ...formData,
      status: "Proses",
    };
    setOrders([newOrder, ...orders]);
    setDataForm({ customer: "", service: "Cuci Komplit", weight: "" });
    setShowForm(false); // Tutup form setelah simpan
  };

  return (
    <div className="p-1 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold text-gray-900">Manajemen Order</h2>
        {/* Tombol Tambah Sesuai Gambar */}
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-purple-100"
          >
            <BsPlusLg /> Tambah Orderan
          </button>
        )}
      </div>

      {/* Form Muncul Hanya Saat Tombol Diklik */}
      {showForm && (
        <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 animate-fade-in">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Form Order Baru</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                type="text" placeholder="Nama Pelanggan" 
                className="p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-purple-200"
                onChange={(e) => setDataForm({...formData, customer: e.target.value})}
              />
              <select 
                className="p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none"
                onChange={(e) => setDataForm({...formData, service: e.target.value})}
              >
                <option>Cuci Komplit</option>
                <option>Cuci Kering</option>
              </select>
              <input 
                type="number" placeholder="Berat (Kg)" 
                className="p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none"
                onChange={(e) => setDataForm({...formData, weight: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold">Simpan</button>
              <button onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl font-bold">Batal</button>
            </div>
          </form>
        </div>
      )}

      {/* Tabel Tetap Sama */}
      <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-[10px] uppercase tracking-widest border-b">
              <th className="pb-4">No. Nota</th>
              <th className="pb-4">Pelanggan</th>
              <th className="pb-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-5 font-black text-purple-700">{o.id}</td>
                <td className="py-5 text-gray-700 font-medium">{o.customer}</td>
                <td className="py-5 text-center">
                  <span className="px-4 py-1.5 rounded-xl bg-blue-100 text-blue-700 text-[10px] font-black uppercase">{o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}