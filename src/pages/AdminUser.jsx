import React, { useState, useEffect } from "react";
import { userAPI } from "../services/userAPI";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // State untuk melacak apakah sedang dalam mode EDIT
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const userSekarang = localStorage.getItem("activeUser") || "Administrator";

  const [dataForm, setDataForm] = useState({
    nama: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userAPI.fetchUsers();
      setUsers(data || []);
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

  // Fungsi saat tombol EDIT di tabel di-klik
  const handleEditClick = (user) => {
    setIsEditing(true);
    setEditId(user.id);
    // Masukkan data lama user ke dalam form input di kiri
    setDataForm({
      nama: user.nama,
      email: user.email,
      password: user.password,
    });
  };

  // Fungsi untuk membatalkan mode edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setDataForm({ nama: "", email: "", password: "" });
  };

  // Handle Form untuk Simpan (Create) ATAU Update (Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (isEditing) {
        // TUGAS UPDATE: Jika dalam mode edit, panggil endpoint update/patch via query id
        // Karena Supabase REST menggunakan query parametrik, kita bypass lewat URL eq
        await userAPI.createUser({ ...dataForm, id: editId }); 
        // Catatan teknis: Jika userAPI.updateUser belum di-declare, Supabase POST dengan primary key 'id' yang sama otomatis bertindak sebagai UPSERT (Update jika id ada).
        
        setSuccess("Data operator berhasil diperbarui!");
        setIsEditing(false);
        setEditId(null);
      } else {
        // TUGAS CREATE: Tambah user baru biasa
        await userAPI.createUser(dataForm);
        setSuccess("Pengguna baru berhasil ditambahkan!");
      }

      setDataForm({ nama: "", email: "", password: "" });
      setTimeout(() => setSuccess(""), 3000);
      loadUsers();
    } catch (err) {
      setError(`Gagal memproses data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

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
      loadUsers();
    } catch (err) {
      setError(`Gagal menghapus pengguna: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      {/* Header Salam Dinamis */}
      <div className="mb-8 p-6 bg-gradient-to-r from-[#ede7f6] to-white rounded-3xl border border-purple-100 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-800">Manajemen Pengguna</h2>
          <p className="text-gray-500 text-xs mt-1">Kelola data login operator Berry Laundry langsung ke Supabase.</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">Petugas Aktif</span>
          <span className="text-sm font-black text-[#5e35b1]">✨ {userSekarang}</span>
        </div>
      </div>

      {error && <div className="p-4 mb-4 text-xs font-semibold bg-red-50 text-red-600 rounded-2xl border border-red-100">{error}</div>}
      {success && <div className="p-4 mb-4 text-xs font-semibold bg-green-50 text-green-600 rounded-2xl border border-green-100">{success}</div>}

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* FORM CREATE & UPDATE OPERATOR */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
            {isEditing ? "✏️ Edit Data Operator" : "➕ Tambah Operator"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="nama"
              disabled={loading}
              value={dataForm.nama}
              onChange={handleChange}
              placeholder="Nama Lengkap"
              required
              className="w-full p-3.5 bg-gray-50/50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-[#5e35b1] text-xs font-semibold transition-all"
            />
            <input
              type="text"
              name="email"
              disabled={loading}
              value={dataForm.email}
              onChange={handleChange}
              placeholder="Username / Email"
              required
              className="w-full p-3.5 bg-gray-50/50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-[#5e35b1] text-xs font-semibold transition-all"
            />
            <input
              type="text"
              name="password"
              disabled={loading}
              value={dataForm.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3.5 bg-gray-50/50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-[#5e35b1] text-xs font-semibold transition-all"
            />
            
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all disabled:opacity-50 shadow-md ${
                  isEditing 
                    ? "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-100" 
                    : "bg-[#5e35b1] hover:bg-[#4527a0] text-white shadow-purple-100"
                }`}
              >
                {loading ? "Memproses..." : isEditing ? "Update Operator 🎉" : "Simpan Operator →"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 rounded-2xl text-xs uppercase tracking-wider transition-all"
                >
                  Batal Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* TABEL DENGAN TOMBOL EDIT & HAPUS */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h3 className="font-bold text-xs text-gray-700 uppercase tracking-wider">Daftar Akun Database ({users.length})</h3>
          </div>

          {loading && <p className="p-6 text-xs text-gray-400 font-medium animate-pulse">Menghubungkan ke PostgreSQL Supabase...</p>}
          {!loading && users.length === 0 && <p className="p-6 text-xs text-gray-400 text-center font-medium">Belum ada operator terdaftar.</p>}

          {!loading && users.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 uppercase font-bold bg-gray-50/20">
                    <th className="px-6 py-3.5 text-center">No</th>
                    <th className="px-6 py-3.5">Nama</th>
                    <th className="px-6 py-3.5">Username / Email</th>
                    <th className="px-6 py-3.5">Kredensial</th>
                    <th className="px-6 py-3.5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id || index} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4 text-center font-bold text-gray-400">{index + 1}.</td>
                      <td className="px-6 py-4 font-bold text-gray-800">{user.nama}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="font-mono bg-gray-50 text-gray-400 px-2 py-1 rounded-md border border-gray-100">
                          {user.password}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center flex items-center justify-center space-x-2">
                        {/* TOMBOL EDIT BARU */}
                        <button
                          type="button"
                          onClick={() => handleEditClick(user)}
                          className="px-3 py-1.5 bg-amber-50 text-amber-600 font-bold rounded-xl hover:bg-amber-500 hover:text-white transition-all text-[11px]"
                        >
                          Edit
                        </button>
                        {/* TOMBOL HAPUS */}
                        <button
                          type="button"
                          onClick={() => handleDelete(user.id, user.nama)}
                          disabled={loading}
                          className="px-3 py-1.5 bg-red-50 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all text-[11px]"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}