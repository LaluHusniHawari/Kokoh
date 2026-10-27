(function () {
  const CFG = window.KOKOH_CONFIG;
  const CATEGORIES = window.KOKOH_CATEGORIES;
  const PRODUCTS = window.KOKOH_PRODUCTS.filter((p) => p.status === "published");
  const GALLERY = window.KOKOH_GALLERY;
  const TESTIMONIALS = window.KOKOH_TESTIMONIALS;
  const ARTICLES = window.KOKOH_ARTICLES;
  const CREDITS = window.KOKOH_PHOTO_CREDITS || {};

  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const categoryLabel = (key) => (CATEGORIES.find((c) => c.key === key) || {}).label || key;
  const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");
  const priceLabel = (p) => (p.price ? `Mulai ${rupiah(p.price)} / ${p.unit}` : "Hubungi untuk harga");
  const PRICE_NOTE = "Harga dapat berbeda sesuai ukuran, finishing, dan jumlah. Harga final dikonfirmasi admin.";

  function priceBlock(p, extraClass = "") {
    if (!p.price) return `<p class="price ${extraClass}"><span class="price__value price__value--ask">Hubungi untuk harga</span></p>`;
    return `<p class="price ${extraClass}"><span class="price__label">Mulai dari</span><span class="price__value">${rupiah(p.price)}</span><span class="price__unit">/ ${esc(p.unit)}</span></p>`;
  }

  /* ---------- WhatsApp ---------- */

  const waNumber = (CFG.whatsappNumber || "").replace(/\D/g, "");
  const waValid = /^62\d{8,13}$/.test(waNumber);
  if (!waValid) console.warn("[Kokoh] Nomor WhatsApp belum dikonfigurasi atau tidak valid di assets/js/config.js (format: 62xxxxxxxxxx).");

  function waLink(message) {
    const text = encodeURIComponent(message);
    return waValid ? `https://wa.me/${waNumber}?text=${text}` : `https://wa.me/?text=${text}`;
  }

  const GENERAL_MESSAGE = `Halo Admin ${CFG.brandName}, saya ingin berkonsultasi mengenai kebutuhan material bangunan. Mohon informasinya. Terima kasih.`;

  function productMessage(p, qty, location) {
    if (p.waMessage) return p.waMessage;
    return [
      `Halo Admin ${CFG.brandName}, saya ingin menanyakan produk berikut:`,
      "",
      `• Nama produk: ${p.name} (${p.id})`,
      ...(p.price ? [`• Harga di website: ${priceLabel(p)}`] : []),
      `• Jumlah: ${qty ? qty + " " + p.unit : "[isi jumlah]"}`,
      `• Lokasi pengiriman: ${location || "[isi lokasi]"}`,
      "",
      "Mohon informasi harga, ketersediaan stok, dan ongkos kirim. Terima kasih.",
    ].join("\n");
  }

  const ICON = {
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6 6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>',
  };

  const waAttrs = 'target="_blank" rel="noopener"';

  /* ---------- Media (foto asli atau ilustrasi berlabel) ---------- */

  // Foto yang punya entri kredit adalah foto referensi berlisensi bebas, bukan foto stok/proyek Kokoh — beri label.
  function media(item, seed, alt, extraClass = "") {
    const img = (item.images && item.images[0]) || item.image;
    if (img) {
      const badge = CREDITS[img] ? '<span class="media__badge">Foto referensi</span>' : "";
      return `<div class="media ${extraClass}"><img src="${esc(img)}" alt="${esc(alt)}" loading="lazy">${badge}</div>`;
    }
    return `<div class="media media--illustration ${extraClass}" role="img" aria-label="Ilustrasi tekstur ${esc(alt)}" style="background-image:url('${kokohTexture(item.texture, seed)}')"><span class="media__badge">Ilustrasi</span></div>`;
  }

  /* ---------- Header & footer ---------- */

  const NAV = [
    ["Beranda", "index.html#beranda", "home"],
    ["Produk", "index.html#produk", "produk"],
    ["Galeri", "index.html#galeri", "galeri"],
    ["Tentang Kami", "index.html#tentang", "tentang"],
    ["Artikel", "artikel.html", "artikel"],
    ["Kontak", "#kontak", "kontak"],
  ];

  function renderHeader() {
    const active = document.body.dataset.nav;
    const el = $("#site-header");
    el.innerHTML = `
      <a class="skip-link" href="#main">Lewati ke konten</a>
      <div class="container header__inner">
        <a class="logo" href="index.html" aria-label="${esc(CFG.brandName)} – Beranda">
          <span class="logo__mark" aria-hidden="true"></span>${esc(CFG.brandName.toUpperCase())}
        </a>
        <nav class="nav" id="nav" aria-label="Navigasi utama">
          <ul>${NAV.map(([label, href, key]) => `<li><a href="${href}"${key === active ? ' aria-current="page"' : ""}>${label}</a></li>`).join("")}</ul>
          <a class="btn btn--wa btn--sm nav__cta" href="${waLink(GENERAL_MESSAGE)}" ${waAttrs}>${ICON.wa}Tanya Harga</a>
        </nav>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav" aria-label="Buka menu">${ICON.menu}</button>
      </div>`;
    const toggle = $(".nav-toggle", el);
    const nav = $("#nav", el);
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      toggle.innerHTML = open ? ICON.close : ICON.menu;
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    nav.addEventListener("click", (e) => e.target.closest("a") && setOpen(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
  }

  function renderFooter() {
    const s = CFG.social || {};
    const socials = [["Instagram", s.instagram], ["Facebook", s.facebook], ["TikTok", s.tiktok]].filter(([, url]) => url);
    const contactRows = [
      `<li><a href="${waLink(GENERAL_MESSAGE)}" ${waAttrs}>${ICON.wa} WhatsApp${waValid ? " +" + waNumber : ""}</a></li>`,
      CFG.email && `<li><a href="mailto:${esc(CFG.email)}">${esc(CFG.email)}</a></li>`,
      CFG.address && `<li>${esc(CFG.address)}</li>`,
      CFG.serviceArea && `<li>${esc(CFG.serviceArea)}</li>`,
    ].filter(Boolean).join("");
    const hours = CFG.hours && CFG.hours.length
      ? `<div><h3 class="footer__title">Jam Operasional</h3><ul class="footer__list">${CFG.hours.map(([d, h]) => `<li><span>${esc(d)}</span> ${esc(h)}</li>`).join("")}</ul></div>`
      : "";

    $("#kontak").innerHTML = `
      <div class="container footer__grid">
        <div class="footer__brand">
          <a class="logo logo--light" href="index.html"><span class="logo__mark" aria-hidden="true"></span>${esc(CFG.brandName.toUpperCase())}</a>
          <p>${esc(CFG.tagline)} Konsultasikan kebutuhan material proyek Anda bersama tim ${esc(CFG.brandName)} melalui WhatsApp.</p>
          ${socials.length ? `<ul class="footer__social">${socials.map(([n, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${n}</a></li>`).join("")}</ul>` : ""}
        </div>
        <div>
          <h3 class="footer__title">Navigasi</h3>
          <ul class="footer__list">${NAV.filter(([, , k]) => k !== "kontak").map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h3 class="footer__title">Kategori Produk</h3>
          <ul class="footer__list">${CATEGORIES.map((c) => `<li><a href="index.html?kategori=${c.key}#produk">${esc(c.label)}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h3 class="footer__title">Kontak</h3>
          <ul class="footer__list footer__contact">${contactRows}</ul>
        </div>
        ${hours}
      </div>
      <div class="container footer__bottom">
        <p>© ${new Date().getFullYear()} ${esc(CFG.brandName)}. Seluruh hak dilindungi.</p>
        <p>Harga, stok, dan ongkos kirim dikonfirmasi oleh admin melalui WhatsApp.${Object.keys(CREDITS).length ? ' · <a href="kredit-foto.html">Kredit foto</a>' : ""}</p>
      </div>`;

    const fab = document.createElement("a");
    fab.className = "wa-fab";
    fab.href = waLink(GENERAL_MESSAGE);
    fab.target = "_blank";
    fab.rel = "noopener";
    fab.setAttribute("aria-label", "Konsultasi via WhatsApp");
    fab.innerHTML = ICON.wa + "<span>Konsultasi</span>";
    document.body.appendChild(fab);
  }

  /* ---------- Kartu produk ---------- */

  function productCard(p, i) {
    return `
      <article class="card product-card">
        <a href="produk.html?id=${encodeURIComponent(p.id)}" class="product-card__media" tabindex="-1" aria-hidden="true">${media(p, i + 1, p.name)}</a>
        <div class="product-card__body">
          <p class="eyebrow">${esc(categoryLabel(p.category))}</p>
          <h3 class="product-card__title"><a href="produk.html?id=${encodeURIComponent(p.id)}">${esc(p.name)}</a></h3>
          <p class="product-card__desc">${esc(p.description)}</p>
          ${priceBlock(p, "product-card__price")}
          <div class="product-card__actions">
            <a class="btn btn--outline btn--sm" href="produk.html?id=${encodeURIComponent(p.id)}">Detail Produk</a>
            <a class="btn btn--wa btn--sm" href="${waLink(productMessage(p))}" ${waAttrs} aria-label="Pesan ${esc(p.name)} via WhatsApp">${ICON.wa}Pesan via WA</a>
          </div>
        </div>
      </article>`;
  }

  function filterChips(container, active, onChange) {
    const all = [{ key: "semua", label: "Semua" }, ...CATEGORIES];
    container.innerHTML = all.map((c) => `<button type="button" class="chip" data-key="${c.key}" aria-pressed="${c.key === active}">${esc(c.label)}</button>`).join("");
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      container.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", b === btn));
      onChange(btn.dataset.key);
    });
  }

  /* ---------- Lightbox ---------- */

  function createLightbox() {
    const dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.setAttribute("aria-label", "Pratinjau foto");
    dlg.innerHTML = `
      <div class="lightbox__frame">
        <div class="lightbox__media"></div>
        <p class="lightbox__caption"></p>
      </div>
      <button class="lightbox__btn lightbox__close" type="button" aria-label="Tutup">${ICON.close}</button>
      <button class="lightbox__btn lightbox__prev" type="button" aria-label="Foto sebelumnya">${ICON.prev}</button>
      <button class="lightbox__btn lightbox__next" type="button" aria-label="Foto berikutnya">${ICON.next}</button>`;
    document.body.appendChild(dlg);
    let items = [], index = 0;
    const show = () => {
      const it = items[index];
      $(".lightbox__media", dlg).innerHTML = media(it.item, it.seed, it.title, "media--large");
      $(".lightbox__caption", dlg).textContent = `${it.title} · ${index + 1} / ${items.length}`;
    };
    const step = (d) => { index = (index + d + items.length) % items.length; show(); };
    $(".lightbox__close", dlg).onclick = () => dlg.close();
    $(".lightbox__prev", dlg).onclick = () => step(-1);
    $(".lightbox__next", dlg).onclick = () => step(1);
    dlg.addEventListener("click", (e) => e.target === dlg && dlg.close());
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
    return {
      open(list, i) {
        items = list; index = i; show();
        dlg.showModal();
        $(".lightbox__close", dlg).focus();
      },
    };
  }

  /* ---------- Halaman: Beranda ---------- */

  function initHome() {
    $$wa("[data-wa=general]", GENERAL_MESSAGE);

    $("#about-visual").innerHTML = [["bata-palet", "Bata merah di atas palet"], ["paras", "Batu paras"], ["roster-1", "Roster dekoratif"]]
      .map(([name, alt]) => media({ image: `assets/img/photos/${name}.jpg` }, 0, alt)).join("");

    // Katalog
    const grid = $("#product-grid");
    const search = $("#product-search");
    const empty = $("#product-empty");
    const count = $("#product-count");
    const params = new URLSearchParams(location.search);
    let cat = CATEGORIES.some((c) => c.key === params.get("kategori")) ? params.get("kategori") : "semua";

    const renderProducts = () => {
      const q = search.value.trim().toLowerCase();
      const list = PRODUCTS.filter((p) => (cat === "semua" || p.category === cat) && (!q || p.name.toLowerCase().includes(q)));
      grid.innerHTML = list.map(productCard).join("");
      empty.hidden = list.length > 0;
      count.textContent = `${list.length} produk ditampilkan`;
    };
    filterChips($("#product-filters"), cat, (k) => { cat = k; renderProducts(); });
    search.addEventListener("input", renderProducts);
    $("#product-reset").addEventListener("click", () => {
      search.value = ""; cat = "semua";
      document.querySelectorAll("#product-filters .chip").forEach((b) => b.setAttribute("aria-pressed", b.dataset.key === "semua"));
      renderProducts();
    });
    renderProducts();

    // Galeri
    const lightbox = createLightbox();
    const gGrid = $("#gallery-grid");
    let gCat = "semua", gList = [];
    const renderGallery = () => {
      gList = GALLERY.map((g, i) => ({ item: g, seed: 101 + i, title: g.title, category: g.category }))
        .filter((g) => gCat === "semua" || g.category === gCat);
      gGrid.innerHTML = gList.map((g, i) => `
        <li><button type="button" class="gallery__item" data-index="${i}" aria-label="Perbesar foto: ${esc(g.title)}">
          ${media(g.item, g.seed, g.title)}
          <span class="gallery__caption">${esc(g.title)}</span>
        </button></li>`).join("");
    };
    filterChips($("#gallery-filters"), "semua", (k) => { gCat = k; renderGallery(); });
    gGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".gallery__item");
      if (btn) lightbox.open(gList, +btn.dataset.index);
    });
    renderGallery();

    // Testimoni — disembunyikan jika belum ada data asli
    const tSection = $("#testimoni");
    if (TESTIMONIALS.length) {
      $("#testimonial-list").innerHTML = TESTIMONIALS.map((t) => `
        <figure class="card testimonial">
          <blockquote>“${esc(t.quote)}”</blockquote>
          <figcaption><strong>${esc(t.name)}</strong><span>${esc(t.product)}</span></figcaption>
        </figure>`).join("");
      tSection.hidden = false;
    } else {
      tSection.remove();
    }

    // Artikel
    $("#article-preview").innerHTML = ARTICLES.slice(0, 3).map(articleCard).join("");
  }

  function $$wa(selector, message) {
    document.querySelectorAll(selector).forEach((a) => {
      a.href = waLink(message);
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  function articleCard(a, i) {
    return `
      <article class="card article-card">
        <a class="article-card__media" href="artikel.html?slug=${a.slug}" tabindex="-1" aria-hidden="true">${media(a, 201 + i, a.title)}</a>
        <div class="article-card__body">
          <p class="eyebrow">${esc(a.readTime)} baca</p>
          <h3><a href="artikel.html?slug=${a.slug}">${esc(a.title)}</a></h3>
          <p>${esc(a.excerpt)}</p>
          <a class="link-arrow" href="artikel.html?slug=${a.slug}" aria-label="Baca artikel: ${esc(a.title)}">Baca artikel ${ICON.arrow}</a>
        </div>
      </article>`;
  }

  /* ---------- Halaman: Detail produk ---------- */

  function initProduct() {
    const id = new URLSearchParams(location.search).get("id");
    const p = PRODUCTS.find((x) => x.id === id);
    const root = $("#product-detail");
    if (!p) {
      document.title = `Produk tidak ditemukan | ${CFG.brandName}`;
      root.innerHTML = `<div class="container empty-state"><h1>Produk tidak ditemukan</h1><p>Produk yang Anda cari tidak tersedia atau sudah tidak ditampilkan.</p><a class="btn btn--primary" href="index.html#produk">Lihat Katalog</a></div>`;
      return;
    }
    const idx = PRODUCTS.indexOf(p);
    document.title = `${p.name} | ${CFG.brandName}`;
    $('meta[name="description"]').setAttribute("content", `${p.name} — ${p.description}`);

    const photos = p.images.length ? p.images.map((src) => ({ item: { image: src }, title: p.name })) : [{ item: p, seed: idx + 1, title: p.name }];
    const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);

    root.innerHTML = `
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="index.html">Beranda</a><span aria-hidden="true">/</span>
          <a href="index.html?kategori=${p.category}#produk">${esc(categoryLabel(p.category))}</a><span aria-hidden="true">/</span>
          <span aria-current="page">${esc(p.name)}</span>
        </nav>
        <div class="detail">
          <div class="detail__gallery">
            <button type="button" class="detail__main" aria-label="Perbesar foto ${esc(p.name)}">${media(photos[0].item, photos[0].seed, p.name)}</button>
            ${photos.length > 1 ? `<div class="detail__thumbs">${photos.map((ph, i) => `<button type="button" data-index="${i}" aria-label="Foto ${i + 1}">${media(ph.item, ph.seed, p.name)}</button>`).join("")}</div>` : ""}
          </div>
          <div class="detail__info">
            <p class="eyebrow">${esc(categoryLabel(p.category))} · ${esc(p.id)}</p>
            <h1>${esc(p.name)}</h1>
            ${priceBlock(p, "price--lg")}
            ${p.price ? `<p class="price__note">${PRICE_NOTE}</p>` : ""}
            <p class="detail__desc">${esc(p.description)}</p>
            <table class="spec-table">
              <caption class="sr-only">Spesifikasi ${esc(p.name)}</caption>
              <tbody>
                ${p.specs.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}
                <tr><th scope="row">Satuan</th><td>${esc(p.unit)}</td></tr>
                <tr><th scope="row">Ketersediaan</th><td>${esc(p.availability)}</td></tr>
              </tbody>
            </table>
            <form class="order-form card" id="order-form">
              <h2>Pesan via WhatsApp</h2>
              <p>Isi jumlah dan lokasi (opsional) agar admin dapat langsung menghitung harga dan ongkos kirim.</p>
              <div class="order-form__fields">
                <label>Jumlah (${esc(p.unit)})<input type="number" name="qty" min="1" inputmode="numeric" placeholder="Contoh: 20"></label>
                <label>Lokasi pengiriman<input type="text" name="location" autocomplete="address-level2" placeholder="Contoh: Kota / Kecamatan"></label>
              </div>
              <button class="btn btn--wa btn--block" type="submit">${ICON.wa}Pesan via WhatsApp</button>
              <p class="order-form__note">Pesanan dikonfirmasi setelah admin menyetujui harga, stok, jumlah, dan pengiriman.</p>
            </form>
          </div>
        </div>
        ${related.length ? `<section class="section related" aria-labelledby="related-title"><h2 id="related-title" class="section__title">Produk Sejenis</h2><div class="product-grid">${related.map((r) => productCard(r, PRODUCTS.indexOf(r))).join("")}</div></section>` : ""}
      </div>`;

    const lightbox = createLightbox();
    $(".detail__main", root).addEventListener("click", () => lightbox.open(photos, 0));
    root.querySelectorAll(".detail__thumbs button").forEach((b) => b.addEventListener("click", () => lightbox.open(photos, +b.dataset.index)));

    $("#order-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      window.open(waLink(productMessage(p, f.qty.value.trim(), f.location.value.trim())), "_blank", "noopener");
    });
  }

  /* ---------- Halaman: Artikel ---------- */

  function initArticles() {
    const slug = new URLSearchParams(location.search).get("slug");
    const root = $("#article-root");
    if (!slug) {
      root.innerHTML = `
        <section class="page-hero"><div class="container"><p class="eyebrow">Artikel</p><h1>Edukasi & Inspirasi Material</h1><p>Panduan memilih, menghitung, dan merawat batu alam serta bata untuk hunian dan proyek Anda.</p></div></section>
        <section class="section"><div class="container article-grid">${ARTICLES.map(articleCard).join("")}</div></section>`;
      return;
    }
    const i = ARTICLES.findIndex((a) => a.slug === slug);
    const a = ARTICLES[i];
    if (!a) {
      root.innerHTML = `<div class="container empty-state"><h1>Artikel tidak ditemukan</h1><a class="btn btn--primary" href="artikel.html">Lihat semua artikel</a></div>`;
      return;
    }
    document.title = `${a.title} | ${CFG.brandName}`;
    $('meta[name="description"]').setAttribute("content", a.excerpt);
    const others = ARTICLES.filter((x) => x !== a).slice(0, 3);
    root.innerHTML = `
      <article class="article">
        <header class="container container--narrow article__header">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Beranda</a><span aria-hidden="true">/</span><a href="artikel.html">Artikel</a></nav>
          <p class="eyebrow">${esc(a.readTime)} baca</p>
          <h1>${esc(a.title)}</h1>
          <p class="article__lead">${esc(a.excerpt)}</p>
        </header>
        <div class="container container--narrow">${media(a, 201 + i, a.title, "article__cover")}</div>
        <div class="container container--narrow prose">${a.body}</div>
        <div class="container container--narrow">
          <div class="cta-inline card">
            <div><h2>Butuh bantuan memilih material?</h2><p>Kirim ukuran dan foto area Anda, tim ${esc(CFG.brandName)} bantu rekomendasikan.</p></div>
            <a class="btn btn--wa" href="${waLink(GENERAL_MESSAGE)}" ${waAttrs}>${ICON.wa}Konsultasi via WhatsApp</a>
          </div>
        </div>
      </article>
      <section class="section section--stone"><div class="container"><h2 class="section__title">Artikel Lainnya</h2><div class="article-grid">${others.map((o) => articleCard(o, ARTICLES.indexOf(o))).join("")}</div></div></section>`;
  }

  /* ---------- Init ---------- */

  renderHeader();
  renderFooter();
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "product") initProduct();
  if (page === "articles") initArticles();
  if (page === "credits") initCredits();

  function initCredits() {
    $("#credit-list").innerHTML = Object.entries(CREDITS).map(([src, c]) => `
      <li class="credit">
        <img src="${esc(src)}" alt="" loading="lazy">
        <div>
          <p class="credit__title"><a href="${esc(c.source)}" target="_blank" rel="noopener">${esc(c.title)}</a></p>
          <p>Oleh ${esc(c.author)} · ${c.licenseUrl ? `<a href="${esc(c.licenseUrl)}" target="_blank" rel="noopener">${esc(c.license)}</a>` : esc(c.license)}</p>
        </div>
      </li>`).join("");
  }
})();
