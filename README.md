# 👁️ DyslexiaLens - Front-End

[![React Version](https://img.shields.io/badge/react-18.2.0-blue.svg?logo=react)](https://reactjs.org/)
[![Vite Version](https://img.shields.io/badge/vite-5.0.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.4.7-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/framer--motion-11.18.2-FF007F.svg?logo=framer-motion)](https://www.framer.com/motion/)
[![Axios](https://img.shields.io/badge/axios-1.16.1-5A29E4.svg?logo=axios)](https://axios-http.com/)
[![React Router](https://img.shields.io/badge/react--router--dom-6.14.1-CA4245.svg?logo=react-router)](https://reactrouter.com/)
[![Lucide React](https://img.shields.io/badge/lucide--react-0.454.0-000000.svg?logo=lucide)](https://lucide.dev/)

**DyslexiaLens** adalah platform berbasis web inovatif yang dirancang khusus untuk mendeteksi potensi disleksia menggunakan analisis gambar (seperti foto mata atau sampel tulisan tangan) serta menyediakan antarmuka inklusif dan ramah disleksia (*dyslexia-friendly*). 

Repositori ini berisi kode sumber untuk bagian **Front-End** aplikasi, yang dikembangkan menggunakan **React (Vite)**, **Tailwind CSS** untuk gaya tampilan premium, serta **Framer Motion** untuk animasi transisi halaman yang halus dan interaktif.

---

## ✨ Fitur Utama

Aplikasi DyslexiaLens dilengkapi dengan berbagai fitur mutakhir untuk memastikan pengalaman pengguna terbaik:

1. **Pusat Aksesibilitas Khusus Disleksia (`/profile/accessibility`)**
   - **Mode Kontras Tinggi**: Meningkatkan kontras warna teks dan latar belakang agar lebih mudah dibaca.
   - **Font Ramah Disleksia (*Dyslexia Font*)**: Dukungan penggantian font khusus (seperti OpenDyslexic) untuk mengurangi distorsi pembacaan.
   - **Skala Ukuran Teks**: Mengatur ukuran teks dinamis mulai dari 80% hingga 120% untuk kenyamanan mata.
   - **Pengurangan Gerak (*Reduce Motion*)**: Mematikan animasi dekoratif bagi pengguna yang sensitif terhadap pergerakan visual.

2. **Deteksi Disleksia Berbasis AI (`/upload`, `/analyzing`, `/result`)**
   - **Tips Foto (`/photo-tips`)**: Panduan langkah demi langkah agar pengguna dapat mengambil foto berkualitas tinggi untuk deteksi akurat.
   - **Deteksi Gambar (`/upload`)**: Mengunggah foto mata atau hasil scan tulisan tangan untuk dianalisis oleh model AI.
   - **Visualisasi Pemindaian Halaman (`/analyzing`)**: Halaman animasi modern berteknologi tinggi saat server sedang memproses gambar.
   - **Laporan Hasil Deteksi (`/result`)**: Penilaian interaktif lengkap yang menampilkan persentase probabilitas disleksia, rincian skor, saran praktis, langkah selanjutnya, serta tombol unduh laporan berformat PDF.

3. **Manajemen Riwayat Deteksi (`/history`)**
   - Halaman daftar riwayat hasil deteksi bagi pengguna terautentikasi.
   - Pencarian, penyaringan tanggal, dan opsi menghapus riwayat deteksi.

4. **Sistem Autentikasi Pengguna (`/login`, `/register`, `/forgot`)**
   - Registrasi akun baru dan masuk aplikasi secara aman.
   - Indikator kekuatan kata sandi (*Password Strength*) yang interaktif.
   - Pemulihan akun melalui verifikasi kode OTP berbasis e-mail.

5. **Manajemen Profil Pengguna (`/profile`)**
   - Mengubah informasi umum akun (Nama Lengkap, No. Telepon, Tanggal Lahir, Avatar).
   - Mengubah alamat tempat tinggal (Kota, Kode Pos, Negara).
   - Mengubah kata sandi secara aman dengan verifikasi OTP.
   - Halaman umpan balik sukses yang menarik setelah pembaruan data berhasil.

6. **Pusat Bantuan & FAQ (`/help`)**
   - Dokumentasi cara penggunaan aplikasi dan jawaban atas pertanyaan umum seputar disleksia.

7. **Halaman Statis**
   - About (`/about`)
   - Privacy Policy (`/privacy`)
   - Terms of Service (`/terms`)

---

## 🛠️ Teknologi & Dependensi Utama

| Teknologi | Versi | Deskripsi |
| :--- | :--- | :--- |
| **React** | 18.2.0 | Library utama UI berbasis komponen deklaratif |
| **Vite** | 5.0.0 | Build tool modern super cepat untuk performa development terbaik |
| **Tailwind CSS** | 3.4.7 | Utility-first CSS framework untuk implementasi desain antarmuka premium |
| **Framer Motion** | 11.18.2 | Library animasi canggih untuk transisi halaman dan efek micro-interaction |
| **Axios** | 1.16.1 | HTTP client berbasis Promise untuk komunikasi data dengan API Back-End |
| **React Router DOM** | 6.14.1 | Router deklaratif untuk navigasi halaman yang mulus |
| **Lucide React** | 0.454.0 | Kumpulan aset ikon modern, bersih, dan konsisten |

### Dev Dependencies

| Teknologi | Versi | Deskripsi |
| :--- | :--- | :--- |
| **ESLint** | 9.39.4 | Linter untuk menjaga kualitas kode |
| **@vitejs/plugin-react** | 4.3.1 | Plugin React untuk Vite |
| **autoprefixer** | 10.4.14 | PostCSS plugin untuk vendor prefixes |
| **postcss** | 8.4.21 | Tool untuk transformasi CSS |
| **eslint-plugin-react** | 7.37.5 | ESLint rules untuk React |
| **eslint-plugin-react-hooks** | 7.1.1 | ESLint rules untuk React Hooks |
| **eslint-plugin-react-refresh** | 0.5.2 | ESLint rules untuk React Refresh |

---

## 📂 Struktur Proyek

Struktur direktori front-end diorganisasikan secara rapi untuk mendukung skalabilitas pengembangan:

```text
front-end/
├── .vscode/                 # Konfigurasi workspace VS Code
├── public/                  # Aset statis publik
├── src/
│   ├── assets/              # Aset gambar, ilustrasi, dan ikon lokal
│   ├── components/          # Komponen UI modular & reusable
│   │   ├── landing/         # Komponen khusus halaman Beranda (Home)
│   │   └── ui/              # Komponen dasar (Button, Modal, Loading, Skeleton, Transition)
│   ├── context/             # AppContext.jsx (Pengaturan tema global, auth state, & aksesibilitas)
│   ├── lib/                 # Konfigurasi axios instance (api.js) & interceptor token
│   ├── pages/               # Halaman-halaman utama rute aplikasi
│   ├── services/            # Logika integrasi endpoint API eksternal
│   │   ├── aiService.js     # Layanan deteksi & ekstraksi teks AI
│   │   ├── authService.js   # Layanan autentikasi, OTP, & reset sandi
│   │   ├── historyService.js# Layanan pengelolaan riwayat deteksi
│   │   └── profileService.js# Layanan manajemen data profil & alamat
│   ├── App.jsx              # Komponen utama root & daftar konfigurasi rute (Route)
│   ├── index.css            # Pengaturan dasar CSS, variabel desain, & token Tailwind
│   └── main.jsx             # Titik masuk utama (Entrypoint) React
├── .env                     # File konfigurasi environment local
├── eslint.config.mjs        # Konfigurasi pembatasan standardisasi kode (Linter)
├── index.html               # Halaman HTML utama aplikasi
├── tailwind.config.cjs      # Kustomisasi tema, warna, dan font Tailwind
└── vite.config.js           # Konfigurasi server & plugin Vite
```

---

## 🎯 State Management (AppContext)

Aplikasi menggunakan React Context API untuk state management global melalui `src/context/AppContext.jsx`:

### Fitur Context

| State | Deskripsi | Persistensi |
| :--- | :--- | :--- |
| `user` | Data pengguna yang sedang login | - |
| `isAuthenticated` | Status autentikasi pengguna | localStorage |
| `theme` | Tema aplikasi (light/dark) | localStorage |
| `accessibility` | Pengaturan aksesibilitas | localStorage |

### Pengaturan Aksesibilitas

```javascript
{
  highContrast: false,      // Mode kontras tinggi
  dyslexiaFont: false,      // Font ramah disleksia (OpenDyslexic)
  textScale: 1,             // Skala teks (0.8 - 1.2)
  reduceMotion: false       // Pengurangan animasi
}
```

### Axios Interceptor

Configured di `src/lib/api.js`:
- Otomatis menyematkan `Bearer Token` dari `localStorage` pada setiap request
- Menangani response error (401 Unauthorized → redirect ke login)

---

## 🚀 Panduan Memulai (Instalasi & Pengembangan)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di komputer lokal Anda:

### 1. Prasyarat
Pastikan Anda telah menginstal **Node.js** (versi 16 atau lebih tinggi direkomendasikan) dan **npm** di komputer Anda.

### 2. Kloning Repositori
```bash
git clone https://github.com/DyslexiaLens/DyslexiaLens_FE.git
cd front-end
```

### 3. Konfigurasi Environment Variables
Duplikasi berkas `.env.example` menjadi `.env` pada direktori root proyek ini:

```bash
cp .env.example .env
```

*Sesuaikan alamat basis URL server Back-End Anda di dalam berkas `.env` jika diperlukan (default: `http://localhost:5000`).*

### 4. Instalasi Dependensi
Jalankan perintah berikut untuk mengunduh semua paket dependensi yang dibutuhkan:
```bash
npm install
```

### 5. Menjalankan Server Pengembangan (Local Development)
Untuk menjalankan aplikasi dalam mode pengembangan dengan fitur *Hot Module Replacement* (HMR):
```bash
npm run dev
```
Buka browser Anda dan akses alamat yang tertera di terminal Anda (biasanya `http://localhost:5173`).

### 6. Build untuk Produksi
Jika aplikasi siap disebarkan ke lingkungan produksi, buat bundle yang dioptimalkan dengan menjalankan:
```bash
npm run build
```
Hasil build akan tersimpan di dalam folder `dist/`.

### 7. Memeriksa Kerapihan Kode (Linting)
Untuk mendeteksi potensi kesalahan penulisan kode sesuai standar ESLint:
```bash
npm run lint
```
Dan untuk memperbaiki kesalahan kode yang dapat diperbaiki secara otomatis:
```bash
npm run lint:fix
```

---

## 🌐 Deployment

### Vercel (Recommended)

Frontend dikonfigurasi untuk deployment di Vercel dengan SPA routing:

```json
{
  "rewrites": [
    { "source": "/((?!assets/).*)", "destination": "/index.html" }
  ]
}
```

**Langkah Deployment:**
1. Push repository ke GitHub
2. Hubungkan repository ke Vercel
3. Vercel akan otomatis mendeteksi Vite dan melakukan build
4. Set environment variable `VITE_API_BASE_URL` di Vercel dashboard

### Build untuk Produksi

```bash
npm run build
```

Output akan tersimpan di folder `dist/` siap untuk deployment.

### Preview Build Lokal

```bash
npm run preview
```

---

## 📦 Script NPM Reference

| Script | Deskripsi |
| :--- | :--- |
| `npm run dev` | Memulai server development dengan HMR (port 5173) |
| `npm run build` | Build untuk produksi ke folder `dist/` |
| `npm run preview` | Preview hasil build produksi |
| `npm run start` | Alias untuk `npm run dev` |
| `npm run lint` | Jalankan ESLint untuk pemeriksaan kode |
| `npm run lint:fix` | Perbaiki otomatis error ESLint |

---

## 🌐 Layanan & Endpoint API Terintegrasi

Aplikasi ini menggunakan Axios Interceptor untuk otomatis menyematkan `Bearer Token` dari `localStorage` pada setiap request yang membutuhkan autentikasi. Berikut rincian API yang terintegrasi di folder `src/services/`:

### Autentikasi (`authService.js`)

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| POST | `/api/v1/auth/register` | Pendaftaran akun baru |
| POST | `/api/v1/auth/login` | Masuk akun untuk mendapatkan Access Token |
| POST | `/api/v1/auth/forgot-password` | Permintaan OTP untuk lupa kata sandi |
| POST | `/api/v1/auth/verify-otp` | Verifikasi kode OTP |
| POST | `/api/v1/auth/reset-password` | Memperbarui kata sandi baru |
| PATCH | `/api/v1/auth/change-password` | Mengganti kata sandi lama dari halaman profil |
| GET | `/api/v1/auth/me` | Mengambil info sesi user aktif |
| POST | `/api/v1/auth/logout` | Keluar dari sistem |

### Profil Pengguna (`profileService.js`)

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| GET | `/api/v1/profile` | Mengambil info data diri lengkap |
| PATCH | `/api/v1/profile` | Memperbarui data diri (nama, telepon, lahir, avatar) |
| PATCH | `/api/v1/profile/address` | Memperbarui data alamat (kota, kode pos, negara) |

### Layanan Kecerdasan Buatan (`aiService.js`)

| Method | Endpoint | Deskripsi | Content-Type |
| :--- | :--- | :--- | :--- |
| POST | `/api/v1/ai/detections` | Deteksi indikasi disleksia | `multipart/form-data` |
| POST | `/api/v1/ai/translations` | Ekstraksi teks tulisan tangan | `multipart/form-data` |
| POST | `/api/v1/ai/generate-text` | Generasi teks latihan menulis | `application/json` |

### Riwayat Pengguna (`historyService.js`)

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| GET | `/api/v1/history` | Mendapatkan daftar riwayat analisis |
| GET | `/api/v1/history/:type` | Riwayat berdasarkan tipe (detection/translation) |
| DELETE | `/api/v1/history/:id` | Menghapus item riwayat tertentu |

---

## 🤝 Kontribusi

Kontribusi selalu diterima! Jika Anda ingin memberikan perbaikan Bug, penambahan Fitur, atau optimalisasi desain:

1. Fork repositori ini
2. Buat branch fitur Anda (`git checkout -b fitur/fiturBaru`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch Anda (`git push origin fitur/fiturBaru`)
5. Buat **Pull Request**

### Development Workflow

```bash
# 1. Pastikan dependencies terinstall
npm install

# 2. Jalankan development server
npm run dev

# 3. Jalankan linting sebelum commit
npm run lint

# 4. Build untuk memastikan tidak ada error
npm run build
```

### Struktur Component

```
src/components/
├── landing/           # Komponen halaman landing
│   ├── ActionButton.jsx
│   ├── FeatureCard.jsx
│   ├── SectionBadge.jsx
│   ├── SectionHeading.jsx
│   └── TestimonialCard.jsx
└── ui/                # Komponen reusable
    ├── Button.jsx
    ├── EmptyState.jsx
    ├── LoadingSpinner.jsx
    ├── Modal.jsx
    ├── PageTransition.jsx
    └── Skeleton.jsx
```

---

**Version:** DyslexiaLens Frontend v1.2.0  
**Last Updated:** June 4, 2026
