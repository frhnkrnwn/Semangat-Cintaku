const particlesConfig = {
  particles: {
    number: {
      value: 32,
      density: { enable: true, value_area: 900 },
    },
    color: { value: "#ffffff" },
    shape: {
      type: "image",
      image: { src: "heart.png", width: 50, height: 50 },
    },
    opacity: {
      value: 0.65,
      random: true,
      anim: { enable: true, speed: 0.6, opacity_min: 0.25, sync: false },
    },
    size: {
      value: 14,
      random: true,
      anim: { enable: false },
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#ffffff",
      opacity: 0.35,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.6,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: {
        distance: 160,
        line_linked: { opacity: 0.6 },
      },
      push: { particles_nb: 3 },
    },
  },
  retina_detect: true,
};

// Nyalain background hati interaktif (sempat ke-skip, sekarang jalan lagi)
if (typeof particlesJS !== "undefined") {
  particlesJS("particles-js", particlesConfig);
}

// ===== Tema warna =====
const themes = {
  sunset: ["#ff6a88", "#ff99ac", "#a18cd1", "#fbc2eb", "#a1477a"],
  ocean: ["#4facfe", "#7fd8ff", "#00c9ff", "#00f2fe", "#0d6b8a"],
  peach: ["#ffb199", "#ff9a76", "#ff6a5c", "#ff0844", "#b3324a"],
  lavender: ["#a18cd1", "#c9a7eb", "#d5b8f0", "#fbc2eb", "#7a5a9e"],
  mint: ["#43e97b", "#6ff0a0", "#20d3c2", "#38f9d7", "#1f8a6f"],
  night: ["#232946", "#3a3f6b", "#565e8f", "#6b6f9e", "#1a1e33"],
};

function applyTheme(colors) {
  const root = document.documentElement.style;
  root.setProperty("--c1", colors[0]);
  root.setProperty("--c2", colors[1]);
  root.setProperty("--c3", colors[2]);
  root.setProperty("--c4", colors[3]);
  root.setProperty("--accent", colors[4]);
}

function lighten(hex, amount) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return "#" + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
}

function customThemeFrom(hex) {
  return [hex, lighten(hex, 30), lighten(hex, -40), lighten(hex, 60), lighten(hex, -70)];
}

// ===== Pesan sesuai jam dibuka =====
const timeSlots = [
  {
    max: 4,
    title: "Selamat Dini Hari",
    message:
      "Udah larut banget nih. Kalau masih kebangun mikirin banyak hal, gapapa kok. Aku di sini kalau kamu butuh cerita.",
  },
  {
    max: 10,
    title: "Selamat Pagi, Sayang",
    message: "Selamat pagi cintaku, semangat aktifitas hari ini ya.",
  },
  {
    max: 15,
    title: "Selamat Siang, Sayang",
    message: "Selamat siang, jangan lupa makan ya. Sisa hari ini semoga lancar-lancar aja.",
  },
  {
    max: 18,
    title: "Selamat Sore, Sayang",
    message: "Sore-sore gini enaknya rebahan bentar, tarik napas, ngecas energi buat nanti malam.",
  },
  {
    max: 22,
    title: "Selamat Malam, Sayang",
    message: "Selamat malam sayang, makasih ya udah ngelewatin hari ini dengan baik.",
  },
  {
    max: 24,
    title: "Selamat Istirahat",
    message: "Selamat istirahat sayangku cintakuu, aku bangga sama kamu. Love u.",
  },
];

function messageForHour(h) {
  for (let i = 0; i < timeSlots.length; i++) {
    if (h < timeSlots[i].max) return timeSlots[i];
  }
  return timeSlots[timeSlots.length - 1];
}

function greetLabelFor(h) {
  if (h < 4) return "Tengah malam";
  if (h < 10) return "Selamat pagi";
  if (h < 15) return "Selamat siang";
  if (h < 18) return "Selamat sore";
  return "Selamat malam";
}

// ===== Jam jalan real-time + sapaan otomatis =====
const clockTimeEl = document.getElementById("clockTime");
const clockGreetEl = document.getElementById("clockGreet");
const timeTitleEl = document.getElementById("timeTitle");
const timeMessageEl = document.getElementById("timeMessage");

function pad2(n) {
  return n.toString().padStart(2, "0");
}

function updateClock() {
  const now = new Date();
  if (clockTimeEl) {
    clockTimeEl.textContent =
      pad2(now.getHours()) + ":" + pad2(now.getMinutes()) + ":" + pad2(now.getSeconds());
  }
  if (clockGreetEl) {
    clockGreetEl.textContent = greetLabelFor(now.getHours());
  }
}

function updateGreetingCard() {
  const slot = messageForHour(new Date().getHours());
  if (timeTitleEl) timeTitleEl.textContent = slot.title;
  if (timeMessageEl) timeMessageEl.textContent = slot.message;
}

updateClock();
updateGreetingCard();
setInterval(updateClock, 1000);
setInterval(updateGreetingCard, 60000);

// ===== Hitung hari bareng =====
// Ganti tanggal di bawah ini sesuai tanggal yang mau kamu hitung (format: TAHUN-BULAN-TANGGAL)
const togetherSince = "2023-11-21";
const daysCounterEl = document.getElementById("daysCounter");

function updateDaysCounter() {
  if (!daysCounterEl) return;
  const start = new Date(togetherSince + "T00:00:00");
  if (isNaN(start.getTime())) return;
  const diffDays = Math.floor((new Date() - start) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return;
  daysCounterEl.textContent = "Hari ke-" + diffDays + " kita bareng 🤍";
}

updateDaysCounter();
setInterval(updateDaysCounter, 60000);

// ===== Cerita kecil yang pelan-pelan makin dalam =====
// Universal & tersirat supaya tetap nyaman dibaca kapan pun.

const quoteStages = [
  [
    "Nggak semua proses harus selesai hari ini. Yang penting, kamu nggak berhenti.",
    "Pelan-pelan aja. Nggak ada yang salah dengan mengambil waktu untuk bernapas.",
    "Setiap langkah kecil yang kamu ambil sekarang, tetap punya arti.",
    "Hari ini nggak harus sempurna supaya tetap menjadi hari yang berarti.",
    "Boleh istirahat sebentar. Kamu nggak harus selalu bergerak cepat.",
    "Nikmati hal-hal kecil hari ini. Kadang yang sederhana justru paling menenangkan.",
    "Kamu nggak perlu membandingkan langkahmu dengan langkah siapa pun.",
    "Ada hari untuk berlari, ada hari untuk berjalan, dan ada hari untuk sekadar bertahan.",
    "Nggak apa-apa kalau semuanya belum terlihat jelas. Pelan-pelan juga akan menemukan arahnya."
  ],
  [
    "Kamu nggak telat. Kamu cuma sedang berjalan di jalanmu sendiri.",
    "Kadang hidup memang kasih jeda, bukan untuk menghentikanmu, tapi supaya kamu punya waktu untuk bernapas.",
    "Boleh kecewa, boleh bingung, boleh merasa capek. Semua perasaan itu nggak membuatmu jadi lebih lemah.",
    "Kamu sudah melewati banyak hal yang dulu mungkin kamu kira nggak akan sanggup.",
    "Kalau hari ini terasa berat, jangan paksa dirimu memikirkan semuanya sekaligus.",
    "Satu hal kecil yang kamu lakukan hari ini sudah cukup untuk membuatmu tetap maju.",
    "Nggak semua hal baik datang sesuai jadwal. Beberapa memang butuh waktu.",
    "Percaya deh, hal-hal yang kamu usahakan dengan tulus nggak pernah benar-benar sia-sia.",
    "Suatu hari nanti kamu mungkin akan melihat masa ini dengan senyum dan bilang, ternyata aku bisa melewatinya."
  ],
  [
    "Kalau suatu hari kamu lupa betapa berharganya dirimu, biar aku yang ngingetin.",
    "Aku bangga sama kamu, bahkan di hari ketika kamu sendiri belum bisa bangga sama dirimu.",
    "Kamu nggak harus selalu kelihatan kuat di depanku. Jadi dirimu sendiri aja, itu sudah cukup.",
    "Aku nggak cuma mau ada ketika semuanya berjalan baik. Hari-hari yang berat juga tetap boleh kamu bagi sama aku.",
    "Kalau kamu butuh waktu untuk menemukan semangatmu lagi, aku nggak akan buru-buru.",
    "Aku mungkin nggak bisa menyelesaikan semua yang kamu rasakan, tapi aku bisa nemenin kamu melewatinya.",
    "Nggak perlu punya semua jawaban sekarang. Yang penting kamu tahu, kamu nggak sendirian.",
    "Aku akan tetap jadi tempat kamu cerita, bahkan untuk hal-hal yang menurutmu kecil.",
    "Aku percaya sama kamu, termasuk saat kamu sedang ragu sama dirimu sendiri."
  ]
];

const closingMessages = [
  "Aku cuma mau kamu ingat satu hal: kamu nggak harus menjadi versi terbaikmu setiap hari. Kadang cukup menjadi versi dirimu yang tetap memilih untuk mencoba lagi. Dan kalau suatu hari langkahmu terasa berat, istirahatlah. Aku tetap di sini.",
  "Mungkin nggak semua hari akan terasa mudah. Tapi aku harap, setiap kali kamu membuka halaman ini, kamu ingat kalau ada seseorang yang selalu melihat sisi baik dalam dirimu. Nggak peduli seberapa jauh kamu merasa sudah berjalan, kamu tetap layak dihargai, disayangi, dan dibanggakan.",
  "Kalau suatu hari nanti kamu membaca ini lagi, aku harap kamu sedang tersenyum. Tapi kalau ternyata belum, nggak apa-apa juga. Kamu nggak perlu memaksa semuanya baik-baik saja. Ambil napas, pelan-pelan, lalu lanjut ketika kamu sudah siap. Aku percaya kamu akan sampai.",
  "Aku nggak tahu seperti apa cerita kita nanti, tapi untuk sekarang aku cuma ingin menemani kamu menjalani hari-hari yang ada. Yang ringan kita nikmati, yang berat kita lewati pelan-pelan. Kamu nggak harus menghadapi semuanya sendirian.",
  "Dan kalau suatu saat kamu merasa perjalananmu terlalu panjang, lihat lagi sejauh apa kamu sudah sampai. Jangan cuma melihat tempat yang belum kamu capai. Ada banyak hal yang sudah kamu lewati, banyak hal yang sudah kamu pelajari, dan banyak alasan untuk tetap percaya pada dirimu sendiri."
];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ===== Rotasi quote bertahap =====
const quoteEl = document.getElementById("quoteText");
let storyStage = 0;
let storyIndex = 0;
let storyQuotes = shuffle(quoteStages[0]);
let closingIndex = 0;
let quoteCount = 0;

function showStoryText(text, isClosing = false) {
  if (!quoteEl) return;

  quoteEl.style.opacity = 0;
  quoteEl.style.transform = "translateY(8px)";

  setTimeout(function () {
    quoteEl.textContent = text;
    quoteEl.style.fontStyle = isClosing ? "normal" : "italic";
    quoteEl.style.fontSize = isClosing ? "0.9rem" : "";
    quoteEl.style.lineHeight = isClosing ? "1.75" : "";
    quoteEl.style.opacity = 1;
    quoteEl.style.transform = "translateY(0)";
  }, 350);
}

function showStoryQuote() {
  if (!quoteEl) return;

  // Setiap 4 quote, masuk sedikit lebih dalam.
  if (quoteCount > 0 && quoteCount % 4 === 0 && storyStage < 2) {
    storyStage++;
    storyIndex = 0;
    storyQuotes = shuffle(quoteStages[storyStage]);
  }

  // Setelah 12 quote, tampilkan satu pesan panjang.
  if (quoteCount > 0 && quoteCount % 13 === 0) {
    showStoryText(closingMessages[closingIndex], true);
    closingIndex = (closingIndex + 1) % closingMessages.length;

    // Setelah pesan panjang, mulai lagi dari tahap awal.
    storyStage = 0;
    storyIndex = 0;
    storyQuotes = shuffle(quoteStages[0]);
  } else {
    showStoryText(storyQuotes[storyIndex], false);
    storyIndex = (storyIndex + 1) % storyQuotes.length;
  }

  quoteCount++;
}

showStoryQuote();
setInterval(showStoryQuote, 6000);

  // ---- Panel ganti warna ----
  const themeToggle = document.getElementById("themeToggle");
  const themePanel = document.getElementById("themePanel");
  const customColor = document.getElementById("customColor");

  themeToggle.addEventListener("click", function () {
    themePanel.classList.toggle("open");
  });

  document.querySelectorAll(".swatch").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const key = btn.getAttribute("data-theme");
      applyTheme(themes[key]);
    });
  });

  customColor.addEventListener("input", function () {
    applyTheme(customThemeFrom(customColor.value));
  });

  document.addEventListener("click", function (e) {
    if (
      themePanel.classList.contains("open") &&
      !themePanel.contains(e.target) &&
      e.target !== themeToggle
    ) {
      themePanel.classList.remove("open");
    }
  });

  // ---- Musik latar ----
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  function setPlayingUI(isPlaying) {
    musicToggle.textContent = isPlaying ? "❚❚" : "♪";
    musicToggle.classList.toggle("playing", isPlaying);
  }

  function playMusic() {
    bgMusic
      .play()
      .then(function () {
        setPlayingUI(true);
      })
      .catch(function () {
        setPlayingUI(false);
      });
  }

  musicToggle.addEventListener("click", function () {
    if (bgMusic.paused) playMusic();
    else {
      bgMusic.pause();
      setPlayingUI(false);
    }
  });

  playMusic();

  const startOnFirstInteraction = function () {
    if (bgMusic.paused) playMusic();
    document.removeEventListener("click", startOnFirstInteraction);
    document.removeEventListener("touchstart", startOnFirstInteraction);
  };
  document.addEventListener("click", startOnFirstInteraction);
  document.addEventListener("touchstart", startOnFirstInteraction);

  // ---- Support touch buat hati ngikutin sentuhan ----
  const canvasWrap = document.getElementById("particles-js");
  canvasWrap.addEventListener(
    "touchmove",
    function (e) {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvasWrap.dispatchEvent(mouseEvent);
    },
    { passive: true }
  );

  canvasWrap.addEventListener(
    "touchstart",
    function (e) {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("click", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvasWrap.dispatchEvent(mouseEvent);
    },
    { passive: true }
  );

  // ---- Efek tambahan: hati kecil muncul tiap kali layar disentuh/diklik ----
  const heartEmojis = ["💗", "💖", "💞", "🤍", "💕"];

  function spawnTapHeart(x, y) {
    const heart = document.createElement("span");
    heart.className = "tap-heart";
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.setProperty("--drift", (Math.random() * 60 - 30) + "px");
    document.body.appendChild(heart);
    heart.addEventListener("animationend", function () {
      heart.remove();
    });
  }

  document.addEventListener("click", function (e) {
    spawnTapHeart(e.clientX, e.clientY);
  });

  document.addEventListener(
    "touchstart",
    function (e) {
      const touch = e.touches[0];
      if (touch) spawnTapHeart(touch.clientX, touch.clientY);
    },
    { passive: true }
  );

  // ---- Bintang kerlap-kerlip lembut di background ----
  const starsLayer = document.getElementById("starsLayer");
  if (starsLayer) {
    const starCount = 55;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("span");
      star.className = "star-dot";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 70 + "%";
      const size = (Math.random() * 2 + 1).toFixed(1);
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.animationDuration = (2 + Math.random() * 3).toFixed(2) + "s";
      star.style.animationDelay = (Math.random() * 5).toFixed(2) + "s";
      starsLayer.appendChild(star);
    }
  }

  // ---- Bintang jatuh sesekali, efek "make a wish" ----
  function spawnShootingStar() {
    if (!starsLayer) return;
    const star = document.createElement("span");
    star.className = "shooting-star";
    star.style.top = Math.random() * 35 + "%";
    star.style.left = 55 + Math.random() * 40 + "%";
    starsLayer.appendChild(star);
    star.addEventListener("animationend", function () {
      star.remove();
    });
  }

  function scheduleShootingStar() {
    const delay = 9000 + Math.random() * 10000;
    setTimeout(function () {
      spawnShootingStar();
      scheduleShootingStar();
    }, delay);
  }
  scheduleShootingStar();

  // ---- Burst spesial pas tombol "Peluk aku dong" disentuh ----
  const burstEmojis = ["💗", "✨", "💫", "🤍", "⭐"];

  function spawnSparkBurst(x, y) {
    const count = 10;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "spark-burst";
      el.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const distance = 60 + Math.random() * 50;
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.setProperty("--tx", Math.cos(angle) * distance + "px");
      el.style.setProperty("--ty", Math.sin(angle) * distance + "px");
      document.body.appendChild(el);
      el.addEventListener("animationend", function () {
        el.remove();
      });
    }
  }

  const hugBtn = document.querySelector(".btn-big");
  if (hugBtn) {
    hugBtn.addEventListener("click", function () {
      const rect = hugBtn.getBoundingClientRect();
      spawnSparkBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  }

  // ---- Getar halus pas tombol "Peluk aku dong" disentuh (Android/Chrome) ----
  if (hugBtn && "vibrate" in navigator) {
    hugBtn.addEventListener("click", function () {
      navigator.vibrate([15, 30, 15]);
    });
  }

  // ---- Toples alasan/semangat: tarik pesan baru kapan aja ----
  const jarBtn = document.getElementById("jarBtn");
  const jarToast = document.getElementById("jarToast");
  const allEncourage = quoteStages.flat().concat(closingMessages);
  let jarToastTimer = null;

  function showJarToast() {
    if (!jarToast) return;
    const pick = allEncourage[Math.floor(Math.random() * allEncourage.length)];
    jarToast.textContent = pick;
    jarToast.classList.add("show");
    clearTimeout(jarToastTimer);
    jarToastTimer = setTimeout(function () {
      jarToast.classList.remove("show");
    }, 5000);
  }

  if (jarBtn) {
    jarBtn.addEventListener("click", showJarToast);
  }

  // ---- Easter egg: ketuk judul kecil di atas kartu 5x buat pesan rahasia ----
  // Ganti isi pesan rahasia di bawah ini sesuai kata-kata kamu sendiri kalau mau.
  const secretMessage =
    "Pesan rahasia buat kamu: apapun yang lagi kamu rasain sekarang, itu nggak mengubah caraku bangga sama kamu. Aku tetap di sini, secepat atau selambat apapun langkahmu.";

  const eyebrowTrigger = document.getElementById("eyebrowTrigger");
  const secretOverlay = document.getElementById("secretOverlay");
  const secretMessageEl = document.getElementById("secretMessage");
  const secretClose = document.getElementById("secretClose");
  let secretTapCount = 0;
  let secretTapTimer = null;

  function openSecret() {
    if (!secretOverlay) return;
    if (secretMessageEl) secretMessageEl.textContent = secretMessage;
    secretOverlay.classList.add("open");
  }

  function closeSecret() {
    if (secretOverlay) secretOverlay.classList.remove("open");
  }

  if (eyebrowTrigger) {
    eyebrowTrigger.addEventListener("click", function () {
      secretTapCount++;
      clearTimeout(secretTapTimer);
      secretTapTimer = setTimeout(function () {
        secretTapCount = 0;
      }, 2500);
      if (secretTapCount >= 5) {
        secretTapCount = 0;
        openSecret();
      }
    });
  }

  if (secretClose) secretClose.addEventListener("click", closeSecret);
  if (secretOverlay) {
    secretOverlay.addEventListener("click", function (e) {
      if (e.target === secretOverlay) closeSecret();
    });
  }


