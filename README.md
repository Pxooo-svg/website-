# Website SMA Negeri Contoh

Website sekolah statis (HTML5 + CSS3 + JavaScript + Bootstrap 5) yang bisa Anda
buka, edit, dan sesuaikan sendiri — tidak butuh server atau instalasi apa pun
untuk mulai melihat/mengeditnya.

## Struktur Folder

```
sekolah-website/
├── index.html      → Beranda
├── profil.html     → Profil Sekolah (sejarah, visi misi, struktur, fasilitas)
├── akademik.html   → Kurikulum, Jurusan, Kalender Akademik
├── guru.html       → Daftar Guru & Staf
├── berita.html     → Berita & Pengumuman
├── galeri.html     → Galeri Foto & Video
├── ppdb.html       → Informasi & Formulir PPDB Online
├── kontak.html     → Alamat, Google Maps, Email, WhatsApp
├── css/
│   └── style.css   → Semua warna, font, dan tata letak (1 file, gampang diedit)
├── js/
│   └── script.js   → Interaktivitas (menu aktif, animasi, validasi form, filter galeri)
└── README.md       → File ini
```

## Cara Membuka & Melihat Hasilnya

Cukup klik dua kali `index.html`, atau buka lewat browser (Chrome/Edge/Firefox).
Tidak perlu install apa pun karena semua library (Bootstrap 5, Bootstrap Icons,
Google Fonts) diambil otomatis dari internet lewat CDN saat halaman dibuka.

Jika ingin bekerja lebih rapi, buka folder ini dengan editor kode seperti
**VS Code**, lalu gunakan ekstensi "Live Server" agar perubahan langsung
terlihat setiap kali Anda menyimpan file.

## Hal-hal yang Paling Sering Perlu Diedit

1. **Nama sekolah & slogan** — cari teks "SMA Negeri Contoh" dan
   "Mewujudkan Generasi Berprestasi dan Berkarakter" di setiap file HTML,
   lalu ganti dengan milik sekolah Anda. Gunakan fitur *Find & Replace*
   (Ctrl+H di VS Code) untuk mengganti di semua file sekaligus.
2. **Warna & font** — buka `css/style.css`, bagian paling atas (`:root { ... }`).
   Semua warna situs (teal, emas, merah, dsb.) diatur di sana.
3. **Logo & foto** — semua gambar sementara memakai placeholder
   (`https://placehold.co/...`). Ganti `src="..."` pada tag `<img>` dengan
   path foto asli, misalnya `src="assets/img/logo.png"`, lalu taruh file
   fotonya di dalam folder `assets/img/`.
4. **Data guru, berita, galeri** — setiap kartu (guru, berita, galeri) berbentuk
   blok HTML yang bisa disalin (copy-paste) untuk menambah data baru. Contoh
   lokasi blok yang bisa disalin ditandai dengan komentar
   `<!-- EDIT: salin blok ... -->` di dalam file HTML.
5. **Nomor WhatsApp** — cari `6281234567890` di setiap file dan ganti dengan
   nomor WhatsApp resmi sekolah (format: kode negara tanpa tanda + atau 0 di depan).
6. **Google Maps** — buka `kontak.html`, cari `src="https://www.google.com/maps..."`
   pada `<iframe>`. Untuk mendapatkan tautan lokasi sekolah Anda: buka Google Maps →
   cari lokasi sekolah → tombol **Bagikan** → **Sematkan peta** → salin URL di
   dalam atribut `src="..."`.

## Formulir PPDB & Kontak — Status Saat Ini

Formulir di `ppdb.html` dan `kontak.html` saat ini **hanya berjalan di
browser** (validasi kolom wajib diisi, lalu menampilkan pesan sukses). Data
yang diisi pengunjung **belum tersimpan ke mana pun** karena belum
tersambung ke server/database.

### Jika ingin formulir benar-benar menyimpan data (opsional, butuh PHP + MySQL)

Ini bagian "opsional" dari teknologi yang Anda sebutkan. Langkah umumnya:

1. Siapkan hosting yang mendukung PHP & MySQL (banyak hosting sekolah di
   Indonesia sudah menyediakan ini, biasanya lewat cPanel).
2. Buat tabel database, misalnya:
   ```sql
   CREATE TABLE pendaftar_ppdb (
     id INT AUTO_INCREMENT PRIMARY KEY,
     nama_lengkap VARCHAR(100),
     nisn VARCHAR(20),
     tempat_tanggal_lahir VARCHAR(100),
     asal_sekolah VARCHAR(100),
     jalur VARCHAR(20),
     no_whatsapp VARCHAR(20),
     alamat TEXT,
     email VARCHAR(100),
     dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```
3. Buat file `simpan-ppdb.php` yang membaca data dari formulir (`$_POST`) dan
   menyimpannya ke tabel di atas menggunakan `mysqli` atau `PDO`.
4. Di `ppdb.html`, ubah tag `<form id="formPPDB" novalidate>` menjadi
   `<form id="formPPDB" novalidate action="simpan-ppdb.php" method="POST">`,
   atau kirim data lewat JavaScript memakai `fetch()` ke file PHP tersebut
   (lebih modern, tidak me-refresh halaman).

Jika Anda ingin, bagian backend PHP + MySQL ini bisa dibuatkan secara terpisah
kapan saja — cukup beri tahu struktur data/kolom yang sekolah Anda butuhkan.

## Kesesuaian dengan Fitur yang Diminta

| Fitur                          | Status | Lokasi File |
|--------------------------------|--------|-------------|
| Beranda (banner, sambutan, statistik) | ✅ | `index.html` |
| Profil Sekolah (sejarah, visi misi, struktur, fasilitas) | ✅ | `profil.html` |
| Akademik (kurikulum, jurusan, kalender) | ✅ | `akademik.html` |
| Guru & Staf | ✅ | `guru.html` |
| Berita & Pengumuman | ✅ | `berita.html` |
| Galeri (foto & video) | ✅ | `galeri.html` |
| PPDB Online (info + formulir) | ✅ (tampilan; backend opsional, lihat di atas) | `ppdb.html` |
| Kontak (alamat, maps, email, WhatsApp) | ✅ | `kontak.html` |

Selamat mengedit! Semua kode diberi komentar dalam Bahasa Indonesia supaya
mudah dipahami dan diubah sendiri.
