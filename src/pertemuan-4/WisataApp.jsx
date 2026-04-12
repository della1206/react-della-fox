import React, { useState } from 'react';
import wisataData from './wisata.json';

export default function WisataApp() {
  const [activeTab, setActiveTab] = useState("guest");
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedKategori: "",
    selectedProvinsi: ""
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm(prev => ({ ...prev, [name]: value }));
  };

  const filteredWisata = wisataData.filter((item) => {
    const matchesSearch = item.nama.toLowerCase().includes(dataForm.searchTerm.toLowerCase()) ||
                          item.deskripsi.toLowerCase().includes(dataForm.searchTerm.toLowerCase());
    const matchesKategori = dataForm.selectedKategori ? item.kategori === dataForm.selectedKategori : true;
    const matchesProvinsi = dataForm.selectedProvinsi ? item.lokasi.provinsi === dataForm.selectedProvinsi : true;
    return matchesSearch && matchesKategori && matchesProvinsi;
  });

  const allKategori = [...new Set(wisataData.map(item => item.kategori))];
  const allProvinsi = [...new Set(wisataData.map(item => item.lokasi.provinsi))];

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* NAVIGASI UTAMA */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
            TRAVEL<span className="text-blue-600">ID</span>
          </h1>
          
          <div className="flex bg-gray-200 p-1 rounded-2xl shadow-inner">
            <button 
              onClick={() => setActiveTab("guest")}
              className={`px-8 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'guest' ? 'bg-white shadow-md text-blue-600' : 'text-gray-500'}`}
            >
              GUEST 
            </button>
            <button 
              onClick={() => setActiveTab("admin")}
              className={`px-8 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'admin' ? 'bg-gray-800 shadow-md text-white' : 'text-gray-500'}`}
            >
              ADMIN 
            </button>
          </div>
        </div>

        {/* SEARCH & FILTER BOX */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="searchTerm"
            placeholder="Cari destinasi wisata..."
            className="p-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={handleChange}
          />
          <select name="selectedKategori" className="p-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none" onChange={handleChange}>
            <option value="">Semua Kategori</option>
            {allKategori.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          <select name="selectedProvinsi" className="p-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none" onChange={handleChange}>
            <option value="">Semua Provinsi</option>
            {allProvinsi.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {activeTab === "guest" ? (
          /* --- TAMPILAN GUEST: GRID CARD --- */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredWisata.map((item) => (
              <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-200 hover:shadow-2xl transition-all group">
                <div className="h-52 bg-gray-200 relative">
                  <img 
                    src={item.gambar} 
                    alt={item.nama} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Gambar+Tidak+Tersedia" }}
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none">{item.kategori}</span>
                  <h3 className="text-xl font-bold text-gray-800 mt-1 mb-2">{item.nama}</h3>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed">{item.deskripsi}</p>
                  <div className="text-[10px] font-bold text-gray-400 mb-4">📍 {item.lokasi.kota.toUpperCase()}, {item.lokasi.provinsi.toUpperCase()}</div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => <span key={i} className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-[9px] font-bold tracking-tighter">#{tag.toUpperCase()}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- TAMPILAN ADMIN: TABEL RAPI & PEMBATAS JELAS --- */
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-white text-[11px] font-bold uppercase tracking-widest">
                    <th className="px-6 py-5 text-center border-r border-gray-700">ID</th>
                    <th className="px-6 py-5 text-left border-r border-gray-700">Pratinjau</th>
                    <th className="px-6 py-5 text-left border-r border-gray-700">Detail Destinasi</th>
                    <th className="px-6 py-5 text-left border-r border-gray-700">Lokasi (Nested)</th>
                    <th className="px-6 py-4 text-center border-r border-gray-700">Rating</th>
                    <th className="px-6 py-4 text-right">Harga Tiket</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredWisata.map((item, index) => (
                    <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50 transition-colors`}>
                      <td className="px-6 py-4 text-center font-mono text-xs text-gray-300 border-r border-gray-100">#{item.id}</td>
                      <td className="px-6 py-4 border-r border-gray-100">
                        <img 
                          src={item.gambar} 
                            alt={item.nama} 
                            className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Error" }}
                        />
                      </td>
                      <td className="px-6 py-4 border-r border-gray-100">
                        <div className="font-bold text-gray-800">{item.nama}</div>
                        <div className="text-[10px] text-blue-500 font-bold uppercase">{item.kategori}</div>
                      </td>
                      <td className="px-6 py-4 border-r border-gray-100">
                        <span className="text-xs font-bold text-gray-700 block">{item.lokasi.kota}</span>
                        <span className="text-[10px] text-gray-400 uppercase">{item.lokasi.provinsi}</span>
                      </td>
                      <td className="px-6 py-4 text-center border-r border-gray-100">
                        <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[11px] font-black">
                          ⭐ {item.statistik.rating}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-green-600 text-sm">
                        {item.statistik.tiket_masuk}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 p-4 text-center border-t border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Total: {filteredWisata.length} Destinasi Wisata
            </div>
          </div>
        )}

        {filteredWisata.length === 0 && (
          <div className="mt-10 p-20 text-center border-2 border-dashed border-gray-200 rounded-[3rem]">
            <p className="text-gray-400 font-bold uppercase tracking-widest">Data Tidak Ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}