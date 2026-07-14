# Eco-Sorter - Game Edukasi Pengenalan Jenis Sampah

Game edukasi berbasis desktop untuk mengenalkan jenis-jenis sampah kepada anak-anak menggunakan ReactJS dan Tailwind CSS.

## Fitur Utama

- **Input Nama/Nickname**: Pemain memasukkan nama sebelum mulai bermain
- **Game Pengenalan Sampah**: Klasifikasikan sampah ke dalam kategori Organik, Anorganik, dan B3
- **Sistem Skor**: Skor didasarkan pada kecepatan dan akurasi jawaban
- **Leaderboard**: Tampilkan 10 skor tertinggi pemain
- **Timer**: Waktu bermain 60 detik

## Teknologi

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: PHP, MySQL
- **Routing**: React Router DOM

## Setup dan Instalasi

### Prerequisites
- Node.js (v16+)
- PHP (v7.4+)
- MySQL
- XAMPP atau server web lokal

### Langkah Instalasi

1. **Clone atau download proyek ini**

2. **Setup Database**
   ```sql
   CREATE DATABASE warkop;
   ```
   Jalankan script `backend/create_table.php` untuk membuat tabel game_scores

3. **Setup Backend**
   - Pastikan XAMPP running
   - Letakkan folder `backend` di htdocs
   - Akses: `http://localhost/eco-sorter/backend/`

4. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Akses: `http://localhost:5173/`

## Cara Bermain

1. Masukkan nama atau nickname di halaman utama
2. Klik "Mulai Bermain"
3. Lihat gambar sampah dan pilih kategori yang benar:
   - **Organik**: Sampah yang bisa terurai alami (daun, kulit buah, kertas)
   - **Anorganik**: Sampah yang tidak bisa terurai (plastik, kaca, logam)
   - **B3**: Bahan Berbahaya dan Beracun (baterai, lampu bohlam)
4. Dapatkan skor berdasarkan jawaban benar
5. Lihat leaderboard untuk melihat peringkat

## Struktur Proyek

```
eco-sorter/
├── backend/
│   ├── config.php              # Koneksi database
│   ├── save_score.php          # Simpan skor pemain
│   ├── get_leaderboard.php     # Ambil data leaderboard
│   └── create_table.php        # Script buat tabel
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Halaman input nama
│   │   │   ├── Game.jsx        # Halaman game utama
│   │   │   └── Leaderboard.jsx # Halaman leaderboard
│   │   └── App.jsx             # Routing utama
│   └── public/
└── README.md
```

## Pengembangan

Untuk menambah item sampah baru, edit array `wasteItems` di `Game.jsx`:

```javascript
{ id: 11, name: "Item Baru", image: "url_gambar", category: "organik|anorganik|b3" }
```

## Lisensi

Proyek ini dibuat untuk tujuan edukasi.
