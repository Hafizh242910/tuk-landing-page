-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2025 at 08:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tuk_landing_page`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` varchar(191) NOT NULL,
  `title` varchar(500) NOT NULL,
  `category` varchar(100) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `competencies` text DEFAULT NULL,
  `brochure` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `category`, `isActive`, `createdAt`, `updatedAt`, `competencies`, `brochure`) VALUES
('cmdkqssm90000cm40nb6ciibf', 'Operator Penyambungan Pipa Galvanis', 'Sertifikat', 1, '2025-07-26 21:08:37.474', '2025-07-29 02:50:49.580', 'Menerapkan Keselamatan dan Kesehatan\nKerja dan Lingkungan di Tempat Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat Ukur\nMenyambung Pipa Galvanis', '/uploads/1753757449538-7.png'),
('cmdktxoia0004cmcc5sug9h33', 'Operator Penyambungan Pipa Polyethyle', 'Sertifikat', 1, '2025-07-26 22:36:24.275', '2025-07-29 02:48:56.095', 'Menerapkan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat Ukur\nMenyambung Pipa Dengan Metode Butt Fusion ( BF )\nMenyambung Pipa Dengan Metode Electro Fusion ( EF )', '/uploads/1753757336042-1.png'),
('cmdmvq8fi0006cmswp5d2bcrj', 'Pemeriksa Mutu Kontruksi Pipa Polyethylene', 'Sertifikat', 1, '2025-07-28 09:02:08.430', '2025-07-29 02:44:26.796', 'Menerapkan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat Ukur\nMemeriksa Mutu Pemasangan Pipa Instalasi Gas Bumi Material Pipa Galvanis dan Pipa Multilayer \nMembuat Laporan Pemasangan Pipa', '/uploads/1753757065260-2.png'),
('cmdnypnk70000cm0g5sia147m', 'Pengoperasian Peralatan Stasiun Pengisian Bahan Bakar Gas Bumi (SPBG)', 'Sertifikat', 1, '2025-07-29 03:13:26.403', '2025-07-29 03:13:26.403', 'Menerapkan Kesalamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat Ukur\nMelaksanakan Pengoperasian Peralatan Stasiun Pengisian Bahan Bakar Gas Bumi (SPBG)\nMelaksanakan Pemeliharaan Peralatan Stasiun Pengisian Bahan Bakar Gas Bumi (SPBG)', '/uploads/1753758806369-1.png'),
('cmdnyun290001cm0g3wlf98r0', 'Inspeksi Stasiun Penyaluran Gas Bumi', 'Sertifikat', 1, '2025-07-29 03:17:19.041', '2025-07-29 03:17:19.041', 'Menerapkan Keselamatan dan Kesehatan Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat Ukur\nMelaksanakan Pekerjaan 5R di Stasiun Penyaluran Gas Bumi\nMelaksanakan Inspeksi Peralatan Stasiun Penyaluran Gas Bumi', '/uploads/1753759039012-2.png'),
('cmdnzee0k0002cm0gmda026pg', 'Pelaksana Komersialisasi Gas Bumi', 'Sertifikat', 1, '2025-07-29 03:32:40.434', '2025-07-29 03:32:40.434', 'Menyusun Data Pelanggan \nMenyusun Rencana Pertemuan Bagi Pelanggan\nMelayani Kebutuhan Informasi Bagi Pelanggan\nMerencanakan Kebutuhan Pemakaian Gas dan Investasi Calon Pelanggan/pelanggan\nMenghitung Kelayakan Investasi PGN Untuk Calon Pelanggan/Pelanggan', '/uploads/1753759960089-3.png'),
('cmdnzr9nb0003cm0gezf1ln54', 'Operator Pemeliharaan Metering Regulating Station (MR/S)', 'Sertifikat', 1, '2025-07-29 03:42:41.303', '2025-07-29 03:42:41.303', 'Memelihara Metering Regulating Station (MR/S) Pelanggan dan Non Pelanggan\nMengganti Alat Ukur Pada Metering Regulating Stasiun (MR/S) Pelanggan dan Non Pelanggan\nMenerapkan Peraturan dan Perundangan Keselamatan, Kesehatan dan Lingdungan Lingkungan di Tempat Kerja\nMenggunakan Alat Ukur \nMenyiapkan dan Mengintepretasikan Instrument Drawing', '/uploads/1753760561265-4.png'),
('cmdo0gunr0004cm0go7cetr98', 'Pelatihan dan Sertifikasi Operator Pemeliharaan Bak Valve dan Ball Valve', 'Sertifikat', 1, '2025-07-29 04:02:34.935', '2025-07-29 04:02:34.935', 'Memelihara Bak Valve dan Ball Valve Pada Jaringan Distribusi Gas Bumi\nMenerapkan Peraturan Perundangan-undangan Yang Berlaku Dalam Pekerjaan di Ruang Terbatas \nMemberi Kontribusi dalam Pembuatan Analisis Keselamatan Pekerjaan (Job Safety Analysis/JSA) di Ruang Terbatas\nMenggunakan Alat Pelindung Diri (APD) Sesuai Prosedur\nMemasang Sistem Ventilasi Sesuai Dengan Kebutuhan di Ruang Terbatas\nMembuat Penilaian Perubahan Kondisi Kerja Yang Harus Diperhitungkan Untuk Kelangsungan Meneruskan Pekerjaan\nMemberikan Kontribusi Dalam Pembuatan Izin Kerja (Work Permit)\nMelaksanakan Pekerjaan di Ruang Terbatas Sesuai Prosedur', '/uploads/1753761754908-4.png'),
('cmdo0szfr0005cm0gxa2raakj', 'Operator Penyambungan Pipa Multilayer', 'Sertifikat', 1, '2025-07-29 04:12:00.999', '2025-07-29 04:12:00.999', 'Melaksanakan Pipa Multilayer\nMenerapakan Peraturan dan Perundangan Keselamatan, Kesehatan dan Lindungan Lingkungan di Tempat kerja \nMenggunakan Alat Ukur\nMembaca dan Membuat Gambar Teknik dan Perpipaan Sederhana', '/uploads/1753762320967-5.png'),
('cmdo0wxm90006cm0gcfnzss12', 'Perancang Design Pipa Instalasi Gas Bumi', 'Sertifikat', 1, '2025-07-29 04:15:05.265', '2025-07-29 04:15:05.265', 'Membaca dan Membuat Gambar Teknik dan Perpipaan Sederhana\nMenggunakan Alat Ukur\nMenerapkan Peraturan dan Perundangan Keselamatan, Kesehatan dan Lindungan Lingkungan di Tempat Kerja\nMerancang Desain Pipa Instalasi Gas Bumi', '/uploads/1753762505233-4.png'),
('cmdo19axx0007cm0gen0i1wg7', 'Operator Monitoring Sistem Proteksi Katodik', 'Sertifikat', 1, '2025-07-29 04:24:42.399', '2025-07-29 04:24:42.399', 'Menerapkan Peraturan dan Perundangan Keselamatan, Kesehatan dan Tempat Kerja\nMenggunakan Alat Ukur\nMengevaluasi Kinerja Proteksi Katodik Terpasang\nMelaksanakan Pengukuran Pontesial Anoda Korban\nMelaksanakan Pengukuran pH Elektrolit\nMelaksanakan Pengukuran Pontesial, Arus Anoda,\ndan Arus Output Rectifier\nMelaksanakan Pengukuran Potensial Struktur\nMelaksanakan Pengukuran Resistivity Elektrolit (Tahanan)\nMelakukan Kajian Kinerja Cathodic Protection (Commissioning)\nMelaksanakan Perawatan Peralatan Sistem Cathodic Protection', '/uploads/1753763082371-5.png'),
('cmdo5uv7h0008cm0gk6jsuhht', 'Pemeriksa Sistem Alat Ukur Serah Terima (SAUST) Gas Bumi', 'Sertifikat', 1, '2025-07-29 06:33:26.906', '2025-07-29 06:33:26.906', 'Menerapkan Keselamatan dan Kesehatan Kerja Lindungan Lingkungan\nMenerapkan Komunikasi di Lingkup Pekerjaan\nMenyiapkan Dokumen Teknis Persetujuan Sistem Alat Ukur\nMengawasi Pelaksanaan Pengujian Mekanis\nMengawasi Pelaksanaan Pengujian Instrumen Sistem Alat Ukur\nPengoperasian Sistem Alat Ukur Secara Benar Tepat, Akurat, Aman Sesuai Regulasi dan SOP\nMenganalisa Kerusakan dan Merekomendasi Perbaikan Instrumen Sistem Alat Ukur Yang Tidak Berfungsi Baik\nMengawasi Pelaksanaan Kalibrasi dan Pengujian Ulang Sistem Alat Ukur\nMembuat Berita Acara dan Laporan Hasilnya', '/uploads/1753770806465-5.png'),
('cmdo65txo0009cm0gh47070bu', 'Operator Patroli dan Leak Survey Pada Jaringan Pipa Gas Bumi', 'Sertifikat', 1, '2025-07-29 06:41:58.476', '2025-08-03 09:32:39.656', 'Menerapkan Peraturan dan Perundangan Keselamatan, Kesehatan dan Lindungan Lingkungan di Tempat Kerja\nMenggunakan Alat Ukur\nMenggunakan Gambar Teknik\nMelaksanakan Pemeriksaan dan Pemeliharaan Jaringan Pipa Gas Bumi', '/uploads/1753771318409-7.png'),
('cmdo6crqr000acm0guwe6mz6k', 'Floor Warden', 'Sertifikat', 1, '2025-07-29 06:47:22.227', '2025-08-03 09:32:24.622', 'Menerapkan K3 di Tempat Kerja di Industri Migas\nMelakukan Pemadaman Kebakaran di Industri Migas\nMengoperasikan Peralatan Pemadam Kebakaran di Industri Migas\nMelakukan Pertolongan Pertama Pada Korban Kecelakaan Kerja\nMelaksanakan Pemeriksaan dan Pemeliharaan Jaringan Pipa Gas Bumi\nMelibatkan Diri Dalam Operasi Penyelamatan', '/uploads/1753771642193-3.png'),
('cmdvisf1z0002cm5kjze08dqs', 'Intermediate Level', 'Pelatihan', 1, '2025-08-03 10:09:50.903', '2025-08-03 10:09:50.903', 'Membaca alat ukur', '/uploads/1754215790841-energi trada nusantara.jpeg'),
('cmdviukns0005cm5kziqa2dk7', 'PM Expert Topik 1 & 2', 'Pelatihan', 1, '2025-08-03 10:11:31.480', '2025-08-03 10:11:31.480', 'Membaca Alat Ukur', '/uploads/1754215891462-perta daya gas.png');

-- --------------------------------------------------------

--
-- Table structure for table `organizational_structures`
--

CREATE TABLE `organizational_structures` (
  `id` varchar(191) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `parentId` varchar(191) DEFAULT NULL,
  `imageUrl` varchar(500) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `description` text DEFAULT NULL,
  `photo` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organizational_structures`
--

INSERT INTO `organizational_structures` (`id`, `name`, `position`, `department`, `level`, `parentId`, `imageUrl`, `email`, `phone`, `isActive`, `createdAt`, `updatedAt`, `description`, `photo`) VALUES
('cmdku4wji0007cmcca9wj283y', 'Sabaruddin', 'Direktur Utama PT PGAS Solution', 'Learning and Development', 0, NULL, NULL, 'sabaruddin@tuk.com', '081356791241', 1, '2025-07-26 22:42:01.278', '2025-07-28 08:13:15.109', '', '/uploads/1753690393261-Pak_Sabaruddin_PGN-removebg-preview.png'),
('cmdmtkc5q0000cm8oszp8g2tr', 'Ariadi', 'Direktur Keuangan & Dukungan Bisnis', 'Learning and Development', 1, NULL, NULL, 'ariadi@tuk.com', '081356791241', 1, '2025-07-28 08:01:34.094', '2025-07-28 08:14:44.498', '', '/uploads/1753690484422-Pak_Edo_PGN-removebg-preview.png'),
('cmdmtlxn90001cm8obhmlqjos', 'Heriyana', 'Division Head HCM', 'Learning and Development', 1, NULL, NULL, 'heriyana@tuk.com', '081356791241', 1, '2025-07-28 08:02:48.597', '2025-07-28 08:02:48.597', '', '/uploads/1753689768554-Pak Heriyana PGN.jpg'),
('cmdmugtxd0000cmswdys5te48', 'Samuel Endrico', 'Departemen Head Learning and Development', 'Learning and Development', 1, NULL, NULL, 'samuelendrico@tuk.com', '081356791241', 1, '2025-07-28 08:26:50.112', '2025-07-28 08:26:50.112', '', '/uploads/1753691210089-snapedit_1753690694625-removebg-preview.png'),
('cmdmunx780001cmswkwy3qptr', 'Noprianti Ayuningtias', 'Fungsi Mutu', 'Learning and Development', 1, NULL, NULL, 'noprianti@tuk.com', '081356791241', 1, '2025-07-28 08:32:20.948', '2025-07-28 08:32:20.948', '', '/uploads/1753691540596-Mba_Nope_PGN-removebg-preview.png'),
('cmdmupmbl0002cmsw9xx1z50t', 'Octavia Permatasari', 'Fungsi Pemasaran', 'Learning and Development', 1, NULL, NULL, 'octavia@tuk.com', '081356791241', 1, '2025-07-28 08:33:40.161', '2025-07-28 08:33:40.161', '', '/uploads/1753691620135-Mba_Octa_PGN-removebg-preview.png'),
('cmdmut2q60003cmswatparv19', 'Ghevis Haykal Romdoni', 'Fungsi Keuangan', 'Learning and Development', 1, NULL, NULL, 'ghevis@tuk.com', '081356791241', 1, '2025-07-28 08:36:21.390', '2025-07-28 08:36:21.390', '', '/uploads/1753691781365-Ghevis_PGN-removebg-preview.png'),
('cmdmuy6yi0005cmswy5l8dute', 'Ilham Maulana Rahman', 'Fungsi Administrasi', 'Learning and Development', 1, NULL, NULL, 'ilhamrahman@tuk.com', '08135679892', 1, '2025-07-28 08:40:20.154', '2025-07-29 08:02:14.443', '', '/uploads/1753776132223-ILHAM .jpg');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` varchar(191) NOT NULL,
  `courseId` varchar(191) NOT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `time` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `seats` int(11) NOT NULL,
  `available` int(11) NOT NULL,
  `status` enum('OPEN','LIMITED','FULL','CLOSED','CANCELLED') NOT NULL DEFAULT 'OPEN',
  `color` varchar(7) DEFAULT NULL,
  `textColor` varchar(7) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `courseId`, `startDate`, `endDate`, `time`, `location`, `seats`, `available`, `status`, `color`, `textColor`, `createdAt`, `updatedAt`) VALUES
('cmdkszn2x0001cmcce8uxgfoj', 'cmdnyun290001cm0g3wlf98r0', '2025-08-04 00:00:00.000', '2025-08-08 00:00:00.000', '08:00 - 17:00 WIB', 'Bitung', 12, 12, 'FULL', '#EF4444', '#FFFFFF', '2025-07-26 22:09:56.121', '2025-08-03 10:01:11.887'),
('cmdku1k2z0006cmcc7xlw7q8b', 'cmdnypnk70000cm0g5sia147m', '2025-08-04 00:00:00.000', '2025-08-08 00:00:00.000', '08:00 - 17:00 WIB', 'Jakarta', 10, 10, 'FULL', '#22C55E', '#FFFFFF', '2025-07-26 22:39:25.163', '2025-08-03 10:07:07.438'),
('cmdvir4zm0001cm5kcljssriq', 'cmdnzee0k0002cm0gmda026pg', '2025-08-11 00:00:00.000', '2025-08-15 00:00:00.000', '08:00 - 16:00 WIB', 'Yello Hotel', 30, 30, 'OPEN', '#22C55E', '#FFFFFF', '2025-08-03 10:08:51.200', '2025-08-03 10:08:51.200'),
('cmdvitgt60004cm5kap354o8u', 'cmdvisf1z0002cm5kjze08dqs', '2025-08-13 00:00:00.000', '2025-08-15 00:00:00.000', '08:00 - 17:00 WIB', 'Hotel Patra Bandung', 20, 20, 'OPEN', '#22C55E', '#FFFFFF', '2025-08-03 10:10:39.834', '2025-08-03 10:10:39.834'),
('cmdviviia0007cm5k0qa1n6jn', 'cmdviukns0005cm5kziqa2dk7', '2025-08-14 00:00:00.000', '2025-08-15 00:00:00.000', '08:00 - 16:00 WIB', 'Tuk Klender', 25, 25, 'OPEN', '#22C55E', '#FFFFFF', '2025-08-03 10:12:15.346', '2025-08-03 10:12:15.346');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(191) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL DEFAULT 'USER',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
('cmdvgwcgd0000cmngpp6gcrua', 'admin@tuk.com', 'Admin User', '$2a$12$9lxWAqyD82R2cKS42LFqru0SaqeBP0.GPV11Pid5S57Wihhvma4hW', 'ADMIN', '2025-08-03 09:16:54.926', '2025-08-03 09:16:54.926');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('4a96dba7-b2bd-48db-95f2-ab648a1e3868', '7ffb2a2b05655103d8c57119811c0aa33592a66164b16b44f46bb0740a34a177', '2025-07-26 20:13:37.362', '20250726201337_add_photo_to_org_structure', NULL, NULL, '2025-07-26 20:13:37.347', 1),
('89bc2435-fcc0-4a16-8fa4-e5f981ccd6c1', '48c077244707cf44a0b915df938c21f1f5ef3f89c2de41835c03f70948cd39c0', '2025-07-26 16:14:59.951', '20250726161459_dbtukpgas', NULL, NULL, '2025-07-26 16:14:59.802', 1),
('aa442dff-327e-445b-995b-fc76d9405c9a', '5efaa701fc570d262b9b396c2fe71bdd5dc3bcd50157db2e11b4360e46794bbe', '2025-07-26 20:57:13.661', '20250726205713_add_competencies_to_courses', NULL, NULL, '2025-07-26 20:57:13.636', 1),
('bfd5c6fc-46ca-4b13-92f1-3a616735c252', '4d1be6ad971c7438cba8fa02a35a4ddfd7c7a3b5845bb4416d02f20215aed409', '2025-07-26 22:03:37.316', '20250726220337_add_closed_status', NULL, NULL, '2025-07-26 22:03:37.237', 1),
('d972a33f-0e2e-4c14-9f24-57124285aa23', 'ffcc9785172104c1b5b9ff8bd336e2b57aedf5111f34a98dd3e257239d20b991', '2025-07-26 21:18:21.268', '20250726211821_add_brochure_to_courses', NULL, NULL, '2025-07-26 21:18:21.256', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organizational_structures`
--
ALTER TABLE `organizational_structures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `organizational_structures_parentId_fkey` (`parentId`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedules_courseId_fkey` (`courseId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `organizational_structures`
--
ALTER TABLE `organizational_structures`
  ADD CONSTRAINT `organizational_structures_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `organizational_structures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
