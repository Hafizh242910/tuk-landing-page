# Admin Dashboard - Mega Citra Wisata

## Overview

Admin dashboard untuk mengelola platform pelatihan dan sertifikasi Mega Citra Wisata. Dashboard ini memungkinkan admin untuk mengelola kursus, jadwal, pengguna, dan struktur organisasi.

## Fitur Utama

### 1. Dashboard Overview

- **Statistik Real-time**: Total pengguna, kursus, jadwal, dan struktur organisasi
- **Jadwal Terbaru**: Daftar jadwal yang baru dibuat
- **Jadwal Mendatang**: Jadwal yang akan datang dengan informasi kursi tersedia
- **Aksi Cepat**: Tombol untuk navigasi cepat ke fitur utama

### 2. Manajemen Kursus

- **Daftar Kursus**: Tabel dengan informasi lengkap semua kursus
- **Tambah Kursus**: Form untuk membuat kursus baru
- **Edit Kursus**: Edit informasi kursus yang ada
- **Status Kursus**: Aktif/nonaktif dengan badge visual
- **Kategori**: Pengelompokan kursus berdasarkan kategori

### 3. Manajemen Jadwal

- **Daftar Jadwal**: Tabel dengan informasi jadwal pelatihan
- **Tambah Jadwal**: Form untuk membuat jadwal baru
- **Status Jadwal**: Terbuka, Terbatas, Penuh, Dibatalkan
- **Kapasitas**: Pengelolaan jumlah kursi dan ketersediaan
- **Warna Kustom**: Pengaturan warna untuk kalender

### 4. Manajemen Pengguna

- **Daftar Pengguna**: Tabel semua pengguna terdaftar
- **Role Management**: Admin dan User
- **Informasi Pengguna**: Email, nama, tanggal daftar
- **Keamanan**: Proteksi admin dari penghapusan

### 5. Struktur Organisasi

- **Hierarki Visual**: Tampilan struktur organisasi bertingkat
- **Tambah Anggota**: Form untuk menambah anggota baru
- **Statistik**: Informasi jumlah anggota dan level
- **Status Aktif**: Pengelolaan status anggota

### 6. Pengaturan Sistem

- **Pengaturan Umum**: Nama situs, deskripsi, kontak
- **Keamanan**: Timeout sesi, percobaan login, audit log
- **Email**: Konfigurasi SMTP untuk notifikasi
- **Database**: Backup dan restore

## Akses dan Keamanan

### Login

- **URL**: `/login`
- **Credentials Demo**:
  - Email: `admin@tuk.com`
  - Password: `admin123`

### Autentikasi

- JWT token-based authentication
- Role-based access control (ADMIN/USER)
- Session timeout protection
- Secure cookie handling

### Middleware

- Admin-only route protection
- Token validation
- Role verification

## Struktur File

```
app/admin/
├── layout.js                 # Admin layout dengan auth
├── page.js                   # Dashboard utama
├── courses/
│   ├── page.js              # Daftar kursus
│   └── new/page.js          # Form tambah kursus
├── schedules/
│   ├── page.js              # Daftar jadwal
│   └── new/page.js          # Form tambah jadwal
├── users/
│   └── page.js              # Daftar pengguna
├── organizational-structure/
│   └── page.js              # Struktur organisasi
└── settings/
    └── page.js              # Pengaturan sistem

components/admin/
├── AdminSidebar.jsx         # Sidebar navigasi
├── AdminHeader.jsx          # Header dengan user info
├── CourseForm.jsx           # Form kursus
└── ScheduleForm.jsx         # Form jadwal

app/api/admin/
└── stats/route.js           # API dashboard stats
```

## API Endpoints

### Admin Dashboard

- `GET /api/admin/stats` - Statistik dashboard (Admin only)

### Kursus

- `GET /api/courses` - Daftar semua kursus
- `POST /api/courses` - Buat kursus baru
- `PUT /api/courses/[id]` - Update kursus
- `DELETE /api/courses/[id]` - Hapus kursus

### Jadwal

- `GET /api/schedules` - Daftar semua jadwal
- `POST /api/schedules` - Buat jadwal baru
- `PUT /api/schedules/[id]` - Update jadwal
- `DELETE /api/schedules/[id]` - Hapus jadwal

### Pengguna

- `GET /api/users` - Daftar semua pengguna
- `POST /api/users` - Buat pengguna baru
- `PUT /api/users/[id]` - Update pengguna
- `DELETE /api/users/[id]` - Hapus pengguna

## Teknologi

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL dengan Prisma ORM
- **Authentication**: JWT dengan bcryptjs
- **UI Components**: Radix UI + Custom components
- **Icons**: Lucide React

## Penggunaan

### 1. Login ke Admin Dashboard

1. Buka `/login`
2. Masukkan credentials admin
3. Akan diarahkan ke `/admin`

### 2. Mengelola Kursus

1. Klik "Kelola Kursus" di sidebar
2. Klik "Tambah Kursus" untuk membuat baru
3. Isi form dengan informasi lengkap
4. Klik "Buat Kursus" untuk menyimpan

### 3. Mengelola Jadwal

1. Klik "Kelola Jadwal" di sidebar
2. Klik "Tambah Jadwal" untuk membuat baru
3. Pilih kursus dari dropdown
4. Isi tanggal, waktu, lokasi, dan kapasitas
5. Klik "Buat Jadwal" untuk menyimpan

### 4. Mengelola Pengguna

1. Klik "Kelola Pengguna" di sidebar
2. Lihat daftar semua pengguna
3. Gunakan tombol aksi untuk view/edit/delete

### 5. Struktur Organisasi

1. Klik "Struktur Organisasi" di sidebar
2. Lihat hierarki organisasi
3. Tambah anggota baru dengan form

## Keamanan

- Semua route admin dilindungi middleware
- Validasi input di semua form
- Sanitasi data sebelum database
- Rate limiting untuk API endpoints
- Audit logging untuk aktivitas admin

## Maintenance

### Backup Database

- Backup otomatis harian
- Retensi 30 hari
- Backup manual tersedia di settings

### Monitoring

- Error logging
- Performance monitoring
- User activity tracking

## Support

Untuk bantuan teknis atau pertanyaan, hubungi:

- Email: support@megacitrawisata.com
- Dokumentasi: Lihat file README.md utama
