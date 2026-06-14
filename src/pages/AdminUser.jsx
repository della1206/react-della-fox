import React, { useState } from "react";

export default function AdminUser() {
  // Data simulasi user/admin di Berry Laundry
  const [users, setUsers] = useState([
    { id: 1, nama: "Della Admin", email: "della@laundry.com", role: "Super Admin", status: "Aktif" },
    { id: 2, nama: "Budi Kasir", email: "budi.kasir@laundry.com", role: "Kasir", status: "Aktif" },
    { id: 3, nama: "Siti Kurir", email: "siti.kurir@laundry.com", role: "Kurir", status: "Istirahat" },
  ]);

  // State untuk form tambah user sederhana
  const [form, setForm] = useState({ nama: "", email: "", role: "Kasir" });

  const handleTambahUser = (e) => {
    e.preventDefault();
    if (!form.nama || !form.email) return alert("Lengkapi data user baru!");
    
    const newUser = {
      id: users.length + 1,
      nama: form.nama,
      email: form.email,
      role: form.role,
      status: "Aktif"
    };

    setUsers([...users, newUser]);
    setForm({ nama: "", email: "", role: "Kasir" });
    alert("User baru berhasil ditambahkan!");
  };

  return (
    <div className="p-6 space-y-6 font-sans animate-in fade-in duration-300">
      {/* HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Manajemen Admin & User</h2>
          <p className="text-gray-400 text-xs mt-1">Kelola hak akses dan staf operasional Berry Laundry.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* KANAN: FORM TAMBAH USER */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
          <h3 className="font-bold text-gray-800 text-sm mb-4">Tambah Staf Baru ✨</h3>
          <form onSubmit={handleTambahUser} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                placeholder="Nama Staf"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#5da5e8]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@laundry.com"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#5da5e8]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Role / Jabatan</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#5da5e8]"
              >
                <option>Kasir</option>
                <option>Kurir</option>
                <option>Admin Utama</option>
              </select>
            </div>
            <button className="w-full bg-[#5da5e8] hover:bg-[#4a8ecc] text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md shadow-[#5da5e8]/20">
              Simpan Staf
            </button>
          </form>
        </div>

        {/* KIRI: TABEL DAFTAR USER */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-50 bg-gray-50/50">
            <h3 className="font-bold text-gray-700 text-xs">Daftar Pengguna Aktif</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/30 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Nama Staf</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs text-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-800">{user.nama}</div>
                      <div className="text-[10px] text-gray-400">{user.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md font-semibold text-[10px]">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        user.status === "Aktif" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}