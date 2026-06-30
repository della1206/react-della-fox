import React, { useState } from "react";
import {
  BsClock,
  BsDropletHalf,
  BsGear,
  BsPencilSquare,
  BsPlusLg,
  BsTag,
  BsTrash,
} from "react-icons/bs";

const initialServices = [
  { name: "Cuci Kiloan Reguler", price: "Rp 7.000/kg", estimate: "2 Hari", status: "Aktif" },
  { name: "Cuci Komplit", price: "Rp 10.000/kg", estimate: "2 Hari", status: "Aktif" },
  { name: "Setrika Saja", price: "Rp 5.000/kg", estimate: "1 Hari", status: "Aktif" },
  { name: "Dry Clean", price: "Rp 35.000/pcs", estimate: "3 Hari", status: "Aktif" },
  { name: "Express 6 Jam", price: "+ Rp 8.000/kg", estimate: "6 Jam", status: "Terbatas" },
];

const initialPromos = [
  { title: "Member Hemat", detail: "Diskon 10% untuk pelanggan member", code: "MEMBER10" },
  { title: "Pelanggan Baru", detail: "Potongan Rp 15.000 untuk transaksi pertama", code: "NEWBERRY" },
  { title: "Express Weekend", detail: "Gratis upgrade express untuk minimal 8 kg", code: "WEEKEND8" },
];

const stocks = [
  { name: "Deterjen", amount: "18 Liter", level: 72, color: "bg-blue-500" },
  { name: "Pewangi", amount: "9 Liter", level: 45, color: "bg-violet-500" },
  { name: "Plastik Packing", amount: "120 pcs", level: 60, color: "bg-emerald-500" },
  { name: "Label Resi", amount: "36 lembar", level: 28, color: "bg-amber-500" },
];

const orderStatuses = [
  "Menunggu Jemput",
  "Diterima",
  "Dicuci",
  "Disetrika",
  "Siap Diambil",
  "Selesai",
];

export default function Components() {
  const emptyForm = { name: "", price: "", estimate: "", status: "Aktif" };
  const emptyPromoForm = { title: "", detail: "", code: "" };
  const [serviceList, setServiceList] = useState(initialServices);
  const [promoList, setPromoList] = useState(initialPromos);
  const [form, setForm] = useState(emptyForm);
  const [promoForm, setPromoForm] = useState(emptyPromoForm);
  const [modalMode, setModalMode] = useState(null);
  const [promoModalMode, setPromoModalMode] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedPromoIndex, setSelectedPromoIndex] = useState(null);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [promoToDelete, setPromoToDelete] = useState(null);

  const activeCount = serviceList.filter((service) => service.status === "Aktif").length;

  const openAddModal = () => {
    setForm(emptyForm);
    setSelectedIndex(null);
    setModalMode("add");
  };

  const openDetailModal = (service, index) => {
    setForm(service);
    setSelectedIndex(index);
    setModalMode("detail");
  };

  const closeServiceModal = () => {
    setModalMode(null);
    setSelectedIndex(null);
    setForm(emptyForm);
  };

  const saveService = (event) => {
    event.preventDefault();

    if (modalMode === "add") {
      setServiceList([...serviceList, form]);
    }

    if (modalMode === "detail" && selectedIndex !== null) {
      setServiceList(
        serviceList.map((service, index) => (index === selectedIndex ? form : service))
      );
    }

    closeServiceModal();
  };

  const deleteService = () => {
    setServiceList(serviceList.filter((service) => service.name !== serviceToDelete.name));
    setServiceToDelete(null);
  };

  const openAddPromoModal = () => {
    setPromoForm(emptyPromoForm);
    setSelectedPromoIndex(null);
    setPromoModalMode("add");
  };

  const openPromoDetailModal = (promo, index) => {
    setPromoForm(promo);
    setSelectedPromoIndex(index);
    setPromoModalMode("detail");
  };

  const closePromoModal = () => {
    setPromoModalMode(null);
    setSelectedPromoIndex(null);
    setPromoForm(emptyPromoForm);
  };

  const savePromo = (event) => {
    event.preventDefault();

    if (promoModalMode === "add") {
      setPromoList([...promoList, promoForm]);
    }

    if (promoModalMode === "detail" && selectedPromoIndex !== null) {
      setPromoList(
        promoList.map((promo, index) => (index === selectedPromoIndex ? promoForm : promo))
      );
    }

    closePromoModal();
  };

  const deletePromo = () => {
    setPromoList(promoList.filter((promo) => promo.code !== promoToDelete.code));
    setPromoToDelete(null);
    closePromoModal();
  };

  return (
    <div className="space-y-6 text-left">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-normal text-gray-900">Layanan Laundry</h1>
          <p className="mt-1 text-sm font-medium text-gray-400">
            Kelola harga, estimasi, promo, dan kebutuhan operasional laundry.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2f6bea] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
          <BsPlusLg />
          Tambah Layanan
        </button>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-lg bg-[#5da5e8] p-5 text-white shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <BsDropletHalf className="text-2xl text-white/50" />
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black">{activeCount} Aktif</span>
          </div>
          <p className="text-3xl font-black">{serviceList.length}</p>
          <p className="mt-2 text-xs font-black uppercase tracking-widest text-white/90">Total Layanan</p>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="mb-5 flex items-center justify-between">
            <BsTag className="text-2xl text-blue-500" />
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600">{promoList.length} Promo</span>
          </div>
          <p className="text-3xl font-black text-gray-900">Rp 7K</p>
          <p className="mt-2 text-xs font-black uppercase tracking-widest text-gray-400">Harga Mulai</p>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="mb-5 flex items-center justify-between">
            <BsClock className="text-2xl text-emerald-500" />
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-600">Cepat</span>
          </div>
          <p className="text-3xl font-black text-gray-900">6 Jam</p>
          <p className="mt-2 text-xs font-black uppercase tracking-widest text-gray-400">Estimasi Express</p>
        </div>
      </section>

      <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-black text-gray-900">Daftar Layanan</h2>
          <button type="button" className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50">
            <BsGear />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-black uppercase tracking-wider text-gray-400">
                <th className="py-3 pr-4">Layanan</th>
                <th className="py-3 pr-4">Harga</th>
                <th className="py-3 pr-4">Estimasi</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {serviceList.map((service, index) => (
                <tr key={service.name} className="border-b border-gray-50 text-sm last:border-0">
                  <td className="py-4 pr-4 font-bold text-gray-900">{service.name}</td>
                  <td className="py-4 pr-4 text-gray-600">{service.price}</td>
                  <td className="py-4 pr-4 text-gray-600">{service.estimate}</td>
                  <td className="py-4 pr-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                      {service.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openDetailModal(service, index)}
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                        aria-label={`Lihat detail ${service.name}`}
                      >
                        <BsPencilSquare />
                      </button>
                      <button
                        type="button"
                        onClick={() => setServiceToDelete(service)}
                        className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                        aria-label={`Hapus ${service.name}`}
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
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-black text-gray-900">Paket & Promo</h2>
            <button
              type="button"
              onClick={openAddPromoModal}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-xs font-black text-blue-600 transition hover:bg-blue-100"
            >
              <BsPlusLg />
              Tambah Promo
            </button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {promoList.map((promo, index) => (
              <button
                key={promo.code}
                type="button"
                onClick={() => openPromoDetailModal(promo, index)}
                className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-sm"
              >
                <p className="text-sm font-black text-gray-900">{promo.title}</p>
                <p className="mt-2 min-h-[40px] text-xs font-medium leading-relaxed text-gray-500">{promo.detail}</p>
                <p className="mt-4 rounded-md bg-white px-3 py-2 text-center text-xs font-black tracking-widest text-blue-600">
                  {promo.code}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-gray-900">Alur Status Pesanan</h2>
          <div className="mt-5 space-y-3">
            {orderStatuses.map((status, index) => (
              <div key={status} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-black text-blue-600">
                  {index + 1}
                </span>
                <span className="text-sm font-bold text-gray-700">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-gray-900">Stok Operasional</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stocks.map((stock) => (
            <div key={stock.name} className="rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-gray-800">{stock.name}</p>
                <p className="text-xs font-bold text-gray-400">{stock.amount}</p>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                <div className={`h-full rounded-full ${stock.color}`} style={{ width: `${stock.level}%` }} />
              </div>
              <p className="mt-2 text-xs font-bold text-gray-400">{stock.level}% tersedia</p>
            </div>
          ))}
        </div>
      </section>

      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white shadow-2xl">
            <div className="border-b border-gray-100 p-6">
              <h2 className="text-2xl font-black text-gray-900">
                {modalMode === "add" ? "Tambah Layanan" : "Detail Layanan"}
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                {modalMode === "add"
                  ? "Masukkan layanan laundry baru."
                  : "Lihat dan ubah informasi layanan laundry."}
              </p>
            </div>

            <form onSubmit={saveService} className="space-y-4 p-6">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-500">
                  Nama Layanan
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Contoh: Cuci Sepatu"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-500">
                    Harga
                  </label>
                  <input
                    required
                    value={form.price}
                    onChange={(event) => setForm({ ...form, price: event.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Contoh: Rp 25.000/pcs"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-500">
                    Estimasi
                  </label>
                  <input
                    required
                    value={form.estimate}
                    onChange={(event) => setForm({ ...form, estimate: event.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Contoh: 1 Hari"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-500">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(event) => setForm({ ...form, status: event.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Terbatas">Terbatas</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeServiceModal}
                  className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#2f6bea] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  {modalMode === "add" ? "Simpan Layanan" : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {serviceToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-black text-gray-900">Hapus Layanan</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Yakin ingin menghapus <span className="font-bold text-gray-800">{serviceToDelete.name}</span> dari daftar layanan?
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setServiceToDelete(null)}
                className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={deleteService}
                className="rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {promoModalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white shadow-2xl">
            <div className="border-b border-gray-100 p-6">
              <h2 className="text-2xl font-black text-gray-900">
                {promoModalMode === "add" ? "Tambah Promo" : "Detail Promo"}
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                {promoModalMode === "add"
                  ? "Masukkan paket atau voucher promo baru."
                  : "Lihat dan ubah informasi paket promo."}
              </p>
            </div>

            <form onSubmit={savePromo} className="space-y-4 p-6">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-500">
                  Nama Promo
                </label>
                <input
                  required
                  value={promoForm.title}
                  onChange={(event) => setPromoForm({ ...promoForm, title: event.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Contoh: Promo Akhir Bulan"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-500">
                  Detail Promo
                </label>
                <textarea
                  required
                  rows="3"
                  value={promoForm.detail}
                  onChange={(event) => setPromoForm({ ...promoForm, detail: event.target.value })}
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Contoh: Diskon 15% untuk minimal transaksi Rp 100.000"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-gray-500">
                  Kode Voucher
                </label>
                <input
                  required
                  value={promoForm.code}
                  onChange={(event) => setPromoForm({ ...promoForm, code: event.target.value.toUpperCase() })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm font-black uppercase tracking-widest outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Contoh: HEMAT15"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {promoModalMode === "detail" && (
                    <button
                      type="button"
                      onClick={() => setPromoToDelete(promoForm)}
                      className="rounded-lg bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                    >
                      Hapus Promo
                    </button>
                  )}
                </div>
                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={closePromoModal}
                    className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#2f6bea] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    {promoModalMode === "add" ? "Simpan Promo" : "Simpan Perubahan"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {promoToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-black text-gray-900">Hapus Promo</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Yakin ingin menghapus promo <span className="font-bold text-gray-800">{promoToDelete.title}</span>?
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPromoToDelete(null)}
                className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={deletePromo}
                className="rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
