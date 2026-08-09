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

// ===== Kata-kata penyemangat, gonta-ganti tiap dibuka =====
const quotes = [
  "Nggak semua proses keliatan rapi dari luar, tapi aku liat usaha kamu dari dulu.",
  "Kamu boleh capek, boleh nangis, tapi jangan ragu kalau kamu tetep hebat di mataku.",
  "Waktu boleh molor, tapi semangat kamu nggak pernah aku ragukan.",
  "Aku nggak butuh kamu selalu kuat, aku cuma pengen kamu tau aku selalu ada.",
  "Kamu udah jalan sejauh ini, dan itu bukan hal kecil.",
  "Apapun yang terjadi, aku tetep milih kamu, hari ini dan nanti.",
  "Pelan-pelan aja, nggak ada yang buru-buru kok selain kamu ke diri kamu sendiri.",
  "Aku bangga sama kamu, bukan karena hasil, tapi karena kamu terus coba.",
];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

document.addEventListener("DOMContentLoaded", function () {
  particlesJS("particles-js", particlesConfig, function () {
    console.log("hati siap ngikutin sentuhan kamu");
  });

  // ---- Jam & sapaan kecil ----
  const clockTime = document.getElementById("clockTime");
  const clockGreet = document.getElementById("clockGreet");

  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  function tickClock() {
    const now = new Date();
    clockTime.textContent =
      pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());
    clockGreet.textContent = greetLabelFor(now.getHours());
  }
  tickClock();
  setInterval(tickClock, 1000);

  // ---- Judul & pesan besar sesuai jam ----
  const titleEl = document.getElementById("timeTitle");
  const messageEl = document.getElementById("timeMessage");
  function updateTimeMessage() {
    const now = new Date();
    const slot = messageForHour(now.getHours());
    titleEl.style.opacity = 0;
    messageEl.style.opacity = 0;
    setTimeout(function () {
      titleEl.textContent = slot.title;
      messageEl.textContent = slot.message;
      titleEl.style.opacity = 1;
      messageEl.style.opacity = 1;
    }, 250);
  }
  updateTimeMessage();
  // cek tiap menit kalau-kalau jam pindah sesi pas dia lagi buka halamannya
  setInterval(updateTimeMessage, 60000);

  // ---- Kata-kata penyemangat, acak tiap dibuka + gantian ----
  const quoteEl = document.getElementById("quoteText");
  const shuffled = shuffle(quotes);
  let quoteIndex = 0;
  function showQuote() {
    quoteEl.style.opacity = 0;
    setTimeout(function () {
      quoteEl.textContent = shuffled[quoteIndex];
      quoteEl.style.opacity = 1;
      quoteIndex = (quoteIndex + 1) % shuffled.length;
    }, 300);
  }
  showQuote();
  setInterval(showQuote, 7000);

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
});
