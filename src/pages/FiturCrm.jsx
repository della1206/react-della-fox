import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button"; 

export default function FiturCrm() {
  const [isNotificationOn, setIsNotificationOn] = useState(true);

  return (
    <div className="fixed left-64 top-24 right-0 bottom-0 w-[calc(100%-16rem)] min-h-screen bg-gray-50/50 p-6 flex flex-col items-start justify-start overflow-y-auto box-border">
      
      <div className="w-full space-y-6">
        
        {/* Bagian Header Fitur */}
        <div className="flex flex-col gap-1 text-left w-full">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Customer Feature 
          </h2>
          <p className="text-base text-gray-400 font-medium">
            Sistem manajemen loyalitas dan retensi pelanggan BerryLaundry.
          </p>
        </div>
        
        {/* Box Kontainer Utama */}
        <div className="w-full p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-6 text-left mt-4">
          
          {/* SECTION 1: DIALOG & SELECT */}
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="font-semibold text-gray-800 text-lg">Database Pelanggan & Member</p>
              <p className="text-sm text-gray-500">Tambah data pelanggan baru dan klasifikasikan tipe member laundry.</p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#5e35b1] hover:bg-[#4527a0] text-white px-5 py-2 rounded-xl transition-all">
                  Tambah Pelanggan
                </Button>
              </DialogTrigger>
              
              <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-full max-w-md bg-white p-6 border border-gray-200 rounded-2xl shadow-xl space-y-4 focus:outline-none">
                <DialogHeader className="space-y-1">
                  <DialogTitle className="text-lg font-bold text-gray-900 text-left">Form Pelanggan Baru</DialogTitle>
                  <DialogDescription className="text-sm text-gray-500 text-left">
                    Masukkan data profil pelanggan untuk melacak riwayat transaksi laundry.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-2 text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Nama Pelanggan</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Budi Santoso" 
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
                        <SelectItem value="prospect" className="hover:bg-gray-50 py-2 px-3 text-sm rounded-lg cursor-pointer">Member Reguler</SelectItem>
                        <SelectItem value="negotiation" className="hover:bg-gray-50 py-2 px-3 text-sm rounded-lg cursor-pointer">Member Silver (Diskon 5%)</SelectItem>
                        <SelectItem value="closed-won" className="hover:bg-gray-50 py-2 px-3 text-sm rounded-lg cursor-pointer">Member Gold (Diskon 10%)</SelectItem>
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
          </div>

          <hr className="border-gray-100" />

          {/* SECTION 2: SWITCH (Warna background mati diatur menjadi hitam dengan data-[state=unchecked]:bg-black) */}
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="font-semibold text-gray-800 text-lg">
                {isNotificationOn ? "WhatsApp Bot: Siap Diambil" : "WhatsApp Bot: Masih Diproses"}
              </p>
              <p className="text-sm text-gray-500">
                {isNotificationOn 
                  ? "Kirim notifikasi otomatis ke pelanggan bahwa pakaian telah selesai dicuci, rapi dipacking, dan siap diambil."
                  : "Pakaian pelanggan masih dalam antrean cuci/setrika. Notifikasi otomatis ditangguhkan hingga cucian selesai dipacking."
                }
              </p>
            </div>
            <Switch 
              checked={isNotificationOn} 
              onCheckedChange={setIsNotificationOn} 
              className="data-[state=checked]:bg-[#5e35b1] data-[state=unchecked]:bg-black"
            />
          </div>

        </div>
      </div>
    </div>
  );
}