import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft, BsPlusLg } from "react-icons/bs";
import initialProductsData from "../data/Products.json";

export default function Products() {
  const [currentView, setCurrentView] = useState("list"); // 'list' | 'create'
  const [products, setProducts] = useState(initialProductsData);

  // State untuk menangani data form produk/layanan baru
  const [formData, setFormData] = useState({
    code: "",
    titel: "",
    brand: "",
    kategori: "Layanan",
    estimasi_waktu: "24 Jam",
    price: "",
    stock: ""
  });

  // Fungsi penentu otomatis jika data estimasi bawaan tidak ada (sebagai cadangan)
  const getEstimasiWaktu = (item) => {
    if (item.estimasi_waktu) return item.estimasi_waktu;
    if (item.duration) return item.duration;
    if (item.kategori === "Inventaris") return "Ready Stok";

    const namaLayanan = item.titel.toLowerCase();
    if (namaLayanan.includes("kilat") || namaLayanan.includes("express")) return "12 Jam";
    if (namaLayanan.includes("setrika")) return "36 Jam";
    if (namaLayanan.includes("bedcover") || namaLayanan.includes("karpet") || namaLayanan.includes("jas")) return "72 Jam";
    
    return "48 Jam";
  };

  // Handler saat form disubmit untuk menyimpan data baru
  const handleSaveData = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.titel || !formData.price) {
      alert("Mohon lengkapi kolom Kode, Nama Layanan, dan Harga!");
      return;
    }

    const newProduct = {
      id: products.length + 1,
      code: formData.code.toUpperCase(),
      titel: formData.titel,
      brand: formData.brand || "-",
      kategori: formData.kategori,
      estimasi_waktu: formData.kategori === "Inventaris" ? "Ready Stok" : formData.estimasi_waktu,
      price: Number(formData.price),
      stock: formData.kategori === "Inventaris" ? Number(formData.stock || 0) : 999
    };

    setProducts([newProduct, ...products]);
    setCurrentView("list");

    // Reset Form isi kembali ke default
    setFormData({
      code: "",
      titel: "",
      brand: "",
      kategori: "Layanan",
      estimasi_waktu: "24 Jam",
      price: "",
      stock: ""
    });
  };

  return (
    <div className="p-8 bg-[#f8faff] min-h-screen">
      
      {/* ================= VIEW 1: DAFTAR LAYANAN & PRODUK (TABEL) ================= */}
      {currentView === "list" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Daftar Layanan & Produk</h1>
              <p className="text-gray-500">Kelola inventaris dan layanan BerryLaundry Anda</p>
            </div>
            {/* Tombol Tambah Data Aktif dan Bisa Diklik */}
            <button 
              onClick={() => setCurrentView("create")}
              className="flex items-center gap-2 bg-[#5e35b1] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-purple-200 hover:bg-[#4527a0] transition-all"
            >
              <BsPlusLg /> Tambah Data
            </button>
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Kode</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Layanan / Barang</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Kategori</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Estimasi Waktu</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Harga</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Stok/Limit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((item) => (
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
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium whitespace-nowrap">
                        <span className="inline-flex items-center gap-2">
                          <span className="text-gray-400 opacity-80">🕒</span>
                          {getEstimasiWaktu(item)}
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
        </div>
      )}

      {/* ================= VIEW 2: FORM TAMBAH DATA PRODUK/LAYANAN BARU ================= */}
      {currentView === "create" && (
        <div className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 border-b pb-4 mb-6">
            <button 
              onClick={() => setCurrentView("list")} 
              className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-600 border border-gray-200 shadow-sm transition-all"
            >
              <BsArrowLeft />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Tambah Layanan / Barang Baru</h2>
              <p className="text-xs text-gray-400 mt-0.5">Lengkapi formulir di bawah ini untuk menambahkan data inventaris laundry</p>
            </div>
          </div>

          <form onSubmit={handleSaveData} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-600">Kode Unik (Contoh: KUC-008 / INV-009)</label>
                <input 
                  type="text" 
                  placeholder="Masukkan kode barang..." 
                  className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-200 text-sm font-semibold text-gray-700"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-600">Kategori Inventaris</label>
                <select
                  className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-purple-200"
                  value={formData.kategori}
                  onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                >
                  <option value="Layanan">Layanan Laundry</option>
                  <option value="Inventaris">Inventaris (Barang & Stok)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-600">Nama Layanan / Barang</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Cuci Komplit (Kilat) / Deterjen Sakura" 
                  className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-200 text-sm font-semibold text-gray-700"
                  value={formData.titel}
                  onChange={(e) => setFormData({...formData, titel: e.target.value})}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-600">Brand / Keterangan Tambahan</label>
                <input 
                  type="text" 
                  placeholder="Contoh: SnapClean / SoKlin (Bisa dikosongkan)" 
                  className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-200 text-sm font-semibold text-gray-700"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-600">Harga (Rp)</label>
                <input 
                  type="number" 
                  placeholder="Contoh: 15000" 
                  className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-200 text-sm font-semibold text-gray-700"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              {formData.kategori === "Layanan" ? (
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Estimasi Durasi Pengerjaan</label>
                  <select
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-purple-200"
                    value={formData.estimasi_waktu}
                    onChange={(e) => setFormData({...formData, estimasi_waktu: e.target.value})}
                  >
                    <option value="12 Jam">12 Jam (Express)</option>
                    <option value="24 Jam">24 Jam (Kilat)</option>
                    <option value="36 Jam">36 Jam</option>
                    <option value="48 Jam">48 Jam (Reguler)</option>
                    <option value="72 Jam">72 Jam (Khusus)</option>
                  </select>
                </div>
              ) : (
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Jumlah Stok Barang</label>
                  <input 
                    type="number" 
                    placeholder="Contoh: 15" 
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-200 text-sm font-semibold text-gray-700"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button 
                type="button"
                onClick={() => setCurrentView("list")}
                className="bg-gray-100 text-gray-600 font-bold px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-all text-sm"
              >
                Batal
              </button>
              <button 
                type="submit"
                className="bg-[#5e35b1] hover:bg-[#4527a0] text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all text-sm"
              >
                ✓ Simpan Data
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}