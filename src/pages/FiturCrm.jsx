import React, { useState } from "react";
// 1. Import Komponen Dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
// 2. Import Komponen Select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// 3. Import Komponen Switch
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button"; 

export default function FiturCrm() {
  const [isNotificationOn, setIsNotificationOn] = useState(true);

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 className="text-xl font-bold mb-4">CRM Customer Feature (Pertemuan 11)</h2>
      
      <div className="p-4 border rounded-md space-y-6">
        {/* PENERAPAN DIALOG & SELECT */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Manajemen Data Pelanggan</p>
            <p className="text-sm text-gray-500">Tambah leads baru ke database CRM.</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>Tambah Lead</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Form Data Pelanggan</DialogTitle>
                <DialogDescription>Masukkan status tahapan leads CRM.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <input type="text" placeholder="Nama Perusahaan" className="flex h-10 w-full rounded-md border px-3 py-2 text-sm" />
                
                {/* Komponen Select di dalam Dialog */}
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status Prospek" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospect">Prospecting</SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
                    <SelectItem value="closed-won">Closed Won</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit">Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <hr />

        {/* PENERAPAN SWITCH */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Notifikasi Broadcast WhatsApp</p>
            <p className="text-sm text-gray-500">Kirim otomatis ke pelanggan baru.</p>
          </div>
          <Switch 
            checked={isNotificationOn} 
            onCheckedChange={setIsNotificationOn} 
          />
        </div>
      </div>
    </div>
  );
}