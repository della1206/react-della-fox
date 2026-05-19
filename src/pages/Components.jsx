import React from "react";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import Table from "../components/Table";
import Footer from "../components/Footer";
import { BsEnvelope, BsLock, BsGift, BsStarFill, BsShieldCheck, BsSearch, BsCheckCircle, BsHouse, BsWhatsapp, BsTag } from "react-icons/bs";

export default function Components() {

  const CheckboxField = ({ label }) => (
    <div className="flex items-center space-x-2 pt-2">
      <input type="checkbox" id="terms" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
      <label htmlFor="terms" className="text-xs font-semibold text-gray-500 cursor-pointer">{label}</label>
    </div>
  );
  const ServiceChecklistItem = ({ label, checked }) => (
    <div className="flex items-center space-x-2 text-xs text-gray-600 p-1">
      <BsCheckCircle className={checked ? "text-green-500" : "text-gray-300"} />
      <span className="font-medium">{label}</span>
    </div>
  );
  const PromoVoucherCard = ({ code, discount }) => (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl shadow-md max-w-xs">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">Voucher</span>
        <BsGift />
      </div>
      <h4 className="text-lg font-black mt-2">{discount}</h4>
      <p className="text-[11px] font-mono bg-black/20 mt-2 p-1 rounded text-center tracking-widest">{code}</p>
    </div>
  );

  const CustomerReviewCard = ({ customer, comment }) => (
    <Card className="border-l-4 border-l-blue-600 bg-white p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold text-xs text-gray-700">{customer}</span>
        <div className="flex text-amber-400 text-[10px]"><BsStarFill/><BsStarFill/><BsStarFill/><BsStarFill/><BsStarFill/></div>
      </div>
      <p className="text-gray-500 text-xs italic">"{comment}"</p>
    </Card>
  );

  const StockProgressBar = ({ label, current, total, colorClass }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-semibold">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-400">Sisa {current} {total}</span>
      </div>
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${(current / 10) * 100}%` }} />
      </div>
    </div>
  );

  return (
    <Container className="bg-white min-h-screen font-sans antialiased text-gray-800">
      
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1e293b] tracking-tight">Components</h1>
        <p className="text-gray-400 text-sm mt-1">Components BerryLaundry</p>
      </div>

      <div className="space-y-12">
        
        <div>
          <h2 className="text-2xl font-bold text-[#1e293b] pb-2 border-b-2 border-gray-100">Basic Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 items-center">
            
            <div>
              <span className="text-xs text-gray-400 block mb-2 font-medium">Button</span>
              <div className="flex flex-wrap gap-2">
                <button className="bg-[#1d4ed8] hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all">Primary</button>
                <button className="bg-[#f1f5f9] hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl text-sm transition-all">Secondary</button>
                <button className="bg-[#ef4444] hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all">Danger</button>
              </div>
            </div>

            <div>
              <span className="text-xs text-gray-400 block mb-2 font-medium">Badge</span>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-lg">Menunggu</span>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-lg">Diproses</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-lg">Selesai</span>
              </div>
            </div>

            <div>
              <span className="text-xs text-gray-400 block mb-2 font-medium">Avatar </span>
              <div className="flex items-center space-x-2 pt-1">
                <Avatar name="Della" size="md" />
                <Avatar name="Hendra" size="md" />
                <Avatar name="Suci" size="md" />
                <h1 className="text-xl font-bold text-gray-800 tracking-tight pl-1">
                  Berry<span className="text-blue-600">Laundry</span><span className="text-blue-600">.</span>
                </h1>
              </div>
            </div>

          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#1e293b] pb-2 border-b-2 border-gray-100">Layout Components</h2>
          <div className="mt-4">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 w-full">
              <p className="text-gray-500 text-sm font-medium">Ini adalah konten di dalam Card komponen.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#1e293b] pb-2 border-b-2 border-gray-100">Data Display Components</h2>
          <div className="mt-4 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="flex items-center space-x-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl text-xl">
                  <BsHouse />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Total Pendapatan</p>
                  <h3 className="text-2xl font-extrabold text-gray-800 mt-0.5">Rp 2.500.000</h3>
                </div>
              </Card>

              <Card className="space-y-4">
                <StockProgressBar label="Deterjen" current={5} total="Liter" colorClass="bg-blue-500" />
                <StockProgressBar label="Pewangi" current={1} total="Jerigen" colorClass="bg-red-500" />
              </Card>
            </div>

            <div className="space-y-2">
              <Table headers={["NO", "LAYANAN", "AKSI"]}>
                <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">1</td>
                  <td className="px-5 py-4 font-bold text-gray-800">Cuci Komplit</td>
                  <td className="px-5 py-4">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-4 py-1.5 rounded-lg transition-all">
                      Edit
                    </button>
                  </td>
                </tr>
              </Table>
            </div>

          </div>
        </div>


        <div>
          <h2 className="text-2xl font-bold text-[#1e293b] pb-2 border-b-2 border-gray-100"> Form Components</h2>
          <div className="mt-4 max-w-xl space-y-4">
            
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-gray-700 block">Email Address</span>
              <div className="flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 w-full">
                <BsEnvelope className="text-gray-400 mr-3 text-lg" />
                <input type="text" placeholder="Masukkan email..." className="w-full bg-transparent text-sm outline-none text-gray-600 placeholder-gray-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-gray-700 block">Password</span>
              <div className="flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 w-full">
                <BsLock className="text-gray-400 mr-3 text-lg" />
                <input type="password" placeholder="Masukkan sandi rahasia..." className="w-full bg-transparent text-sm outline-none text-gray-600 placeholder-gray-400" />
                <span className="text-gray-400 text-sm cursor-pointer select-none ml-2">👁</span>
              </div>
            </div>

            <CheckboxField label="Saya setuju dengan syarat & ketentuan" />

          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#1e293b] pb-2 border-b-2 border-gray-100">Feedback Components</h2>
          <div className="mt-4 max-w-xl space-y-4">
            
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md rounded-xl p-4 flex items-center justify-between transition-all">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg text-lg">
                  <BsWhatsapp />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider opacity-85">WhatsApp Gateway</h4>
                  <p className="text-sm font-semibold">Nota TRX-401 terkirim ke pelanggan!</p>
                </div>
              </div>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-bold">LIVE</span>
            </div>

            <div className="bg-[#ede7f6] border border-[#d1c4e9] text-[#5e35b1] rounded-xl p-4 flex items-center space-x-3 text-xs font-bold shadow-sm">
              <BsTag className="text-lg flex-shrink-0 text-[#7c4dff]" />
              <p>Masa aktif membership Anda berlaku sampai <span className="underline">Desember 2026</span>. Terus kumpulkan poinnya!</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-gray-400 block font-medium">BerryLaundry Processing Status</span>
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center space-y-3">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xs font-black animate-pulse">
                    WASH
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-500 tracking-wide">Mesin 02: Sedang Mencuci Baju Kiloan</p>
              </div>
            </div>

          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#1e293b] pb-2 border-b-2 border-gray-100"> Section Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 items-start">
            
            <div className="space-y-2">
              <span className="text-xs text-gray-400 block font-medium">Kupon Promosi</span>
              <PromoVoucherCard code="BERRYLOYAL20" discount="Diskon Kilat Rp 20K" />
            </div>

            <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="text-xs text-gray-400 block font-medium uppercase tracking-wide">Opsi Layanan Ekstra</span>
              <ServiceChecklistItem label="Parfum Premium Anti-Apek" checked={true} />
              <ServiceChecklistItem label="Setrika Uap Anti-Kusut" checked={true} />
              <ServiceChecklistItem label="Selesai Instan &lt; 6 Jam" checked={false} />
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </Container>
  );
}