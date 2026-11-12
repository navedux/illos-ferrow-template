const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const root = document.documentElement;

// Illos.dev: each illustration loops while it is on screen and pauses when it is not.
if (!reduce) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) e.target.style.setProperty("--illos-play", e.isIntersecting ? "running" : "paused");
  });
  for (const el of document.querySelectorAll("[data-illos]")) {
    el.style.setProperty("--illos-play", "paused");
    io.observe(el);
  }
}

// Theme switch.
const themeBtn = document.getElementById("theme");
const syncTheme = () => {
  const dark = root.getAttribute("data-theme") === "dark";
  themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
};
themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("ferrow-theme", next); } catch (e) {}
  syncTheme();
});
syncTheme();

// The bar gets a hairline once the page scrolls.
const top = document.getElementById("top");
const onScroll = () => top.classList.toggle("is-scrolled", scrollY > 8);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu.
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");
const setMenu = (open) => {
  menu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); menuBtn.focus(); } });
matchMedia("(min-width: 901px)").addEventListener("change", () => setMenu(false));

// Live file ages tick up; now and then one file is rewritten back to 1s.
const ticks = [...document.querySelectorAll(".tick")];
if (!reduce) {
  let live = false;
  new IntersectionObserver(([e]) => { live = e.isIntersecting; }).observe(document.querySelector(".compare"));
  setInterval(() => {
    if (!live) return;
    for (const t of ticks) {
      t.dataset.s = +t.dataset.s + 1;
      t.textContent = t.dataset.s + "s ago";
      t.classList.remove("fresh");
    }
    if (Math.random() < 0.35) {
      const t = ticks[Math.floor(Math.random() * 3)];
      t.dataset.s = 1;
      t.textContent = "1s ago";
      t.classList.add("fresh");
    }
  }, 1000);
}

// Source chips: the card under them shows which file was read.
const srcs = document.getElementById("srcs");
const card = document.getElementById("src-card");
srcs.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b || b.getAttribute("aria-pressed") === "true") return;
  for (const o of srcs.querySelectorAll("button")) o.setAttribute("aria-pressed", o === b);
  card.querySelector(".src-path").textContent = b.dataset.path;
  const dd = card.querySelectorAll("dd");
  dd[0].textContent = b.dataset.who;
  dd[1].textContent = b.dataset.when;
  card.classList.remove("swap");
  void card.offsetWidth;
  card.classList.add("swap");
});

// Use-case tabs. Without this script every panel simply shows, one after another.
const tabs = [...document.querySelectorAll('[role="tab"]')];
const select = (tab, focus) => {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute("aria-selected", on);
    t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute("aria-controls"));
    panel.hidden = !on;
  }
  if (focus) tab.focus();
};
tabs.forEach((t, i) => {
  t.addEventListener("click", () => select(t, false));
  t.addEventListener("keydown", (e) => {
    const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
  });
});
select(tabs[0]);
