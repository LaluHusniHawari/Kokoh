/*
 * Ilustrasi tekstur material (SVG, dibuat di browser) sebagai pengganti sementara
 * selama foto asli owner belum tersedia. Selalu ditampilkan dengan label "Ilustrasi".
 */
(function () {
  const W = 400;
  const H = 300;

  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const c = (v) => Math.max(0, Math.min(255, Math.round(v + amt)));
    const r = c(n >> 16), g = c((n >> 8) & 255), b = c(n & 255);
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  function speckles(r, count, base, spread, maxR, opacity) {
    let s = "";
    for (let i = 0; i < count; i++) {
      const x = (r() * W).toFixed(1), y = (r() * H).toFixed(1);
      const rad = (0.4 + r() * maxR).toFixed(1);
      s += `<circle cx="${x}" cy="${y}" r="${rad}" fill="${shade(base, (r() - 0.5) * spread)}" opacity="${opacity}"/>`;
    }
    return s;
  }

  function blotches(r, count, base, spread) {
    let s = "";
    for (let i = 0; i < count; i++) {
      const x = r() * W, y = r() * H;
      s += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(20 + r() * 70).toFixed(0)}" ry="${(10 + r() * 40).toFixed(0)}" fill="${shade(base, (r() - 0.5) * spread)}" opacity="0.35"/>`;
    }
    return s;
  }

  function bricks(r, opts) {
    const { bw, bh, gap, mortar, colors, spread } = opts;
    let s = `<rect width="${W}" height="${H}" fill="${mortar}"/>`;
    for (let row = 0, y = 0; y < H; row++, y += bh + gap) {
      const off = row % 2 ? -bw / 2 : 0;
      for (let x = off; x < W; x += bw + gap) {
        const col = shade(colors[Math.floor(r() * colors.length)], (r() - 0.5) * spread);
        s += `<rect x="${x.toFixed(1)}" y="${y}" width="${bw}" height="${bh}" rx="1.5" fill="${col}"/>`;
        for (let k = 0; k < 6; k++) {
          s += `<circle cx="${(x + r() * bw).toFixed(1)}" cy="${(y + r() * bh).toFixed(1)}" r="${(0.5 + r() * 1.2).toFixed(1)}" fill="${shade(col, -30)}" opacity="0.5"/>`;
        }
      }
    }
    return s;
  }

  const builders = {
    andesit(r) {
      return `<rect width="${W}" height="${H}" fill="#4b504d"/>` + blotches(r, 18, "#4b504d", 30) + speckles(r, 900, "#4b504d", 70, 1.4, 0.8);
    },
    paras(r) {
      let s = `<rect width="${W}" height="${H}" fill="#d8ccb2"/>` + blotches(r, 20, "#d8ccb2", 26);
      for (let i = 0; i < 14; i++) {
        const y = r() * H;
        s += `<path d="M0 ${y.toFixed(0)} Q ${W / 2} ${(y + (r() - 0.5) * 60).toFixed(0)} ${W} ${(y + (r() - 0.5) * 30).toFixed(0)}" stroke="#bfae8c" stroke-width="${(0.5 + r() * 1.5).toFixed(1)}" fill="none" opacity="0.5"/>`;
      }
      return s + speckles(r, 500, "#d8ccb2", 40, 1, 0.6);
    },
    palimanan(r) {
      return `<rect width="${W}" height="${H}" fill="#c9ad7c"/>` + blotches(r, 30, "#c9ad7c", 50) + speckles(r, 600, "#c9ad7c", 60, 1.1, 0.7);
    },
    koral(r) {
      let s = `<rect width="${W}" height="${H}" fill="#6c685f"/>`;
      const tones = ["#d9d4c9", "#a39d90", "#8a8478", "#c5a77b", "#5d5a53", "#efebe3"];
      for (let i = 0; i < 520; i++) {
        const rx = 6 + r() * 9;
        s += `<ellipse cx="${(r() * W).toFixed(0)}" cy="${(r() * H).toFixed(0)}" rx="${rx.toFixed(1)}" ry="${(rx * (0.6 + r() * 0.35)).toFixed(1)}" transform="rotate(${(r() * 180).toFixed(0)})" fill="${shade(tones[Math.floor(r() * tones.length)], (r() - 0.5) * 20)}" stroke="#3d3b36" stroke-opacity="0.35"/>`;
      }
      return s;
    },
    pijakan(r) {
      let s = `<rect width="${W}" height="${H}" fill="#596b5d"/>` + speckles(r, 700, "#596b5d", 50, 1.6, 0.7);
      const stones = [[90, 230], [180, 170], [270, 115], [350, 55]];
      stones.forEach(([cx, cy]) => {
        const col = shade("#8f9089", (r() - 0.5) * 24);
        s += `<ellipse cx="${cx}" cy="${cy + 6}" rx="52" ry="30" fill="#2f3a32" opacity="0.5"/>`;
        s += `<ellipse cx="${cx}" cy="${cy}" rx="${(48 + r() * 8).toFixed(1)}" ry="${(28 + r() * 6).toFixed(1)}" fill="${col}"/>`;
      });
      return s;
    },
    bata(r) {
      return bricks(r, { bw: 70, bh: 24, gap: 6, mortar: "#d6cdbd", colors: ["#a4513a", "#b05c40", "#954632"], spread: 18 });
    },
    "bata-kasar"(r) {
      return bricks(r, { bw: 64, bh: 26, gap: 8, mortar: "#b9ab95", colors: ["#9b4a33", "#a85a3c", "#8a3f2c", "#b3653f"], spread: 26 });
    },
    tempel(r) {
      return bricks(r, { bw: 82, bh: 18, gap: 5, mortar: "#e2dbcf", colors: ["#a9563c", "#b9694a", "#9a4b34"], spread: 16 });
    },
    "tempel-antik"(r) {
      return bricks(r, { bw: 82, bh: 18, gap: 5, mortar: "#6d655b", colors: ["#7d3b2a", "#9a5a3c", "#5e3324", "#a8714d", "#8c4a32"], spread: 22 });
    },
    roster(r) {
      let s = `<rect width="${W}" height="${H}" fill="#b4613d"/>` + speckles(r, 400, "#b4613d", 40, 1.1, 0.6);
      const size = 50, hole = 30;
      for (let y = 0; y < H; y += size) for (let x = 0; x < W; x += size) {
        const o = (size - hole) / 2;
        s += `<rect x="${x + o}" y="${y + o}" width="${hole}" height="${hole}" fill="#2a1c15"/>`;
        s += `<rect x="${x + o}" y="${y + o}" width="${hole}" height="5" fill="#000" opacity="0.35"/>`;
        s += `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="none" stroke="#8b4429" stroke-opacity="0.6"/>`;
      }
      return s;
    },
    "roster-bulat"(r) {
      let s = `<rect width="${W}" height="${H}" fill="#bf6d47"/>` + speckles(r, 400, "#bf6d47", 40, 1.1, 0.6);
      const size = 50;
      for (let y = 0; y < H; y += size) for (let x = 0; x < W; x += size) {
        s += `<circle cx="${x + size / 2}" cy="${y + size / 2}" r="17" fill="#2a1c15"/>`;
        s += `<path d="M ${x + 8} ${y + size / 2} A 17 17 0 0 1 ${x + 42} ${y + size / 2}" fill="#000" opacity="0.3"/>`;
        s += `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="none" stroke="#8b4429" stroke-opacity="0.6"/>`;
      }
      return s;
    },
  };

  const cache = {};

  window.kokohTexture = function (type, seed) {
    const key = type + ":" + (seed || 1);
    if (cache[key]) return cache[key];
    const build = builders[type] || builders.andesit;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${build(rng(seed || 1))}</svg>`;
    return (cache[key] = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
  };
})();
