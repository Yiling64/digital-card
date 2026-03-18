const VIBES = ["curious · responsible · driven · husky · perspective · insightful"];
const PALETTES = [
  { a: "#86f4d0", b: "#7c93ff", c: "#ff86d3", accent: "#86f4d0" },
  { a: "#ffd57a", b: "#7cffc2", c: "#a78bff", accent: "#7cffc2" },
  { a: "#ff7aa2", b: "#7ad7ff", c: "#ffe07a", accent: "#7ad7ff" },
  { a: "#b9ff8a", b: "#ff9cf4", c: "#8ab6ff", accent: "#ff9cf4" },
];

function $(sel) {
  return document.querySelector(sel);
}

function setVars(p) {
  const root = document.documentElement;
  root.style.setProperty("--a", p.a);
  root.style.setProperty("--b", p.b);
  root.style.setProperty("--c", p.c);
  root.style.setProperty("--accent", p.accent);
}

let vibeIndex = 0;
let paletteIndex = 0;
let toastTimer = null;

function toast(msg) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.classList.remove("show"), 1600);
}

function updateTime() {
  const el = $("#localTime");
  if (!el) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  el.textContent = `Local ${hh}:${mm}`;
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function huskyFx() {
  if (prefersReducedMotion()) return;

  const fx = $("#fx");
  const origin = $("#vibeToggle");
  if (!fx || !origin) return;

  const card = fx.closest(".card");
  if (!card) return;

  const cardRect = card.getBoundingClientRect();
  const oRect = origin.getBoundingClientRect();
  const ox = oRect.left - cardRect.left + oRect.width * 0.82;
  const oy = oRect.top - cardRect.top + oRect.height * 0.18;

  const awoo = document.createElement("div");
  awoo.className = "awoo";
  awoo.style.setProperty("--x", `${ox}px`);
  awoo.style.setProperty("--y", `${oy}px`);
  awoo.textContent = "AWOO!";
  fx.appendChild(awoo);
  window.setTimeout(() => awoo.remove(), 980);

  const count = 10;
  for (let i = 0; i < count; i += 1) {
    const paw = document.createElement("div");
    paw.className = "paw";

    const jitterX = (Math.random() - 0.5) * 22;
    const jitterY = (Math.random() - 0.5) * 22;
    const s = 14 + Math.random() * 18;
    const r = (Math.random() - 0.5) * 40;
    const dx = 40 + Math.random() * 160;
    const dy = -30 - Math.random() * 120;

    paw.style.setProperty("--x", `${ox + jitterX}px`);
    paw.style.setProperty("--y", `${oy + jitterY}px`);
    paw.style.setProperty("--s", `${s}px`);
    paw.style.setProperty("--r", `${r}deg`);
    paw.style.setProperty("--dx", `${dx}px`);
    paw.style.setProperty("--dy", `${dy}px`);
    paw.style.animationDelay = `${Math.random() * 120}ms`;

    fx.appendChild(paw);
    window.setTimeout(() => paw.remove(), 1100);
  }
}

function toggleVibe() {
  document.body.classList.toggle("vibe");

  const status = $("#statusLine");
  if (status) {
    vibeIndex = (vibeIndex + 1) % VIBES.length;
    status.textContent = VIBES[vibeIndex];
  }

  paletteIndex = (paletteIndex + 1) % PALETTES.length;
  setVars(PALETTES[paletteIndex]);

  huskyFx();
  toast(document.body.classList.contains("vibe") ? "Vibe mode：ON" : "Vibe mode：OFF");
}

async function copyEmail(e) {
  const target = e.currentTarget;
  const email = target?.dataset?.email;
  if (!email) return;

  try {
    await navigator.clipboard.writeText(email);
    toast(`已複製：${email}`);
  } catch {
    toast("複製失敗（瀏覽器權限限制）");
  }
}

function main() {
  updateTime();
  window.setInterval(updateTime, 10_000);

  $("#vibeToggle")?.addEventListener("click", toggleVibe);
  $("#chipVibe")?.addEventListener("click", toggleVibe);

  const emailBtn = $("#emailBtn");
  if (emailBtn) {
    emailBtn.addEventListener("click", (e) => {
      e.preventDefault();
      copyEmail(e).finally(() => {
        window.location.href = emailBtn.getAttribute("href");
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", main);
