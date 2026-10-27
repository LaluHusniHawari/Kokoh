# Website Kokoh (MVP)

Katalog batu alam, bata, dan material bangunan dengan pemesanan via WhatsApp — dibangun dari `PRD_Website_Kokoh.pdf`.

Website statis (HTML/CSS/JS tanpa build). Buka `index.html` langsung di browser, atau unggah seluruh folder ke hosting statis (Netlify, Vercel, GitHub Pages, cPanel) dengan HTTPS.

## Struktur

```
index.html          Beranda: hero, keunggulan, katalog, cara pesan, galeri, tentang, testimoni, artikel, CTA
produk.html?id=…    Detail produk + form jumlah/lokasi → WhatsApp
artikel.html        Daftar artikel; artikel.html?slug=… untuk isi artikel
kredit-foto.html    Atribusi foto referensi
assets/img/photos/  Foto referensi (≈140 KB/foto)
assets/js/config.js Nomor WhatsApp, alamat, jam operasional, media sosial
assets/js/data.js   Kategori, produk, galeri, testimoni, artikel
assets/js/textures.js  Ilustrasi tekstur sementara (selama foto asli belum ada)
assets/js/main.js   Render halaman, filter, pencarian, lightbox, link WhatsApp
assets/css/style.css
```

## Checklist sebelum publikasi (PRD §12)

- [ ] `config.js` → isi `whatsappNumber` (format `62…`). Selama kosong, tombol WA membuka WhatsApp tanpa tujuan dan console menampilkan peringatan.
- [ ] `config.js` → alamat, area layanan, jam operasional, media sosial (nilai `null` otomatis disembunyikan).
- [ ] `data.js` → ganti **data produk contoh** dengan produk, spesifikasi, dan satuan asli.
- [ ] `data.js` → ganti **harga contoh** (`price`, ditandai `// CONTOH — konfirmasi owner`) dengan harga "mulai dari" dari owner. Isi `price: null` untuk produk yang harganya ingin disembunyikan ("Hubungi untuk harga").
- [ ] Ganti foto referensi di `assets/img/photos/` dengan foto asli owner, lalu hapus entrinya dari `KOKOH_PHOTO_CREDITS` di `data.js`.
  - Foto saat ini berasal dari Wikimedia Commons (CC0 / Public domain / CC BY / CC BY-SA) dan berlabel "Foto referensi"; atribusinya ada di `kredit-foto.html` — jangan dihapus selama foto tersebut masih dipakai.
  - Foto tanpa entri kredit (foto owner) tampil tanpa label. Produk tanpa foto sama sekali memakai ilustrasi tekstur berlabel "Ilustrasi".
- [ ] Testimoni hanya dari pelanggan nyata dengan izin. Selama `KOKOH_TESTIMONIALS` kosong, section disembunyikan.
- [ ] Konfirmasi nama brand (masih sementara).
