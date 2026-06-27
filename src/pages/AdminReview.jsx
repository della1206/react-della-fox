import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

export default function AdminReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [form, setForm] = useState({
    customer_name: "",
    receipt_number: "",
    rating: 5,
    comment: "",
    show_home: false,
  });

  useEffect(() => {
    loadReview();
  }, []);

  async function loadReview() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addReview() {
    try {
      const reviewData = {
        customer_name: form.customer_name,
        receipt_number: form.receipt_number,
        rating: Number(form.rating),
        comment: form.comment,
        show_home: form.show_home || false,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("reviews")
        .insert([reviewData])
        .select();

      if (error) {
        console.error("Error detail:", error);
        throw error;
      }

      setForm({
        customer_name: "",
        receipt_number: "",
        rating: 5,
        comment: "",
        show_home: false,
      });
      setShowForm(false);
      setError(null);
      loadReview();
    } catch (err) {
      console.error("Error:", err);
      setError(`Gagal menambahkan review: ${err.message}`);
    }
  }

  async function deleteReview(id) {
    if (window.confirm("Apakah Anda yakin ingin menghapus review ini?")) {
      try {
        const { error } = await supabase
          .from("reviews")
          .delete()
          .eq("id", id);

        if (error) throw error;
        loadReview();
        setError(null);
      } catch (err) {
        setError(`Gagal menghapus review: ${err.message}`);
      }
    }
  }

  const handleViewDetail = (review) => {
    setSelectedReview(review);
    setShowDetailModal(true);
  };

  const filtered = reviews
    .filter((item) => {
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        item.customer_name?.toLowerCase().includes(q) ||
        item.receipt_number?.toLowerCase().includes(q) ||
        item.comment?.toLowerCase().includes(q)
      );
    })
    .filter((item) => {
      if (filter === "shown") return item.show_home === true;
      if (filter === "hidden") return item.show_home === false;
      if (filter === "5star") return Number(item.rating) === 5;
      return true;
    });

  return (
    // Pembungkus Flexbox utama agar konten otomatis berjejer rapi di samping sidebar
    <div className="flex min-h-screen bg-slate-50 w-full">
      {/* Konten Halaman: flex-1 memastikan area ini mengambil seluruh sisa lebar layar */}
      <div className="flex-1 px-6 py-6 overflow-x-hidden">
        
        {/* Dashboard Utama - Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Ulasan Pelanggan</h1>
        <p className="text-gray-500 text-sm mb-6">Moderasi Ulasan & Feedback</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg mb-5 hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          + Tambah Review
        </button>

        {showForm && (
          <div className="bg-white p-5 rounded-xl shadow mb-6 w-full">
            <h2 className="font-bold text-xl mb-4">Tambah Review</h2>

            <input
              className="border p-3 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama pelanggan"
              value={form.customer_name}
              onChange={(e) =>
                setForm({ ...form, customer_name: e.target.value })
              }
            />

            <input
              className="border p-3 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nomor resi"
              value={form.receipt_number}
              onChange={(e) =>
                setForm({ ...form, receipt_number: e.target.value })
              }
            />

            <select
              className="border p-3 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.rating}
              onChange={(e) =>
                setForm({ ...form, rating: Number(e.target.value) })
              }
            >
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>

            <textarea
              className="border p-3 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Komentar"
              rows="3"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
            />

            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="show_home"
                checked={form.show_home}
                onChange={(e) =>
                  setForm({ ...form, show_home: e.target.checked })
                }
                className="mr-2 w-4 h-4"
              />
              <label htmlFor="show_home" className="text-sm">
                Tampilkan di Beranda
              </label>
            </div>

            <div className="flex gap-2">
              <button
                onClick={addReview}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Simpan Review
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setForm({
                    customer_name: "",
                    receipt_number: "",
                    rating: 5,
                    comment: "",
                    show_home: false,
                  });
                }}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <input
            className="border rounded-lg px-4 py-2.5 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Search nama pelanggan, no resi..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition-colors text-sm ${
              filter === "all" 
                ? "bg-blue-600 text-white" 
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Semua
          </button>

          <button
            onClick={() => setFilter("shown")}
            className={`px-4 py-2 rounded-lg transition-colors text-sm ${
              filter === "shown" 
                ? "bg-blue-600 text-white" 
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Ditampilkan
          </button>

          <button
            onClick={() => setFilter("hidden")}
            className={`px-4 py-2 rounded-lg transition-colors text-sm ${
              filter === "hidden" 
                ? "bg-blue-600 text-white" 
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Disembunyikan
          </button>

          <button
            onClick={() => setFilter("5star")}
            className={`px-4 py-2 rounded-lg transition-colors text-sm ${
              filter === "5star" 
                ? "bg-blue-600 text-white" 
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            Bintang 5
          </button>
        </div>

        {/* Table Section - Full Width No Space */}
        <div className="bg-white rounded-xl shadow overflow-hidden w-full">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">NO</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">PELANGGAN</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">NO RESI</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">RATING</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">KOMENTAR</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">TAMPILKAN</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="7" className="p-5 text-center text-gray-500">
                      <div className="flex justify-center items-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </div>
                    </td>
                  </tr>
                )}

                {filtered.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{index + 1}</td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-800">{item.customer_name}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{item.receipt_number}</td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">{'⭐'.repeat(item.rating)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.comment || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {item.show_home ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ TAYANG
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          ⊗ SEMBUNYI
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleViewDetail(item)}
                          className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 text-xs transition-colors"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => deleteReview(item.id)}
                          className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 text-xs transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <span className="text-4xl mb-2">📋</span>
                        <p className="text-sm">Tidak ada data review</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {showDetailModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Detail Pesanan</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-semibold">{selectedReview.receipt_number}</span>
                    {" • Diterima pada "}
                    {selectedReview.created_at 
                      ? new Date(selectedReview.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })
                      : 'Tanggal tidak tersedia'
                    }
                    {" pukul "}
                    {selectedReview.created_at 
                      ? new Date(selectedReview.created_at).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : '--:--'
                    }
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedReview(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Informasi Pelanggan
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-800">{selectedReview.customer_name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Alamat: {selectedReview.address || "Jl. Sukajadi No. 22, Pekanbaru"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Catatan Jemput: {selectedReview.notes || "Tidak ada catatan"}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Rincian Cucian
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Cuci Komplit (Reguler)</span>
                    <span className="font-semibold">5 kg</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Ringkasan Tagihan
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">No. Resi</span>
                    <span className="font-semibold">{selectedReview.receipt_number}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Layanan</span>
                    <span className="font-semibold">Cuci Komplit (Reguler)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Status</span>
                    <span className="font-semibold text-green-600">Selesai</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Rating</span>
                    <span className="font-semibold">{'⭐'.repeat(selectedReview.rating)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Komentar</span>
                    <span className="font-semibold text-right max-w-xs">
                      {selectedReview.comment || "Tidak ada komentar"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center bg-blue-50 rounded-lg p-4">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    Rp 110.000
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t p-6 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedReview(null);
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}