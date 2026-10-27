/*
 * Konfigurasi bisnis Kokoh.
 * Semua nilai di sini WAJIB dikonfirmasi owner sebelum publikasi (PRD §12).
 * Isi `null` / string kosong = tidak ditampilkan di website.
 */
window.KOKOH_CONFIG = {
  brandName: "Kokoh",
  tagline: "Batu alam, bata, dan material bangunan pilihan.",

  // Nomor WhatsApp bisnis dalam format internasional tanpa "+" atau spasi, contoh: "6281234567890".
  // Selama masih kosong, tombol WA tetap membuka WhatsApp dengan pesan terisi, tetapi pengguna harus memilih kontak sendiri.
  whatsappNumber: "",

  address: null,        // contoh: "Jl. Raya ... No. 12, Kota ..."
  serviceArea: null,    // contoh: "Melayani pengiriman area Jabodetabek"
  hours: null,          // contoh: [["Senin – Sabtu", "08.00 – 17.00"], ["Minggu", "Tutup"]]
  email: null,
  social: {
    instagram: null,    // URL lengkap
    facebook: null,
    tiktok: null,
  },
};
