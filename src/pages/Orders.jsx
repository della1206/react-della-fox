import React, { useState } from "react";
import { BsEye, BsPencilSquare, BsTrash, BsArrowLeft, BsPlusLg } from "react-icons/bs";

export default function Orders() {
  const [currentView, setCurrentView] = useState("list"); // 'list' | 'detail' | 'edit' | 'create'
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // State utama untuk menampung data pesanan
  const [orders, setOrders] = useState([
    { 
      id: "KUC-NW015", 
      date: "27 Jun 2026", 
      time: "14.30",
      customer: "Farhan Ardiansyah", 
      address: "Jl. Tuanku Tambusai No. 88, Pekanbaru",
      service: "Cuci Kering + Setrika (Reguler)", 
      weight: "8 kg", 
      status: "Diproses", 
      total: "Rp 64.000" 
    },
    { 
      id: "KUC-LK003", 
      date: "26 Jun 2026", 
      time: "11.15",
      customer: "Citra Lestari", 
      address: "Perumahan Palma Blok C3, Pekanbaru",
      service: "Dry Clean Jas & Gaun", 
      weight: "3 pcs", 
      status: "Selesai", 
      total: "Rp 150.000" 
    },
    { 
      id: "KUC-GH022", 
      date: "26 Jun 2026", 
      time: "09.00",
      customer: "Rian Hidayat", 
      address: "Jl. HR. Soebrantas Gg. Sabar, Pekanbaru",
      service: "Cuci Komplit (Express)", 
      weight: "6 kg", 
      status: "Diterima", 
      total: "Rp 72.000" 
    },
  ]);

  // State untuk form input pesanan baru
  const [newOrderForm, setNewOrderForm] = useState({
    customer: "",
    address: "",
    service: "Cuci Komplit (Reguler)",
    weight: "",
    pricePerKg: "7000",
    status: "Diterima"
  });

  const filters = ["Semua", "Diterima", "Dijemput", "Diproses", "Diantar", "Selesai"];

  // Opsi label status dropdown agar sinkron dengan gambar referensi Anda
  const statusOptions = [
    { value: "Diterima", label: "1. Diterima (Menunggu)" },
    { value: "Dijemput", label: "2. Dijemput (Otw Laundry)" },
    { value: "Diproses", label: "3. Diproses (Dicuci)" },
    { value: "Diantar", label: "4. Diantar (Otw Pelanggan)" },
    { value: "Selesai", label: "5. Selesai (Diterima Pelanggan)" }
  ];

  const handleDelete = (id) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus orderan ${id}?`)) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const handleUpdateStatus = (status) => {
    setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status } : o));
    setCurrentView("list");
  };

  // Handler simpan pesanan baru
  const handleSaveNewOrder = (e) => {
    e.preventDefault();
    if (!newOrderForm.customer || !newOrderForm.weight) {
      alert("Mohon isi nama pelanggan dan berat cucian.");
      return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    const formattedTime = today.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }).replace(".", ":");
    
    // Hitung perkiraan total tagihan
    const calculatedTotal = Number(newOrderForm.weight) * Number(newOrderForm.pricePerKg);
    const formattedTotal = `Rp ${calculatedTotal.toLocaleString("id-ID")}`;

    const randomId = `KUC-${Math.random().toString(36).substring(2, 5).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`;

    const freshOrder = {
      id: randomId,
      date: formattedDate,
      time: formattedTime,
      customer: newOrderForm.customer,
      address: newOrderForm.address || "Tidak ada catatan alamat",
      service: newOrderForm.service,
      weight: `${newOrderForm.weight} kg`,
      status: newOrderForm.status,
      total: formattedTotal
    };

    setOrders([freshOrder, ...orders]);
    setCurrentView("list");
    
    // Reset form
    setNewOrderForm({
      customer: "",
      address: "",
      service: "Cuci Komplit (Reguler)",
      weight: "",
      pricePerKg: "7000",
      status: "Diterima"
    });
  };

  // Filter & Search Logic
  const filteredOrders = orders.filter(o => {
    const matchesFilter = activeFilter === "Semua" || o.status === activeFilter;
    const matchesSearch = o.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          o.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen p-4 md:p-6 space-y-6">
      
      {/* ================= VIEW 1: LIST TABEL UTAMA ================= */}
      {currentView === "list" && (
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Kelola semua transaksi dan status cucian pelanggan.</p>
            </div>
            {/* Tombol Buat Pesanan Baru Sesuai Referensi Gambar */}
            <button 
              onClick={() => setCurrentView("create")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-blue-100"
            >
              <BsPlusLg /> Buat Pesanan Baru
            </button>
          </div>

          {/* Bar Filter & Pencarian */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
              <input 
                type="text" 
                placeholder="Cari no. resi atau nama pelanggan..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-xl">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeFilter === f ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Tabel Orderan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                    <th className="p-4">No. Resi</th>
                    <th className="p-4">Tanggal</th>
                    <th className="p-4">Pelanggan</th>
                    <th className="p-4">Layanan & Berat</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4">Total Tagihan</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-blue-50/20 transition-colors">
                      <td className="p-4 font-bold text-blue-600 cursor-pointer" onClick={() => { setSelectedOrder(o); setCurrentView("detail"); }}>
                        {o.id}
                      </td>
                      <td className="p-4 text-gray-400">{o.date}</td>
                      <td className="p-4 font-bold text-gray-800">{o.customer}</td>
                      <td className="p-4">
                        <div className="font-semibold">{o.service}</div>
                        <div className="text-xs text-gray-400">{o.weight}</div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          o.status === 'Selesai' ? 'bg-green-50 text-green-600' :
                          o.status === 'Diproses' ? 'bg-orange-50 text-orange-600' : 
                          o.status === 'Diterima' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-gray-800">{o.total}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => { setSelectedOrder(o); setCurrentView("detail"); }}
                            className="text-blue-500 hover:text-blue-700 text-base"
                          >
                            <BsEye />
                          </button>
                          <button 
                            onClick={() => { setSelectedOrder(o); setCurrentView("edit"); }}
                            className="text-orange-400 hover:text-orange-600 text-base"
                          >
                            <BsPencilSquare />
                          </button>
                          <button 
                            onClick={() => handleDelete(o.id)}
                            className="text-red-500 hover:text-red-700 text-base"
                          >
                            <BsTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW 2: FORM BUAT PESANAN BARU ================= */}
      {currentView === "create" && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentView("list")} 
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm"
            >
              <BsArrowLeft />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Buat Pesanan Baru</h2>
              <p className="text-xs text-gray-400 mt-0.5">Input detail pesanan masuk outlet laundry hari ini</p>
            </div>
          </div>

          <form onSubmit={handleSaveNewOrder} className="space-y-6">
            {/* Input Informasi Pelanggan */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-gray-800 border-b pb-3">Informasi Pelanggan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500">Nama Pelanggan</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan nama lengkap..." 
                    className="p-3 bg-gray-50/70 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-sm font-semibold"
                    value={newOrderForm.customer}
                    onChange={(e) => setNewOrderForm({...newOrderForm, customer: e.target.value})}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500">Alamat & Catatan Jemput</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan alamat atau catatan jemput..." 
                    className="p-3 bg-gray-50/70 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-sm font-semibold"
                    value={newOrderForm.address}
                    onChange={(e) => setNewOrderForm({...newOrderForm, address: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Input Layanan & Rincian */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-gray-800 border-b pb-3">Rincian Cucian & Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500">Jenis Layanan</label>
                  <select
                    className="p-3 bg-gray-50/70 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-100 text-gray-700"
                    value={newOrderForm.service}
                    onChange={(e) => setNewOrderForm({...newOrderForm, service: e.target.value})}
                  >
                    <option>Cuci Komplit (Reguler)</option>
                    <option>Cuci Komplit (Kilat)</option>
                    <option>Cuci Kering + Setrika (Reguler)</option>
                    <option>Dry Clean Jas & Gaun</option>
                  </select>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500">Berat / Jumlah (Angka)</label>
                  <input 
                    type="number" 
                    placeholder="Contoh: 5" 
                    className="p-3 bg-gray-50/70 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-sm font-semibold"
                    value={newOrderForm.weight}
                    onChange={(e) => setNewOrderForm({...newOrderForm, weight: e.target.value})}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500">Harga per Kg / Satuan (Rp)</label>
                  <input 
                    type="number" 
                    className="p-3 bg-gray-50/70 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 text-sm font-semibold"
                    value={newOrderForm.pricePerKg}
                    onChange={(e) => setNewOrderForm({...newOrderForm, pricePerKg: e.target.value})}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500">Status Awal</label>
                  <select
                    className="p-3 bg-gray-50/70 border border-gray-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-100 text-gray-700"
                    value={newOrderForm.status}
                    onChange={(e) => setNewOrderForm({...newOrderForm, status: e.target.value})}
                  >
                    <option value="Diterima">Diterima</option>
                    <option value="Dijemput">Dijemput</option>
                    <option value="Diproses">Diproses</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => setCurrentView("list")}
                className="bg-white border border-gray-200 text-gray-600 font-bold px-6 py-2.5 rounded-xl transition-all hover:bg-gray-50 shadow-sm"
              >
                Batal
              </button>
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all"
              >
                ✓ Simpan Pesanan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= VIEW 3: EDIT PESANAN ================= */}
      {currentView === "edit" && selectedOrder && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentView("list")} 
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm"
              >
                <BsArrowLeft />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-800">Edit Pesanan</h2>
                  <span className="bg-blue-50 text-blue-600 px-3 py-0.5 rounded-lg text-sm font-bold">{selectedOrder.id}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Diterima pada {selectedOrder.date} pukul {selectedOrder.time}</p>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 p-2 px-4 rounded-xl flex items-center gap-3">
              <span className="text-xs font-bold text-amber-700">Ubah Status:</span>
              <select 
                value={selectedOrder.status}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                className="bg-white border border-gray-200 text-xs rounded-lg p-1.5 font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Informasi */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-800 border-b pb-3">Informasi Pelanggan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl text-gray-400 mt-0.5">👤</span>
                <div>
                  <div className="text-xs text-gray-400">Nama Pelanggan</div>
                  <div className="font-bold text-gray-800 mt-0.5">{selectedOrder.customer}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl text-gray-400 mt-0.5">📍</span>
                <div>
                  <div className="text-xs text-gray-400">Alamat & Catatan Jemput</div>
                  <div className="font-bold text-gray-800 mt-0.5">{selectedOrder.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Rincian Cucian */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-800 border-b pb-3">Rincian Cucian</h3>
            <div className="bg-gray-50/70 p-4 rounded-xl flex justify-between items-center text-sm font-semibold">
              <div className="flex items-center gap-2 text-green-600">
                <span>✓</span> {selectedOrder.service}
              </div>
              <div className="text-gray-800">{selectedOrder.weight}</div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={() => setCurrentView("list")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              ✓ Selesai Mengedit
            </button>
          </div>
        </div>
      )}

      {/* ================= VIEW 4: DETAIL PESANAN ================= */}
      {currentView === "detail" && selectedOrder && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentView("list")} 
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm"
              >
                <BsArrowLeft />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-800">Detail Pesanan</h2>
                  <span className="bg-blue-50 text-blue-600 px-3 py-0.5 rounded-lg text-sm font-bold">{selectedOrder.id}</span>
                  <span className="bg-green-50 text-green-600 px-2.5 py-0.5 rounded-full text-xs font-semibold">{selectedOrder.status}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Diterima pada {selectedOrder.date} pukul {selectedOrder.time}</p>
              </div>
            </div>

            {/* Informasi Pelanggan */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-gray-800 border-b pb-3">Informasi Pelanggan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-xl text-gray-400 mt-0.5">👤</span>
                  <div>
                    <div className="text-xs text-gray-400">Nama Pelanggan</div>
                    <div className="font-bold text-gray-800 mt-0.5">{selectedOrder.customer}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl text-gray-400 mt-0.5">📍</span>
                  <div>
                    <div className="text-xs text-gray-400">Alamat & Catatan Jemput</div>
                    <div className="font-bold text-gray-800 mt-0.5">{selectedOrder.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rincian Cucian */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-gray-800 border-b pb-3">Rincian Cucian</h3>
              <div className="bg-gray-50/70 p-4 rounded-xl flex justify-between items-center text-sm font-semibold">
                <div className="flex items-center gap-2 text-green-600">
                  <span>✓</span> {selectedOrder.service}
                </div>
                <div className="text-gray-800">{selectedOrder.weight}</div>
              </div>
            </div>
          </div>

          {/* Ringkasan Tagihan */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <span>🧾</span> Ringkasan Tagihan
              </h3>
              <div className="space-y-3 text-sm pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">No. Resi</span>
                  <span className="font-bold text-gray-800">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Layanan</span>
                  <span className="font-semibold text-gray-800">{selectedOrder.service}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status</span>
                  <span className="bg-green-50 text-green-600 text-xs px-2 py-0.5 rounded-md font-bold">{selectedOrder.status}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-gray-500">Total Bayar</span>
                <span className="text-3xl font-black text-blue-600">{selectedOrder.total}</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-50 transition-all">
                🖨️ Cetak Nota
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}