export const metadata = {
  title: "Kebijakan Privasi - TUK P Gas",
  description:
    "Kebijakan Privasi untuk penggunaan situs dan layanan TUK P Gas.",
};

function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Kebijakan Privasi</h1>
      <section className="space-y-6 text-gray-800 text-base leading-relaxed">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-blue-800">
            <strong>Terakhir diperbarui:</strong>{" "}
            {new Date().toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <p>
          Privasi Anda sangat penting bagi kami. Kebijakan Privasi ini
          menjelaskan bagaimana
          <strong> TUK PGAS Training Center</strong> mengumpulkan, menggunakan,
          mengungkapkan, dan melindungi informasi pribadi Anda saat Anda
          menggunakan situs web dan layanan kami.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          1. Informasi yang Kami Kumpulkan
        </h2>

        <h3 className="text-lg font-medium mt-6 mb-2 text-gray-800">
          1.1 Informasi yang Anda Berikan Secara Langsung
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Informasi Akun:</span> Nama lengkap,
            alamat email, dan kata sandi saat Anda mendaftar atau login ke
            sistem admin.
          </li>
          <li>
            <span className="font-medium">Informasi Kontak:</span> Nomor
            telepon, alamat email untuk komunikasi terkait pelatihan dan jadwal.
          </li>
          <li>
            <span className="font-medium">Data Pelatihan:</span> Informasi
            terkait kursus yang Anda ikuti, jadwal pelatihan, dan status
            pendaftaran.
          </li>
          <li>
            <span className="font-medium">Upload File:</span> Foto profil,
            dokumen pendukung (maksimal 5MB per file) yang Anda unggah ke
            sistem.
          </li>
        </ul>

        <h3 className="text-lg font-medium mt-6 mb-2 text-gray-800">
          1.2 Data yang Dikumpulkan Secara Otomatis
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Data Teknis:</span> Alamat IP, jenis
            perangkat, browser, sistem operasi, dan informasi teknis lainnya.
          </li>
          <li>
            <span className="font-medium">Data Penggunaan:</span> Halaman yang
            dikunjungi, waktu akses, durasi kunjungan, dan pola penggunaan
            situs.
          </li>
          <li>
            <span className="font-medium">Cookies:</span> Data yang disimpan di
            browser untuk meningkatkan pengalaman pengguna dan fungsionalitas
            situs.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          2. Penggunaan Informasi
        </h2>
        <p className="mb-4">
          Kami menggunakan informasi yang dikumpulkan untuk:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Penyediaan Layanan:</span> Mengelola
            dan menyediakan layanan pelatihan, jadwal kursus, dan sistem
            administrasi.
          </li>
          <li>
            <span className="font-medium">Komunikasi:</span> Menghubungi Anda
            terkait jadwal pelatihan, pembaruan kursus, atau informasi penting
            lainnya.
          </li>
          <li>
            <span className="font-medium">Autentikasi:</span> Memverifikasi
            identitas Anda saat login ke sistem admin.
          </li>
          <li>
            <span className="font-medium">Peningkatan Layanan:</span>{" "}
            Menganalisis penggunaan untuk meningkatkan pengalaman pengguna dan
            fungsionalitas situs.
          </li>
          <li>
            <span className="font-medium">Keamanan:</span> Melindungi sistem
            dari akses yang tidak sah dan memastikan keamanan data.
          </li>
          <li>
            <span className="font-medium">Kepatuhan Hukum:</span> Memenuhi
            kewajiban hukum dan menegakkan syarat & ketentuan kami.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          3. Penyimpanan & Keamanan Data
        </h2>
        <div className="space-y-4">
          <p>
            <span className="font-medium">Database:</span> Data disimpan dalam
            database MySQL dengan enkripsi dan pengamanan standar industri.
          </p>
          <p>
            <span className="font-medium">File Upload:</span> File yang diunggah
            disimpan secara lokal di server dengan pembatasan ukuran maksimal
            5MB.
          </p>
          <p>
            <span className="font-medium">Enkripsi:</span> Kata sandi dienkripsi
            menggunakan bcryptjs untuk keamanan maksimal.
          </p>
          <p>
            <span className="font-medium">Akses Terbatas:</span> Hanya personel
            yang berwenang yang dapat mengakses data pribadi Anda.
          </p>
          <p>
            <span className="font-medium">Backup:</span> Data secara berkala
            dibackup untuk mencegah kehilangan data.
          </p>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          4. Cookies & Teknologi Pelacakan
        </h2>
        <p>Kami menggunakan cookies dan teknologi serupa untuk:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Menyimpan preferensi pengguna dan pengaturan sesi</li>
          <li>Meningkatkan fungsionalitas dan performa situs</li>
          <li>Menganalisis pola penggunaan untuk optimasi</li>
          <li>Mengamankan sistem dari serangan dan penyalahgunaan</li>
        </ul>
        <p className="mt-4">
          Anda dapat mengatur browser untuk menolak cookies, namun hal ini dapat
          memengaruhi pengalaman Anda di situs kami.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          5. Pembagian Informasi
        </h2>
        <p className="mb-4">
          Kami tidak membagikan data pribadi Anda kepada pihak ketiga tanpa
          persetujuan Anda, kecuali dalam situasi berikut:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Lembaga Sertifikasi:</span> Untuk
            keperluan uji kompetensi dan sertifikasi sesuai regulasi yang
            berlaku.
          </li>
          <li>
            <span className="font-medium">Penyedia Layanan:</span> Kepada mitra
            teknologi (hosting, email) dengan perlindungan data yang memadai.
          </li>
          <li>
            <span className="font-medium">Kewajiban Hukum:</span> Jika
            diwajibkan oleh hukum, perintah pengadilan, atau proses hukum
            lainnya.
          </li>
          <li>
            <span className="font-medium">Keamanan:</span> Untuk melindungi hak,
            properti, atau keselamatan kami, pengguna, atau publik.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          6. Hak Pengguna
        </h2>
        <p className="mb-4">Anda memiliki hak untuk:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Akses Data:</span> Meminta salinan
            data pribadi yang kami simpan tentang Anda.
          </li>
          <li>
            <span className="font-medium">Koreksi:</span> Meminta perbaikan data
            yang tidak akurat atau tidak lengkap.
          </li>
          <li>
            <span className="font-medium">Penghapusan:</span> Meminta
            penghapusan data pribadi Anda (hak untuk dilupakan).
          </li>
          <li>
            <span className="font-medium">Pembatasan:</span> Meminta pembatasan
            pemrosesan data dalam situasi tertentu.
          </li>
          <li>
            <span className="font-medium">Portabilitas:</span> Menerima data
            Anda dalam format yang dapat dibaca mesin.
          </li>
          <li>
            <span className="font-medium">Keberatan:</span> Mengajukan keberatan
            terhadap pemrosesan data untuk tujuan tertentu.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          7. Retensi Data
        </h2>
        <p>
          Kami menyimpan data pribadi Anda selama diperlukan untuk tujuan yang
          dijelaskan dalam kebijakan ini, atau sesuai dengan kewajiban hukum.
          Data akan dihapus secara otomatis setelah periode retensi yang
          ditentukan, kecuali jika diperlukan untuk kepatuhan hukum atau
          penyelesaian sengketa.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          8. Keamanan Data
        </h2>
        <div className="space-y-4">
          <p>
            Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang
            sesuai untuk melindungi data pribadi Anda, termasuk:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Enkripsi data dalam transit dan saat istirahat</li>
            <li>Kontrol akses yang ketat dan autentikasi multi-faktor</li>
            <li>Pemantauan keamanan dan deteksi intrusi</li>
            <li>Pelatihan keamanan untuk staf</li>
            <li>Pembaruan keamanan berkala</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          9. Transfer Data Internasional
        </h2>
        <p>
          Data pribadi Anda dapat ditransfer ke dan diproses di negara lain di
          mana server kami atau penyedia layanan kami berada. Kami memastikan
          bahwa transfer tersebut dilakukan sesuai dengan standar keamanan yang
          memadai dan perlindungan data yang sesuai.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          10. Tautan ke Situs Eksternal
        </h2>
        <p>
          Situs kami dapat berisi tautan ke situs eksternal yang dioperasikan
          oleh pihak ketiga. Kami tidak bertanggung jawab atas konten atau
          kebijakan privasi situs tersebut. Kami menyarankan Anda untuk membaca
          kebijakan privasi setiap situs yang Anda kunjungi.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          11. Anak-anak
        </h2>
        <p>
          Situs kami tidak ditujukan untuk anak-anak di bawah usia 13 tahun.
          Kami tidak secara sadar mengumpulkan informasi pribadi dari anak-anak
          di bawah usia 13 tahun. Jika Anda adalah orang tua atau wali dan
          mengetahui bahwa anak Anda telah memberikan data pribadi kepada kami,
          silakan hubungi kami.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          12. Perubahan Kebijakan
        </h2>
        <p>
          Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu.
          Perubahan akan diinformasikan melalui situs kami dan berlaku segera
          setelah dipublikasikan. Silakan tinjau secara berkala untuk mengetahui
          pembaruan terbaru. Penggunaan berkelanjutan dari layanan kami setelah
          perubahan berarti Anda menerima kebijakan yang diperbarui.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          13. Penyelesaian Sengketa
        </h2>
        <p>
          Jika Anda memiliki keluhan tentang pemrosesan data pribadi Anda, kami
          mendorong Anda untuk menghubungi kami terlebih dahulu. Jika masalah
          tidak dapat diselesaikan, Anda dapat mengajukan keluhan kepada
          otoritas perlindungan data yang berwenang.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          14. Kontak
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="mb-4">
            Jika Anda memiliki pertanyaan, permintaan, atau keluhan terkait
            privasi, silakan hubungi kami:
          </p>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Email:</span>{" "}
              <a
                href="mailto:info.tuk@pgnsolution.co.id"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                info.tuk@pgnsolution.co.id
              </a>
            </p>
            <p>
              <span className="font-medium">Alamat:</span> TUK P Gas, PGN
              Solution
            </p>
            <p>
              <span className="font-medium">Jam Kerja:</span> Senin - Jumat,
              08:00 - 17:00 WIB
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400">
          <p className="text-yellow-800">
            <strong>Penting:</strong> Dengan menggunakan situs dan layanan kami,
            Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan
            Kebijakan Privasi ini. Jika Anda tidak setuju dengan kebijakan ini,
            harap jangan menggunakan layanan kami.
          </p>
        </div>
      </section>
    </main>
  );
}

export { PrivacyPolicyPage as default };
