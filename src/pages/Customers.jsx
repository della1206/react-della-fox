import React, { useState } from "react";
import { BsPersonPlus } from "react-icons/bs";

export default function Customers() {
  const [showForm, setShowForm] = useState(false);
  const [customers, setCustomers] = useState([
    { id: "CUST-001", name: "Emily Selman", type: "Member" },
  ]);

  const [newName, setNewName] = useState("");
  const addCustomer = (e) => {
    e.preventDefault();
    const newCust = {
      id: `CUST-00${customers.length + 1}`,
      name: newName,
      type: "Reguler"
    };
    setCustomers([newCust, ...customers]);
    setNewName("");
    setShowForm(false);
  };

  return (
    <div className="p-1 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold text-gray-900">Data Pelanggan</h2>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-purple-100"
          >
            <BsPersonPlus size={20} /> Tambah Pelanggan
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 animate-fade-in">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Tambah Pelanggan Baru</h3>
          <form onSubmit={addCustomer} className="flex gap-4">
            <input 
              type="text" 
              value={newName}
              placeholder="Masukkan Nama Pelanggan" 
              className="flex-1 p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-purple-200"
              onChange={(e) => setNewName(e.target.value)}
            />
            <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold">Tambah</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl font-bold">Batal</button>
          </form>
        </div>
      )}

      {/* Tabel Pelanggan */}
      <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-[10px] uppercase tracking-widest border-b">
              <th className="pb-4">Nama Pelanggan</th>
              <th className="pb-4">ID</th>
              <th className="pb-4 text-center">Tipe</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="py-5 font-bold text-gray-800">{c.name}</td>
                <td className="py-5 text-gray-400">{c.id}</td>
                <td className="py-5 text-center">
                   <span className="px-4 py-1 rounded-xl bg-orange-100 text-orange-700 text-[10px] font-black uppercase">{c.type}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}