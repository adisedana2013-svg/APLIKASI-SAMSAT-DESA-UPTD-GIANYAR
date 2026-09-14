# Panduan Deploy Aplikasi Samsat Metulung Desa ke Vercel

Aplikasi ini berbasis **React + Vite** dan telah dilengkapi dengan berkas `vercel.json` untuk konfigurasi langsung di **Vercel.app**.

---

## Langkah-langkah Deploy ke Vercel

### Cara 1: Menggunakan GitHub (Sangat Direkomendasikan)
1. **Export Kode Ke GitHub:**
   - Di aplikasi Google AI Studio Build ini, buka **Menu / Settings** di pojok kanan atas.
   - Pilih **Export to GitHub** atau unduh sebagai **ZIP**.
   - Jika diunduh sebagai ZIP, ekstraklah dan **Push** kode ke repositori GitHub milik Anda.

2. **Hubungkan ke Vercel:**
   - Buka portal [Vercel Dashboard](https://vercel.com/dashboard) dan login.
   - Klik tombol **"Add New..."** -> **"Project"**.
   - Pilih repositori GitHub aplikasi Samsat Metulung Desa yang baru saja Anda buat.

3. **Konfigurasi Project Vercel:**
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
   *(Konfigurasi ini sudah otomatis terdeteksi berkat berkas `vercel.json`)*.

4. **Klik "Deploy":**
   - Tunggu proses build sekitar 1-2 menit.
   - Aplikasi Anda akan langsung online dan mendapatkan URL publik seperti: `https://samsat-metulung-desa.vercel.app`

---

### Cara 2: Menggunakan Vercel CLI (Garis Perintah)
Jika Anda mengunduh kodenya di komputer lokal dan menginstall [Vercel CLI](https://vercel.com/cli):
```bash
npm install -g vercel
vercel login
vercel
```
Ikuti petunjuk di layar komputer Anda, dan pilih opsi default.

---

## Catatan Penting Data LocalStorage
- Aplikasi ini menyimpan data realisasi dan transaksi kendaraan secara aman di **LocalStorage browser**.
- Saat di-deploy ke domain Vercel baru, Anda dapat memanfaatkan fitur **"Backup JSON"** dan **"Restore JSON"** yang ada di navigasi atas aplikasi untuk memindahkan data dari lingkungan AI Studio ke domain Vercel publik Anda.
