import React, { useState } from "react";
import { Search, Download, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DUMMY_LAUNDRY = [
  { id: "LND-0001", nama: "Budi Santoso", gender: "Laki-laki", kontak: "081234567890", email: "budi.santoso@gmail.com", alamat: "Jl. Sudirman No. 12", level: "Gold", total: "Rp 1.250.000", tanggal: "2026-05-25", status: "Aktif" },
  { id: "LND-0002", nama: "Jessica Mila", gender: "Perempuan", kontak: "081298765432", email: "jessica.m@gmail.com", alamat: "Jl. Tuanku Tambusai No. 45", level: "Silver", total: "Rp 520.000", tanggal: "2026-05-28", status: "Aktif" },
  { id: "LND-0003", nama: "Andi Wijaya", gender: "Laki-laki", kontak: "085311223344", email: "andi.wijaya@gmail.com", alamat: "Jl. Soebrantas No. 88", level: "Reguler", total: "Rp 120.000", tanggal: "2026-05-12", status: "Tidak Aktif" },
  { id: "LND-0004", nama: "Siti Rahma", gender: "Perempuan", kontak: "087744556677", email: "siti.rahma@gmail.com", alamat: "Jl. Arifin Ahmad No. 101", level: "Silver", total: "Rp 450.000", tanggal: "2026-05-30", status: "Aktif" },
];

export default function FiturCrm() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["Semua", "Gold", "Silver", "Reguler"];

  const filteredCustomers = DUMMY_LAUNDRY.filter((customer) => {
    const matchesTab = activeTab === "Semua" || customer.level === activeTab;
    const matchesSearch = 
      customer.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="fixed left-64 top-24 right-0 bottom-0 w-[calc(100%-16rem)] min-h-screen bg-slate-50/50 p-8 flex flex-col items-start justify-start overflow-y-auto box-border text-left">
      <div className="w-full space-y-6">
        
        {/* Header */}
        <div className="flex flex-col gap-1 w-full">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Manajemen Pelanggan (CRM)</h2>
          <p className="text-sm text-slate-400 font-medium">Analisis segmen keanggotaan dan riwayat aktivitas marketing BerryLaundry.</p>
        </div>

        {/* Tab & Tombol Utama */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full pt-2">
          <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === tab ? "bg-white text-[#5e35b1] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#5e35b1] hover:bg-[#4527a0] text-white font-bold px-4 py-2 h-[42px] rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer">
                  <Plus className="w-4 h-4" /> Tambah Pelanggan
                </Button>
              </DialogTrigger>
              
              <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-full max-w-md bg-white p-6 border border-slate-200 rounded-2xl shadow-xl space-y-4 focus:outline-none">
                <DialogHeader className="space-y-1">
                  <DialogTitle className="text-lg font-bold text-gray-900 text-left">Form Pelanggan Baru</DialogTitle>
                  <DialogDescription className="text-sm text-gray-500 text-left">
                    Masukkan profil data pelanggan baru untuk riwayat CRM BerryLaundry.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-2 text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Nama Lengkap</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Budi Santoso" 
                      className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1]" 
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Nomor HP</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: 081234567890" 
                      className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1]" 
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Kategori Member</label>
                    <Select>
                      <SelectTrigger className="w-full h-10 border border-gray-200 rounded-xl bg-white text-sm focus:ring-2 focus:ring-[#5e35b1]/20">
                        <SelectValue placeholder="Pilih Kategori Member" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-[60]">
                        <SelectItem value="Gold" className="hover:bg-gray-50 py-2 px-3 text-sm rounded-lg cursor-pointer">Member Gold</SelectItem>
                        <SelectItem value="Silver" className="hover:bg-gray-50 py-2 px-3 text-sm rounded-lg cursor-pointer">Member Silver</SelectItem>
                        <SelectItem value="Reguler" className="hover:bg-gray-50 py-2 px-3 text-sm rounded-lg cursor-pointer">Member Reguler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter className="flex justify-end gap-2 pt-2">
                  <Button type="submit" className="bg-[#5e35b1] hover:bg-[#4527a0] text-white px-4 py-2 rounded-xl text-sm">
                    Simpan Data
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2 h-[42px] rounded-xl flex items-center gap-2 border border-slate-200 shadow-none transition-all">
              <Download className="w-4 h-4" /> Export CSV (800 Baris)
            </Button>
          </div>
        </div>

        {/* Pencarian */}
        <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="relative w-full max-w-sm flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama atau ID customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            Menampilkan <span className="text-slate-700 font-bold">{filteredCustomers.length}</span> Pelanggan
          </div>
        </div>

        {/* Tabel Data - Kolom Sumber User Sudah Dihapus */}
        <div className="w-full bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">ID Customer</th>
                <th className="py-4 px-6">Nama Lengkap</th>
                <th className="py-4 px-6">Jenis Kelamin</th>
                <th className="py-4 px-6">Kontak & Alamat</th>
                <th className="py-4 px-6">Level Member</th>
                <th className="py-4 px-6">Total Transaksi</th>
                <th className="py-4 px-6">Transaksi Terakhir</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{customer.id}</td>
                  <td className="py-4 px-6 font-bold text-slate-800">{customer.nama}</td>
                  <td className="py-4 px-6 text-xs text-slate-600">{customer.gender}</td>
                  <td className="py-4 px-6 text-xs">
                    <p className="text-slate-800 font-semibold">{customer.kontak}</p>
                    <p className="text-slate-400 font-normal truncate max-w-[180px]">{customer.alamat}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold ${
                      customer.level === "Gold" ? "bg-amber-50 text-amber-600 border border-amber-200" : 
                      customer.level === "Silver" ? "bg-slate-100 text-slate-700 border border-slate-200" : 
                      "bg-indigo-50 text-indigo-600 border border-indigo-200"
                    }`}>
                      {customer.level}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">{customer.total}</td>
                  <td className="py-4 px-6 text-xs text-slate-500">{customer.tanggal}</td>
                  <td className="py-4 px-6">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${customer.status === "Aktif" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-blue-500 hover:text-blue-700 p-1"><Eye className="w-4 h-4" /></button>
                      <button className="text-orange-500 hover:text-orange-700 p-1"><Edit className="w-4 h-4" /></button>
                      <button className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}