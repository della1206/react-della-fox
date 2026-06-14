import React, { useState, useEffect } from "react";
import { userAPI } from "../services/userAPI";
import GenericTable from "../components/GenericTable";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // State untuk form tambah user manual oleh admin
  const [dataForm, setDataForm] = useState({
    nama: "",
    email: "",
    password: "",
  });

  // Ambil data user dari Supabase saat halaman dimuat
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userAPI.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat daftar pengguna dari Supabase.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  // Tambah User Baru via Dashboard Admin (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // SINKRONISASI: Menggunakan createUser sesuai dengan yang ada di userAPI.js
      await userAPI.createUser(dataForm);

      setSuccess("Pengguna baru berhasil ditambahkan ke database!");
      setDataForm({ nama: "", email: "", password: "" }); // Reset form

      setTimeout(() => setSuccess(""), 3000);
      loadUsers(); // Refresh data tabel otomatis
    } catch (err) {
      setError(`Gagal menambahkan pengguna: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Hapus User dari Database (Delete)
  const handleDelete = async (id, nama) => {
    const konfirmasi = window.confirm(`Apakah Anda yakin ingin menghapus akun ${nama}?`);
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await userAPI.deleteUser(id);

      setSuccess(`Akun ${nama} berhasil dihapus!`);
      setTimeout(() => setSuccess(""), 3000);
      loadUsers(); // Refresh data tabel otomatis
    } catch (err) {
      setError(`Gagal menghapus pengguna: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in duration-300">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800">Manajemen Pengguna</h2>
          <p className="text-gray-400 text-xs mt-1">Kelola hak akses kontrol akun Berry Laundry langsung dari Supabase.</p>
        </div>
      </div>

      {/* Alert Notifikasi Status */}
      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Tambah User Baru (Kiri) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-blue-100 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-2">Tambah Operator Baru</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="nama"
                disabled={loading}
                value={dataForm.nama}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                required
                className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5da5e8] focus:border-transparent text-xs font-semibold transition-all disabled:opacity-50"
              />
            </div>
            <div>
              <input
                type="text"
                name="email"
                disabled={loading}
                value={dataForm.email}
                onChange={handleChange}
                placeholder="Username / Email"
                required
                className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5da5e8] focus:border-transparent text-xs font-semibold transition-all disabled:opacity-50"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                disabled={loading}
                value={dataForm.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5da5e8] focus:border-transparent text-xs font-semibold transition-all disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5da5e8] hover:bg-[#4a8ecc] text-white font-bold py-3 rounded-2xl text-xs uppercase tracking-wider shadow-md shadow-blue-100 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Memproses..." : "Simpan Akun"}
            </button>
          </form>
        </div>

        {/* Tabel List User dari Supabase (Kanan) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h3 className="font-bold text-sm text-gray-800">Daftar Akun Terdaftar ({users.length})</h3>
          </div>

          {/* Kondisi Loading Status */}
          {loading && <LoadingSpinner text="Sinkronisasi data Supabase..." />}

          {/* Kondisi Data Kosong */}
          {!loading && users.length === 0 && (
            <EmptyState text="Belum ada data user terdaftar di Supabase." />
          )}

          {/* Tampilkan Tabel hanya jika data di atas 0 */}
          {!loading && users.length > 0 && (
            <div className="overflow-x-auto">
              <GenericTable
                columns={["No", "Nama Pengguna", "Username / Email", "Kredensial Sandi", "Aksi"]}
                data={users}
                renderRow={(user, index) => (
                  <>
                    <td className="px-6 py-4 font-bold text-gray-500 text-center">{index + 1}.</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{user.nama}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{user.email}</td>
                    <td className="px-6 py-4 text-xs font-mono text-gray-400 bg-gray-50/50 rounded-xl px-2 py-1">{user.password}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(user.id, user.nama)}
                        disabled={loading}
                        className="px-3 py-1.5 bg-red-50 text-red-500 font-bold text-xs rounded-xl hover:bg-red-500 hover:text-white transition-all transform active:scale-95 cursor-pointer disabled:opacity-50"
                      >
                        Hapus
                      </button>
                    </td>
                  </>
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}