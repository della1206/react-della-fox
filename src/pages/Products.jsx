import React from "react";
import { Link } from "react-router-dom";
import productsData from "../data/Products.json";

export default function Products() {
  return (
    <div className="p-8 bg-[#f8faff] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Daftar Layanan & Produk</h1>
          <p className="text-gray-500">Kelola inventaris dan layanan BerryLaundry Anda</p>
        </div>
        <button className="bg-[#5e35b1] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-purple-200 hover:bg-[#4527a0] transition-all">
          + Tambah Data
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Kode</th>
              <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Layanan / Barang</th>
              <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Kategori</th>
              <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Harga</th>
              <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Stok/Limit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {productsData.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4 text-xs font-mono text-gray-400">{item.code}</td>
                <td className="px-6 py-4">
                  <Link 
                    to={`/products/${item.id}`} 
                    className="text-[#5e35b1] font-bold hover:text-blue-600 transition-colors block"
                  >
                    {item.titel}
                  </Link>
                  <span className="text-[10px] text-gray-400">{item.brand}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    item.kategori === 'Inventaris' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {item.kategori}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-slate-700">
                  {item.price > 10000 
                    ? `Rp ${item.price.toLocaleString("id-ID")}` 
                    : `Rp ${item.price.toLocaleString("id-ID")} /kg`
                  }
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-semibold ${item.stock < 10 ? 'text-red-500' : 'text-gray-600'}`}>
                    {item.stock === 999 ? '∞' : item.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}