import axios from 'axios';

// URL API resmi berdasarkan dashboard proyek Supabase Della
const API_URL = "https://dxyqjjguojbkhxkrmjsp.supabase.co/rest/v1/user";

// API KEY / Anon Public Key resmi proyek Anda
const API_KEY = "sb_publishable_0qr_JHnyWPIGp-nvNiLWtQ_SZI6UGRW";

// Pengaturan Header otentikasi BaaS sesuai petunjuk teknis modul 13
const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
};

export const userAPI = {
    // 1. Ambil seluruh data pengguna (GET) - Mengikuti Poin 6 Modul
    async fetchUsers() {
        const response = await axios.get(API_URL, { headers });
        return response.data;
    },

    // 2. Tambah data pengguna baru (POST) - Mengikuti Poin 3 & 5 Modul
    async createUser(data) {
        const response = await axios.post(API_URL, data, { headers });
        return response.data;
    },

    // 3. Validasi & Cari Data untuk pencocokan Login (GET dengan parameter eq)
    async checkLogin(email) {
        const response = await axios.get(`${API_URL}?email=eq.${email}`, { headers });
        return response.data; 
    },

    // 4. Hapus data pengguna berdasarkan ID unik (DELETE) - Mengikuti Poin 7 Modul
    async deleteUser(id) {
        const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
        return response.data;
    }
};