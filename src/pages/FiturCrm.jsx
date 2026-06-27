import React, { useState } from "react";
import { Search, Download, Plus, Eye, Edit, Trash2, Award, CheckCircle2, XCircle, Phone, Mail, MapPin, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const INITIAL_LAUNDRY = [
  { id: "LND-0001", nama: "Budi Santoso", gender: "Laki-laki", kontak: "081234567890", email: "budi.santoso@gmail.com", alamat: "Jl. Sudirman No. 12", level: "Gold", total: "Rp 1.250.000", tanggal: "2026-05-25", status: "Aktif" },
  { id: "LND-0002", nama: "Jessica Mila", gender: "Perempuan", kontak: "081298765432", email: "jessica.m@gmail.com", alamat: "Jl. Tuanku Tambusai No. 45", level: "Silver", total: "Rp 520.000", tanggal: "2026-05-28", status: "Aktif" },
  { id: "LND-0003", nama: "Andi Wijaya", gender: "Laki-laki", kontak: "085311223344", email: "andi.wijaya@gmail.com", alamat: "Jl. Soebrantas No. 88", level: "Reguler", total: "Rp 120.000", tanggal: "2026-05-12", status: "Tidak Aktif" },
  { id: "LND-0004", nama: "Siti Rahma", gender: "Perempuan", kontak: "087744556677", email: "siti.rahma@gmail.com", alamat: "Jl. Arifin Ahmad No. 101", level: "Silver", total: "Rp 450.000", tanggal: "2026-05-30", status: "Aktif" },
];

export default function FiturCrm() {
  const [customers, setCustomers] = useState(INITIAL_LAUNDRY);
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // State Form Tambah Pelanggan Lengkap
  const [formData, setFormData] = useState({ 
    nama: "", 
    gender: "Laki-laki", 
    kontak: "", 
    alamat: "", 
    level: "Reguler",
    total: "0",
    tanggal: new Date().toISOString().split('T')[0]
  });
  
  // State Form Edit Pelanggan Lengkap
  const [editData, setEditData] = useState({ 
    id: "", 
    nama: "", 
    gender: "", 
    kontak: "", 
    alamat: "", 
    level: "", 
    status: "",
    total: "",
    tanggal: ""
  });

  const tabs = ["Semua", "Gold", "Silver", "Reguler"];

  const filteredCustomers = customers.filter((customer) => {
    const matchesTab = activeTab === "Semua" || customer.level === activeTab;
    const matchesSearch = 
      customer.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Helper untuk format angka ke Rupiah
  const formatRupiah = (angka) => {
    const cleanNumber = angka.replace(/[^0-9]/g, "");
    if (!cleanNumber) return "Rp 0";
    return "Rp " + new Intl.NumberFormat("id-ID").format(cleanNumber);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const nextIdNumber = customers.length + 1;
    const generatedId = `LND-${String(nextIdNumber).padStart(4, '0')}`;

    const newCustomer = {
      id: generatedId,
      nama: formData.nama,
      gender: formData.gender,
      kontak: formData.kontak,
      email: `${formData.nama.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      alamat: formData.alamat || "Alamat belum diisi",
      level: formData.level,
      total: formatRupiah(formData.total),
      tanggal: formData.tanggal || new Date().toISOString().split('T')[0],
      status: "Aktif"
    };

    setCustomers([newCustomer, ...customers]);
    setFormData({ nama: "", gender: "Laki-laki", kontak: "", alamat: "", level: "Reguler", total: "0", tanggal: new Date().toISOString().split('T')[0] });
    setIsOpenAdd(false);
  };

  const handleEditClick = (customer) => {
    // Hilangkan teks "Rp " dan titik desimal agar mudah diedit sebagai angka di input field
    const rawTotal = customer.total.replace(/[^0-9]/g, "");
    
    setEditData({
      id: customer.id,
      nama: customer.nama,
      gender: customer.gender,
      kontak: customer.kontak,
      alamat: customer.alamat,
      level: customer.level,
      status: customer.status,
      total: rawTotal,
      tanggal: customer.tanggal
    });
    setIsOpenEdit(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setCustomers(customers.map((c) => 
      c.id === editData.id 
        ? { 
            ...c, 
            nama: editData.nama, 
            gender: editData.gender,
            kontak: editData.kontak, 
            alamat: editData.alamat,
            level: editData.level,
            status: editData.status,
            total: formatRupiah(editData.total),
            tanggal: editData.tanggal
          } 
        : c
    ));
    setIsOpenEdit(false);
  };

  const handleDetailClick = (customer) => {
    setSelectedCustomer(customer);
    setIsOpenDetail(true);
  };

  const handleDeleteClick = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data pelanggan ini?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.split(" ");
    return parts.map(p => p[0]).join("").toUpperCase().slice(0, 2);
  };

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
            {/* MODAL: TAMBAH PELANGGAN LENGKAP */}
            <Dialog open={isOpenAdd} onOpenChange={setIsOpenAdd}>
              <DialogTrigger asChild>
                <Button className="bg-[#5e35b1] hover:bg-[#4527a0] text-white font-bold px-4 py-2 h-[42px] rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer">
                  <Plus className="w-4 h-4" /> Tambah Pelanggan
                </Button>
              </DialogTrigger>
              <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-full max-w-md bg-white p-6 border border-slate-200 rounded-2xl shadow-xl focus:outline-none max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold text-gray-900 text-left">Form Pelanggan Baru</DialogTitle>
                  <DialogDescription className="text-sm text-gray-500 text-left">Masukkan profil lengkap data pelanggan baru untuk riwayat CRM.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddSubmit} className="space-y-4 py-2 text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Nama Lengkap</label>
                    <input type="text" required placeholder="Contoh: della Marcelina" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-600">Jenis Kelamin</label>
                      <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                        <SelectTrigger className="w-full h-10 border border-gray-200 rounded-xl bg-white text-sm">
                          <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-[60]">
                          <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                          <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-600">Kategori Member</label>
                      <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                        <SelectTrigger className="w-full h-10 border border-gray-200 rounded-xl bg-white text-sm">
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-[60]">
                          <SelectItem value="Gold">Member Gold</SelectItem>
                          <SelectItem value="Silver">Member Silver</SelectItem>
                          <SelectItem value="Reguler">Member Reguler</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Nomor HP</label>
                    <input type="text" required placeholder="Contoh: 081265719003" value={formData.kontak} onChange={(e) => setFormData({ ...formData, kontak: e.target.value })} className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Alamat Rumah</label>
                    <input type="text" required placeholder="Contoh: Jl. Arifin Ahmad No. 101" value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20 focus:border-[#5e35b1]" />
                  </div>
                  
                  {/* INPUT LENGKAP FINANCIAL DAN TANGGAL PADA FORM TAMBAH */}
                  <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-600">Total Transaksi (Rupiah)</label>
                      <input type="number" placeholder="0" value={formData.total} onChange={(e) => setFormData({ ...formData, total: e.target.value })} className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-600">Transaksi Terakhir</label>
                      <input type="date" value={formData.tanggal} onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })} className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e35b1]/20" />
                    </div>
                  </div>

                  <DialogFooter className="pt-2">
                    <Button type="submit" className="bg-[#5e35b1] hover:bg-[#4527a0] text-white px-5 py-2 rounded-xl text-sm font-semibold cursor-pointer">Simpan Data</Button>
                  </DialogFooter>
                </form>
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
            <input type="text" placeholder="Cari nama atau ID customer..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all" />
          </div>
          <div className="text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            Menampilkan <span className="text-slate-700 font-bold">{filteredCustomers.length}</span> Pelanggan
          </div>
        </div>

        {/* Tabel Data */}
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
                    }`}>{customer.level}</span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">{customer.total}</td>
                  <td className="py-4 px-6 text-xs text-slate-500">{customer.tanggal}</td>
                  <td className="py-4 px-6">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${customer.status === "Aktif" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>{customer.status}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-4">
                      <button onClick={() => handleDetailClick(customer)} className="text-blue-500 hover:text-blue-700 transition-colors p-1 cursor-pointer">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleEditClick(customer)} className="text-orange-500 hover:text-orange-700 transition-colors p-1 cursor-pointer">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDeleteClick(customer.id)} className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL 1: DETAIL PELANGGAN DESAIN MENARIK */}
        <Dialog open={isOpenDetail} onOpenChange={setIsOpenDetail}>
          <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-full max-w-lg bg-white p-0 border border-slate-200 rounded-2xl shadow-xl overflow-hidden focus:outline-none">
            {selectedCustomer && (
              <div className="text-left">
                <div className="bg-gradient-to-r from-[#5e35b1] to-[#7e57c2] p-6 text-white relative">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-xl font-bold tracking-wider">
                      {getInitials(selectedCustomer.nama)}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">{selectedCustomer.id}</span>
                      <h3 className="text-xl font-bold tracking-tight mt-1">{selectedCustomer.nama}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-6 bg-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-[#5e35b1] rounded-lg"><Award className="w-5 h-5" /></div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase">Kategori Member</p>
                        <p className="text-sm font-bold text-slate-800">{selectedCustomer.level}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${selectedCustomer.status === "Aktif" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                        {selectedCustomer.status === "Aktif" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase">Status Akun</p>
                        <p className={`text-sm font-bold ${selectedCustomer.status === "Aktif" ? "text-emerald-600" : "text-rose-600"}`}>{selectedCustomer.status}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">Informasi Kontak & Profil</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="text-slate-600"><span className="text-xs text-slate-400 block">Jenis Kelamin:</span><span className="font-semibold text-slate-800">{selectedCustomer.gender}</span></div>
                      <div className="text-slate-600"><span className="text-xs text-slate-400 block">Nomor HP:</span><span className="font-semibold text-slate-800">{selectedCustomer.kontak}</span></div>
                      <div className="text-slate-600"><span className="text-xs text-slate-400 block">Email:</span><span className="font-medium text-slate-800">{selectedCustomer.email}</span></div>
                      <div className="text-slate-600 md:col-span-2"><span className="text-xs text-slate-400 block">Alamat Tinggal:</span><span className="text-xs font-semibold text-slate-800">{selectedCustomer.alamat}</span></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5">Aktivitas Keuangan</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><p className="text-xs text-slate-400 flex items-center gap-1"><DollarSign className="w-3 h-3" /> Total Pengeluaran</p><p className="text-base font-extrabold text-slate-900">{selectedCustomer.total}</p></div>
                      <div><p className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> Transaksi Terakhir</p><p className="text-sm font-bold text-slate-700">{selectedCustomer.tanggal}</p></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                  <Button onClick={() => setIsOpenDetail(false)} className="bg-slate-200 text-slate-700 hover:bg-slate-300 px-5 py-2 rounded-xl text-sm font-bold">Tutup Profil</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* MODAL 2: FORM EDIT PELANGGAN (LENGKAP SELEURUH FIELD) */}
        <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
          <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-full max-w-md bg-white p-6 border border-slate-200 rounded-2xl shadow-xl focus:outline-none max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-gray-900 text-left">Edit Data Pelanggan</DialogTitle>
              <DialogDescription className="text-sm text-gray-500 text-left">Perbarui data profil CRM komprehensif pelanggan ini.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4 py-2 text-left">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Nama Lengkap</label>
                <input type="text" required value={editData.nama} onChange={(e) => setEditData({ ...editData, nama: e.target.value })} className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Jenis Kelamin</label>
                  <Select value={editData.gender} onValueChange={(value) => setEditData({ ...editData, gender: value })}>
                    <SelectTrigger className="w-full h-10 border border-gray-200 rounded-xl bg-white text-sm">
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-[60]">
                      <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Kategori Member</label>
                  <Select value={editData.level} onValueChange={(value) => setEditData({ ...editData, level: value })}>
                    <SelectTrigger className="w-full h-10 border border-gray-200 rounded-xl bg-white text-sm">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-[60]">
                      <SelectItem value="Gold">Member Gold</SelectItem>
                      <SelectItem value="Silver">Member Silver</SelectItem>
                      <SelectItem value="Reguler">Member Reguler</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Nomor HP</label>
                <input type="text" required value={editData.kontak} onChange={(e) => setEditData({ ...editData, kontak: e.target.value })} className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Alamat Rumah</label>
                <input type="text" required value={editData.alamat} onChange={(e) => setEditData({ ...editData, alamat: e.target.value })} className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500" />
              </div>

              {/* LENGKAP: EDIT INPUT UNTUK TOTAL TRANSAKSI & TANGGAL TRANSAKSI TERAKHIR */}
              <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Total Transaksi (Rupiah)</label>
                  <input type="number" required value={editData.total} onChange={(e) => setEditData({ ...editData, total: e.target.value })} className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Transaksi Terakhir</label>
                  <input type="date" required value={editData.tanggal} onChange={(e) => setEditData({ ...editData, tanggal: e.target.value })} className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Status Keaktifan</label>
                <Select value={editData.status} onValueChange={(value) => setEditData({ ...editData, status: value })}>
                  <SelectTrigger className="w-full h-10 border border-gray-200 rounded-xl bg-white text-sm">
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg z-[60]">
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="pt-2">
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-semibold cursor-pointer w-full">
                  Simpan Perubahan
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}