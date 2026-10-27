/*
 * Data katalog, galeri, testimoni, dan artikel Kokoh (statis untuk MVP).
 *
 * CATATAN: Produk dan spesifikasi di bawah adalah DATA CONTOH untuk kebutuhan
 * desain & pengembangan. Ganti dengan daftar produk, satuan, dan harga yang
 * benar-benar dijual owner sebelum publikasi (PRD §8 & §12).
 *
 * Struktur produk (PRD §8):
 *   id, name, category (key dari CATEGORIES), description, specs [[label, nilai]],
 *   unit, price (harga mulai dari, angka rupiah per satuan; null → "Hubungi untuk harga"),
 *   — harga saat ini adalah PERKIRAAN CONTOH, bukan harga owner,
 *   images (array URL foto; kosong → ilustrasi tekstur ditampilkan dengan label),
 *   texture (jenis ilustrasi cadangan), availability, waMessage (opsional), status.
 */

window.KOKOH_CATEGORIES = [
  { key: "dinding-fasad", label: "Batu Alam Dinding & Fasad" },
  { key: "taman", label: "Batu Alam Taman & Dekorasi" },
  { key: "bata-merah", label: "Bata Merah" },
  { key: "bata-roster", label: "Bata Roster / Dekoratif" },
  { key: "bata-tempel", label: "Bata Tempel" },
];

window.KOKOH_PRODUCTS = [
  {
    id: "BATU-001",
    name: "Batu Belah Susun Alami",
    category: "dinding-fasad",
    description: "Batu belah berbentuk acak yang disusun alami, memberi karakter kuat pada dinding eksterior, fasad, pagar, maupun dinding aksen interior.",
    specs: [["Ukuran", "Sesuai stok, dikonfirmasi admin"], ["Finishing", "Pilihan finishing dikonfirmasi admin"], ["Penggunaan", "Dinding, fasad, pagar"]],
    unit: "m²",
    price: 150000, // CONTOH — konfirmasi owner
    images: ["assets/img/photos/andesit.jpg", "assets/img/photos/interior.jpg", "assets/img/photos/fasad.jpg"],
    texture: "andesit",
    availability: "Tanyakan stok ke admin",
    status: "published",
  },
  {
    id: "BATU-002",
    name: "Batu Paras Jogja",
    category: "dinding-fasad",
    description: "Batu berwarna krem lembut dengan tekstur halus, memberi kesan hangat untuk dinding interior maupun eksterior.",
    specs: [["Ukuran", "Sesuai stok, dikonfirmasi admin"], ["Finishing", "Pilihan finishing dikonfirmasi admin"], ["Penggunaan", "Dinding interior & eksterior"]],
    unit: "m²",
    price: 120000, // CONTOH — konfirmasi owner
    images: ["assets/img/photos/paras.jpg"],
    texture: "paras",
    availability: "Tanyakan stok ke admin",
    status: "published",
  },
  {
    id: "BATU-003",
    name: "Batu Palimanan",
    category: "dinding-fasad",
    description: "Batu bernuansa kuning kecokelatan dengan corak alami, populer untuk aksen dinding dan fasad.",
    specs: [["Ukuran", "Sesuai stok, dikonfirmasi admin"], ["Finishing", "Pilihan finishing dikonfirmasi admin"], ["Penggunaan", "Dinding aksen, fasad"]],
    unit: "m²",
    price: 95000, // CONTOH — konfirmasi owner
    images: ["assets/img/photos/palimanan.jpg"],
    texture: "palimanan",
    availability: "Tanyakan stok ke admin",
    status: "published",
  },
  {
    id: "BATU-004",
    name: "Batu Koral Taman",
    category: "taman",
    description: "Batu koral bulat untuk taman kering, jalur setapak, dan dekorasi area hijau.",
    specs: [["Ukuran butir", "Dikonfirmasi admin"], ["Warna", "Campuran alami"], ["Penggunaan", "Taman, jalur, dekorasi"]],
    unit: "karung",
    price: 35000, // CONTOH — konfirmasi owner
    images: ["assets/img/photos/koral.jpg"],
    texture: "koral",
    availability: "Tanyakan stok ke admin",
    status: "published",
  },
  {
    id: "BATU-005",
    name: "Batu Kerikil Taman",
    category: "taman",
    description: "Kerikil untuk jalur setapak dan area taman agar tetap rapi, mudah dilalui, dan cepat menyerap air hujan.",
    specs: [["Ukuran butir", "Dikonfirmasi admin"], ["Warna", "Campuran alami"], ["Penggunaan", "Jalur setapak, carport, taman"]],
    unit: "karung",
    price: 25000, // CONTOH — konfirmasi owner
    images: ["assets/img/photos/jalur-kerikil.jpg"],
    texture: "pijakan",
    availability: "Tanyakan stok ke admin",
    status: "published",
  },
  {
    id: "BATA-001",
    name: "Bata Merah Press",
    category: "bata-merah",
    description: "Bata merah hasil cetak press dengan bentuk lebih presisi, cocok untuk dinding struktur maupun ekspos.",
    specs: [["Ukuran", "Dikonfirmasi admin"], ["Material", "Tanah liat bakar"], ["Penggunaan", "Dinding struktur, dinding ekspos"]],
    unit: "buah",
    price: 1500, // CONTOH — konfirmasi owner
    images: ["assets/img/photos/bata-press.jpg", "assets/img/photos/bata-dinding.jpg"],
    texture: "bata",
    availability: "Tanyakan stok ke admin",
    status: "published",
  },
  {
    id: "BATA-002",
    name: "Bata Merah Konvensional",
    category: "bata-merah",
    description: "Bata merah tanah liat bakar untuk kebutuhan dinding rumah dan bangunan umum.",
    specs: [["Ukuran", "Dikonfirmasi admin"], ["Material", "Tanah liat bakar"], ["Penggunaan", "Dinding bangunan"]],
    unit: "buah",
    price: 800, // CONTOH — konfirmasi owner
    images: ["assets/img/photos/bata-tumpuk.jpg", "assets/img/photos/bata-palet.jpg"],
    texture: "bata-kasar",
    availability: "Tanyakan stok ke admin",
    status: "published",
  },
  {
    id: "ROST-001",
    name: "Roster Motif Dekoratif",
    category: "bata-roster",
    description: "Roster dengan motif lubang dekoratif untuk sirkulasi udara dan cahaya, sekaligus menjadi elemen dekoratif dinding.",
    specs: [["Ukuran", "Dikonfirmasi admin"], ["Material", "Dikonfirmasi admin"], ["Penggunaan", "Ventilasi, partisi, aksen dinding"]],
    unit: "buah",
    price: 12000, // CONTOH — konfirmasi owner
    images: ["assets/img/photos/roster-1.jpg"],
    texture: "roster",
    availability: "Tanyakan stok ke admin",
    status: "published",
  },
  {
    id: "ROST-002",
    name: "Roster Motif Kisi",
    category: "bata-roster",
    description: "Roster dengan motif kisi rapat yang memberi pola cahaya dan bayangan menarik pada dinding dan pagar.",
    specs: [["Ukuran", "Dikonfirmasi admin"], ["Material", "Dikonfirmasi admin"], ["Penggunaan", "Ventilasi, pagar, aksen dinding"]],
    unit: "buah",
    price: 15000, // CONTOH — konfirmasi owner
    images: ["assets/img/photos/roster-2.jpg"],
    texture: "roster-bulat",
    availability: "Tanyakan stok ke admin",
    status: "published",
  },
  {
    id: "TEMP-001",
    name: "Bata Tempel Ekspos",
    category: "bata-tempel",
    description: "Lembaran bata tipis untuk tampilan dinding bata ekspos tanpa harus membangun dinding bata utuh.",
    specs: [["Ukuran", "Dikonfirmasi admin"], ["Material", "Tanah liat bakar"], ["Penggunaan", "Dinding interior & eksterior"]],
    unit: "m²",
    price: 95000, // CONTOH — konfirmasi owner
    images: ["assets/img/photos/tempel.jpg"],
    texture: "tempel",
    availability: "Tanyakan stok ke admin",
    status: "published",
  },
  {
    id: "TEMP-002",
    name: "Bata Tempel Antik",
    category: "bata-tempel",
    description: "Bata tempel dengan warna bervariasi dan kesan klasik untuk dinding aksen, kafe, atau fasad.",
    specs: [["Ukuran", "Dikonfirmasi admin"], ["Material", "Tanah liat bakar"], ["Penggunaan", "Dinding aksen, fasad"]],
    unit: "m²",
    price: 120000, // CONTOH — konfirmasi owner
    images: ["assets/img/photos/tempel-antik.jpg"],
    texture: "tempel-antik",
    availability: "Tanyakan stok ke admin",
    status: "published",
  },
];

/* Galeri: utamakan foto asli owner (PRD §3.4). Foto di assets/img/photos/ adalah foto referensi berlisensi bebas (lihat KOKOH_PHOTO_CREDITS). */
window.KOKOH_GALLERY = [
  { title: "Dinding Batu Belah", category: "dinding-fasad", image: "assets/img/photos/andesit.jpg" },
  { title: "Batu Alam pada Dinding Interior", category: "dinding-fasad", image: "assets/img/photos/interior.jpg" },
  { title: "Fasad Rumah Berlapis Batu Alam", category: "dinding-fasad", image: "assets/img/photos/fasad.jpg" },
  { title: "Susunan Batu Paras", category: "dinding-fasad", image: "assets/img/photos/paras.jpg" },
  { title: "Dinding Batu Palimanan", category: "dinding-fasad", image: "assets/img/photos/palimanan.jpg" },
  { title: "Batu Koral", category: "taman", image: "assets/img/photos/koral.jpg" },
  { title: "Jalur Kerikil Taman", category: "taman", image: "assets/img/photos/jalur-kerikil.jpg" },
  { title: "Dinding Bata Merah", category: "bata-merah", image: "assets/img/photos/bata-press.jpg" },
  { title: "Bata Merah Ekspos", category: "bata-merah", image: "assets/img/photos/bata-dinding.jpg" },
  { title: "Bata Merah di Atas Palet", category: "bata-merah", image: "assets/img/photos/bata-palet.jpg" },
  { title: "Tumpukan Bata Merah", category: "bata-merah", image: "assets/img/photos/bata-tumpuk.jpg" },
  { title: "Roster Motif Dekoratif", category: "bata-roster", image: "assets/img/photos/roster-1.jpg" },
  { title: "Dinding Roster Motif Kisi", category: "bata-roster", image: "assets/img/photos/roster-2.jpg" },
  { title: "Bata Tempel Ekspos", category: "bata-tempel", image: "assets/img/photos/tempel.jpg" },
  { title: "Bata Tempel Antik", category: "bata-tempel", image: "assets/img/photos/tempel-antik.jpg" },
];

/*
 * Testimoni: HANYA isi dengan ulasan pelanggan nyata yang sudah memberi izin (PRD §3.5).
 * Selama kosong, section testimoni otomatis disembunyikan.
 * Format: { name: "Nama / Usaha", product: "Produk yang dibeli", quote: "Isi ulasan", image: null }
 */
window.KOKOH_TESTIMONIALS = [];

window.KOKOH_ARTICLES = [
  {
    slug: "batu-alam-interior-vs-eksterior",
    title: "Perbedaan Batu Alam untuk Dinding Interior dan Eksterior",
    excerpt: "Tidak semua batu alam cocok untuk setiap area. Kenali pertimbangan utama sebelum memilih.",
    image: "assets/img/photos/interior.jpg",
    texture: "paras",
    readTime: "4 menit",
    body: `
      <p>Batu alam bisa dipasang di dalam maupun luar ruangan, tetapi kondisi kedua area itu sangat berbeda. Dinding eksterior terkena hujan, panas matahari, dan lumut, sedangkan dinding interior lebih terlindung namun lebih sering dilihat dari dekat.</p>
      <h2>Pertimbangan untuk eksterior</h2>
      <ul>
        <li><strong>Kepadatan dan daya serap air.</strong> Batu yang lebih padat, seperti andesit, umumnya lebih tahan terhadap cuaca dan lumut.</li>
        <li><strong>Warna.</strong> Warna gelap cenderung menyamarkan noda, sedangkan warna terang memberi kesan bersih namun perlu perawatan lebih rutin.</li>
        <li><strong>Pelapis (coating).</strong> Pelapis anti-air membantu mengurangi rembesan dan pertumbuhan lumut.</li>
      </ul>
      <h2>Pertimbangan untuk interior</h2>
      <ul>
        <li><strong>Tekstur.</strong> Karena dilihat dan disentuh dari dekat, tekstur halus seperti batu paras sering dipilih untuk ruang tamu atau dinding TV.</li>
        <li><strong>Pencahayaan.</strong> Lampu sorot dari atas atau bawah akan menonjolkan tekstur batu.</li>
        <li><strong>Debu.</strong> Permukaan yang sangat kasar lebih mudah menampung debu di dalam ruangan.</li>
      </ul>
      <h2>Kesimpulan</h2>
      <p>Tentukan dulu lokasi pemasangan, paparan cuaca, dan tampilan yang diinginkan. Jika ragu, konsultasikan foto area dan ukurannya kepada tim Kokoh melalui WhatsApp agar kami bantu rekomendasikan material yang sesuai.</p>
    `,
  },
  {
    slug: "cara-menghitung-kebutuhan-batu-alam",
    title: "Cara Menghitung Kebutuhan Batu Alam per Meter Persegi",
    excerpt: "Rumus sederhana untuk memperkirakan jumlah batu alam agar tidak kurang atau berlebih.",
    image: "assets/img/photos/andesit.jpg",
    texture: "andesit",
    readTime: "3 menit",
    body: `
      <p>Menghitung kebutuhan material sejak awal membantu Anda menyusun anggaran dan menghindari pemesanan ulang di tengah pekerjaan.</p>
      <h2>1. Hitung luas bidang</h2>
      <p>Kalikan panjang dan tinggi dinding. Contoh: dinding 3 m × 2,5 m = <strong>7,5 m²</strong>.</p>
      <h2>2. Kurangi bukaan</h2>
      <p>Jika ada jendela atau pintu di bidang tersebut, kurangi luasnya. Contoh: jendela 1 m × 1 m, maka 7,5 − 1 = <strong>6,5 m²</strong>.</p>
      <h2>3. Tambahkan cadangan</h2>
      <p>Tambahkan sekitar 5–10% untuk potongan dan batu yang pecah saat pemasangan. Contoh dengan cadangan 10%: 6,5 × 1,1 ≈ <strong>7,2 m²</strong>.</p>
      <h2>4. Jika dijual per buah</h2>
      <p>Hitung luas satu batu, lalu bagi 1 m² dengan luas tersebut. Contoh batu 10 × 20 cm = 0,02 m², maka sekitar 50 buah per m² (belum termasuk nat). Kalikan dengan luas total dari langkah 3.</p>
      <p>Angka di atas adalah perkiraan. Kirimkan ukuran bidang Anda ke admin Kokoh untuk dibantu menghitung sesuai ukuran dan satuan produk yang dipilih.</p>
    `,
  },
  {
    slug: "perbedaan-bata-merah-bata-tempel-bata-roster",
    title: "Perbedaan Bata Merah, Bata Tempel, dan Bata Roster",
    excerpt: "Ketiganya sama-sama dari tanah liat, tetapi fungsi dan cara pemasangannya berbeda.",
    image: "assets/img/photos/bata-dinding.jpg",
    texture: "bata",
    readTime: "3 menit",
    body: `
      <h2>Bata merah</h2>
      <p>Bata utuh yang menjadi bagian dari struktur dinding. Selain untuk dinding yang diplester, bata merah juga dapat dibiarkan ekspos untuk tampilan industrial atau rustic.</p>
      <h2>Bata tempel</h2>
      <p>Lembaran bata tipis yang ditempel pada dinding yang sudah ada. Pilihan praktis bila Anda ingin tampilan bata ekspos tanpa membongkar atau membangun dinding baru.</p>
      <h2>Bata roster</h2>
      <p>Bata berlubang dengan motif tertentu. Fungsinya sebagai ventilasi, jalur cahaya, dan partisi, sekaligus elemen dekoratif yang menghasilkan pola bayangan menarik.</p>
      <h2>Mana yang dipilih?</h2>
      <ul>
        <li>Membangun dinding baru → bata merah.</li>
        <li>Mempercantik dinding yang sudah ada → bata tempel.</li>
        <li>Butuh sirkulasi udara dan cahaya → bata roster.</li>
      </ul>
    `,
  },
  {
    slug: "tips-merawat-batu-alam",
    title: "Tips Merawat Batu Alam agar Tetap Awet",
    excerpt: "Langkah sederhana menjaga warna dan tekstur batu alam tetap menarik bertahun-tahun.",
    image: "assets/img/photos/palimanan.jpg",
    texture: "palimanan",
    readTime: "3 menit",
    body: `
      <ul>
        <li><strong>Gunakan pelapis (coating).</strong> Pelapis membantu mengurangi rembesan air, noda, dan lumut. Ikuti anjuran pelapisan ulang dari produsen coating.</li>
        <li><strong>Bersihkan dengan lembut.</strong> Gunakan sikat berbulu lembut dan air bersih. Hindari sikat kawat yang dapat merusak permukaan.</li>
        <li><strong>Hindari cairan asam keras.</strong> Pembersih berbahan asam dapat mengikis permukaan dan mengubah warna batu.</li>
        <li><strong>Atasi lumut sejak awal.</strong> Pada area lembap, bersihkan lumut secara berkala sebelum menyebar.</li>
        <li><strong>Periksa nat.</strong> Nat yang retak bisa menjadi jalan masuk air. Perbaiki secepatnya.</li>
      </ul>
    `,
  },
  {
    slug: "inspirasi-fasad-batu-alam",
    title: "Inspirasi Desain Fasad Menggunakan Batu Alam",
    excerpt: "Beberapa ide penerapan batu alam untuk membuat tampak depan rumah lebih berkarakter.",
    image: "assets/img/photos/fasad.jpg",
    texture: "tempel-antik",
    readTime: "3 menit",
    body: `
      <h2>1. Satu bidang aksen</h2>
      <p>Pasang batu alam pada satu bidang saja, misalnya kolom atau dinding samping pintu, agar fasad terlihat tegas tanpa berlebihan.</p>
      <h2>2. Kombinasi warna kontras</h2>
      <p>Padukan batu gelap seperti andesit dengan cat dinding putih atau krem untuk kesan modern.</p>
      <h2>3. Pagar dan dinding bawah</h2>
      <p>Batu alam pada bagian bawah dinding dan pagar membantu melindungi area yang sering terkena cipratan air.</p>
      <h2>4. Mainkan tekstur dan cahaya</h2>
      <p>Lampu dinding yang menyorot ke bawah akan memunculkan bayangan tekstur batu di malam hari.</p>
      <p>Punya foto fasad rumah Anda? Kirimkan ke tim Kokoh untuk didiskusikan pilihan material yang cocok.</p>
    `,
  },
];

/*
 * Kredit foto referensi dari Wikimedia Commons (sudah diperkecil & dikompresi).
 * Ditampilkan di kredit-foto.html. Hapus entri saat foto diganti dengan foto asli owner.
 */
window.KOKOH_PHOTO_CREDITS = {
  "assets/img/photos/andesit.jpg": {
    "title": "Garden wall travertine noce rockface seamless cladding.jpg",
    "author": "Frank Petry / Marmormagia Naturstein (User: Fravert)",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Garden_wall_travertine_noce_rockface_seamless_cladding.jpg"
  },
  "assets/img/photos/bata-dinding.jpg": {
    "title": "087 Red brick wall background, brick wall texture free photo with attribution.jpg",
    "author": "Marek Ślusarczyk (Tupungato)",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:087_Red_brick_wall_background,_brick_wall_texture_free_photo_with_attribution.jpg"
  },
  "assets/img/photos/bata-palet.jpg": {
    "title": "Stacks of red bricks and concrete blocks at a construction site during the day in an urban environment.jpg",
    "author": "Shixart1985",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Stacks_of_red_bricks_and_concrete_blocks_at_a_construction_site_during_the_day_in_an_urban_environment.jpg"
  },
  "assets/img/photos/bata-press.jpg": {
    "title": "Red-brick-wall-texture-1.jpg",
    "author": "MartinThoma",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Red-brick-wall-texture-1.jpg"
  },
  "assets/img/photos/bata-tumpuk.jpg": {
    "title": "Red Bricks Stack on Sidewalk of Lane 212, Section 5, Minsheng East Road, Taipei 20160829.jpg",
    "author": "玄史生",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Red_Bricks_Stack_on_Sidewalk_of_Lane_212,_Section_5,_Minsheng_East_Road,_Taipei_20160829.jpg"
  },
  "assets/img/photos/fasad.jpg": {
    "title": "Stone-clad colonial house with blue door in Laguna de Raya, Margarita Island, Venezuela.jpg",
    "author": "Wilfredor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Stone-clad_colonial_house_with_blue_door_in_Laguna_de_Raya,_Margarita_Island,_Venezuela.jpg"
  },
  "assets/img/photos/interior.jpg": {
    "title": "Wohnraumgestaltung mit Travertin Classic Rockface Verblendern an einer Akzentwand – Mai 2026.jpg",
    "author": "Frank Petry / Marmormagia Naturstein (User: Fravert)",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Wohnraumgestaltung_mit_Travertin_Classic_Rockface_Verblendern_an_einer_Akzentwand_%E2%80%93_Mai_2026.jpg"
  },
  "assets/img/photos/jalur-kerikil.jpg": {
    "title": "Blake Hall Essex gravel path 02.jpg",
    "author": "Acabashi",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Blake_Hall_Essex_gravel_path_02.jpg"
  },
  "assets/img/photos/koral.jpg": {
    "title": "Ganges river pebbles - Preview (Amal Kumar via Poly Haven).webp",
    "author": "Amal Kumar",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Ganges_river_pebbles_-_Preview_(Amal_Kumar_via_Poly_Haven).webp"
  },
  "assets/img/photos/palimanan.jpg": {
    "title": "Old stone brick wall.jpg",
    "author": "Titus Tscharntke",
    "license": "Public domain",
    "licenseUrl": "",
    "source": "https://commons.wikimedia.org/wiki/File:Old_stone_brick_wall.jpg"
  },
  "assets/img/photos/paras.jpg": {
    "title": "Tan sandstone block smooth clean seamless building wall texture.jpg",
    "author": "Sisters.seamless",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Tan_sandstone_block_smooth_clean_seamless_building_wall_texture.jpg"
  },
  "assets/img/photos/roster-1.jpg": {
    "title": "Decorated wall01.jpg",
    "author": "Maje203",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Decorated_wall01.jpg"
  },
  "assets/img/photos/roster-2.jpg": {
    "title": "Peony House feature wall 201911.jpg",
    "author": "Wpcpey",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Peony_House_feature_wall_201911.jpg"
  },
  "assets/img/photos/tempel.jpg": {
    "title": "Red-brick-wall-texture-3.jpg",
    "author": "MartinThoma",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/wiki/File:Red-brick-wall-texture-3.jpg"
  },
  "assets/img/photos/tempel-antik.jpg": {
    "title": "Red old brick pattern.jpg",
    "author": "Titus Tscharntke",
    "license": "Public domain",
    "licenseUrl": "",
    "source": "https://commons.wikimedia.org/wiki/File:Red_old_brick_pattern.jpg"
  }
};
