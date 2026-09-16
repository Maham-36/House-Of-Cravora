import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Plus, Minus, ShoppingBag, ChevronDown, X,
  Flame, Layers, Droplets, PackageCheck, Star, Clock, MapPin,
} from "lucide-react";

/* ============================================================
   HOUSE OF CRAVORA — configuration
   Replace WHATSAPP_NUMBER with the real number (country code +
   number, digits only, no + or spaces) before going live.
   ============================================================ */
const WHATSAPP_NUMBER = "923246873630";

const ADDRESS_TEXT = "Opposite Secretariat, North East Gate, near Street Light No. 25";
const MAPS_LINK = "https://maps.app.goo.gl/udySLm57vbCqoUAS6?g_st=aw";

const IMG = {
  heroTray: "https://images.pexels.com/photos/34565248/pexels-photo-34565248.jpeg?auto=compress&cs=tinysrgb&w=1600",
  classicNutella: "https://images.pexels.com/photos/590771/pexels-photo-590771.jpeg?auto=compress&cs=tinysrgb&w=1200",
  loadedNutella: "https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg?auto=compress&cs=tinysrgb&w=1200",
  loadedBiscoff: "https://images.pexels.com/photos/7440369/pexels-photo-7440369.jpeg?auto=compress&cs=tinysrgb&w=1200",
  pistachioKunafa: "https://images.pexels.com/photos/4500379/pexels-photo-4500379.jpeg?auto=compress&cs=tinysrgb&w=1200",
  scoopableCookie: "https://images.pexels.com/photos/8081573/pexels-photo-8081573.jpeg?auto=compress&cs=tinysrgb&w=1200",
  miniTin: "https://images.pexels.com/photos/28857425/pexels-photo-28857425.jpeg?auto=compress&cs=tinysrgb&w=1200",
  giantTin: "https://images.pexels.com/photos/8081574/pexels-photo-8081574.jpeg?auto=compress&cs=tinysrgb&w=1200",
  biscoffSwirl: "https://images.pexels.com/photos/28857440/pexels-photo-28857440.jpeg?auto=compress&cs=tinysrgb&w=1200",
  nutellaJar: "https://images.pexels.com/photos/7523703/pexels-photo-7523703.jpeg?auto=compress&cs=tinysrgb&w=600",
  drizzleSpoon: "https://images.pexels.com/photos/691168/pexels-photo-691168.jpeg?auto=compress&cs=tinysrgb&w=600",
  pistachioDessert: "https://images.pexels.com/photos/4500379/pexels-photo-4500379.jpeg?auto=compress&cs=tinysrgb&w=600",
  biscoffBowl: "https://images.pexels.com/photos/3274104/pexels-photo-3274104.jpeg?auto=compress&cs=tinysrgb&w=600",
};

/* full-menu slideshow for the hero */
const HERO_SLIDES = [
  IMG.heroTray,
  IMG.classicNutella,
  IMG.loadedNutella,
  IMG.loadedBiscoff,
  IMG.pistachioKunafa,
  IMG.scoopableCookie,
  IMG.miniTin,
  IMG.giantTin,
];

const BOMBOLONI = [
  { id: "classic-nutella", name: "Classic Nutella", desc: "Soft, fluffy bomboloni filled with rich Nutella.", price: 109, unit: "1 piece", img: IMG.classicNutella },
  { id: "loaded-nutella", name: "Loaded Nutella", desc: "Nutella filled + Nutella drizzle + choco chips.", price: 119, unit: "1 piece", img: IMG.loadedNutella },
  { id: "loaded-biscoff", name: "Loaded Lotus Biscoff", desc: "Lotus Biscoff filled + Nutella drizzle + Biscoff crumbs.", price: 139, unit: "1 piece", img: IMG.loadedBiscoff },
  { id: "pistachio-kunafa", name: "Premium Pistachio Kunafa", desc: "Pistachio kunafa filling + Nutella drizzle + kunafa crunch + pistachio crunch.", price: 149, unit: "1 piece", img: IMG.pistachioKunafa },
];

const COOKIES = [
  { id: "scoopable-cookie", name: "Loaded Scoopable Nutella Cookie", tag: "with Ice Cream", desc: "Gooey and fudgy cookie with ice cream, Nutella drizzle & choco chips.", price: 159, unit: "1 cup", img: IMG.scoopableCookie },
  { id: "mini-tin", name: "Mini Nutella Cookie Tin", tag: "150g", desc: "Gooey and fudgy cookie filled with rich Nutella and chocolate chunks.", price: 179, unit: "1 tin", img: IMG.miniTin },
  { id: "giant-tin", name: "Giant Nutella Cookie Tin", tag: "500g", desc: "Gooey and fudgy giant cookie loaded with rich Nutella and chunky chocolate chunks.", price: 489, unit: "1 tin (500g)", img: IMG.giantTin },
];

const ADDONS = [
  { id: "addon-nutella-filling", name: "Extra Nutella Filling", price: 20, img: IMG.nutellaJar },
  { id: "addon-nutella-drizzle", name: "Nutella Drizzle", price: 10, img: IMG.drizzleSpoon },
  { id: "addon-choco-chips", name: "Choco Chips", price: 10, img: IMG.giantTin },
  { id: "addon-pistachio-filling", name: "Extra Pistachio Kunafa Filling", price: 25, img: IMG.pistachioDessert },
  { id: "addon-biscoff-filling", name: "Extra Biscoff Filling", price: 25, img: IMG.biscoffBowl },
  { id: "addon-crumbs", name: "Biscoff Crumbs", price: 10, img: IMG.biscoffSwirl },
];

const ALL_ITEMS = [...BOMBOLONI, ...COOKIES, ...ADDONS];

const FEATURES = [
  { icon: Flame, title: "Fried Fresh to Order", desc: "Every bomboloni hits hot oil only after you order — never a shelf-sitter." },
  { icon: Layers, title: "Generously Filled", desc: "Piped full corner to corner with Nutella, Biscoff or pistachio kunafa." },
  { icon: Droplets, title: "Finished with Drizzle", desc: "A final ribbon of chocolate or Biscoff, because plain never wins." },
  { icon: PackageCheck, title: "Boxed with Care", desc: "Sealed warm and sent straight to your door." },
];

const GALLERY = [
  { img: IMG.nutellaJar, caption: "Pure Nutella" },
  { img: IMG.drizzleSpoon, caption: "Golden Drizzle" },
  { img: IMG.pistachioDessert, caption: "Pistachio Kunafa" },
  { img: IMG.biscoffBowl, caption: "Biscoff Crumble" },
];

const REVIEWS = [
  { name: "Palak", handle: "@palak_d7", text: "Loved them! So glad we stopped by the stall." },
  { name: "Lekha Singhal", handle: "@lekhasinghal", text: "Mmm, so good — the mango bomboloni is a must-try." },
  { name: "exotic.rabb", handle: "@exotic.rabb", text: "10/10, worth the trip out at night." },
  { name: "_notjustamedico", handle: "@_notjustamedico", text: "A must-visit stall by the Secretariat pop-ups." },
];

const SECTION_IDS = ["menu", "cookies", "addons", "gallery", "visit", "follow"];

const rs = (n) => `Rs. ${n}`;

/* ---------------- icons ---------------- */

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.04 3C9.06 3 3.4 8.65 3.4 15.62c0 2.42.68 4.68 1.85 6.6L3 29l6.98-2.2a12.7 12.7 0 0 0 6.06 1.54h.01c6.98 0 12.64-5.65 12.64-12.62C28.68 8.75 23.02 3 16.04 3Zm0 22.9h-.01a10.4 10.4 0 0 1-5.31-1.46l-.38-.23-4.14 1.3 1.35-4-.25-.41a10.3 10.3 0 0 1-1.59-5.48c0-5.7 4.65-10.34 10.34-10.34 2.76 0 5.36 1.08 7.31 3.03a10.24 10.24 0 0 1 3.03 7.31c0 5.7-4.65 10.28-10.35 10.28Zm5.65-7.7c-.31-.15-1.83-.9-2.11-1-.28-.1-.49-.15-.69.15-.2.31-.79 1-.97 1.2-.18.21-.36.23-.67.08-.31-.15-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.54.15-.18.2-.31.31-.51.1-.21.05-.39-.02-.54-.08-.15-.69-1.67-.95-2.29-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.54.08-.82.39-.28.31-1.08 1.05-1.08 2.57s1.1 2.98 1.26 3.19c.15.21 2.17 3.32 5.27 4.65.74.32 1.31.51 1.76.66.74.24 1.41.2 1.94.12.59-.09 1.83-.75 2.09-1.47.26-.72.26-1.34.18-1.47-.07-.14-.28-.21-.59-.36Z"/>
    </svg>
  );
}

function SectionHeading({ eyebrow, title, light }) {
  return (
    <div className={`section-heading reveal${light ? " on-dark" : ""}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      <div className="title-rule">
        <span /> <div className="title-dot" /> <span />
      </div>
    </div>
  );
}

/* ---------------- tilt helper (no re-render, direct DOM) ---------------- */
function useTilt() {
  const onMove = useCallback((e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -7;
    const ry = (px - 0.5) * 7;
    el.style.transition = "transform .05s linear";
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  }, []);
  const onLeave = useCallback((e) => {
    const el = e.currentTarget;
    el.style.transition = "transform .5s cubic-bezier(.2,.8,.2,1)";
    el.style.transform = "";
  }, []);
  return { onMouseMove: onMove, onMouseLeave: onLeave };
}

/* ---------------- app ---------------- */

export default function CravoraSite() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("menu");
  const [pulseId, setPulseId] = useState(null);
  const [cartBump, setCartBump] = useState(false);
  const heroRef = useRef(null);
  const prevCount = useRef(undefined);
  const pulseTimer = useRef(null);

  const tilt = useTilt();

  /* hero slideshow */
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 3800);
    return () => clearInterval(t);
  }, []);

  /* scroll progress + parallax + nav shrink */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const doc = document.documentElement;
        const top = window.scrollY;
        const max = doc.scrollHeight - doc.clientHeight;
        setScrollY(top);
        setScrollProgress(max > 0 ? Math.min((top / max) * 100, 100) : 0);
        setNavScrolled(top > 40);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* active-section tracking for nav underline */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* scroll-reveal for elements marked .reveal */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const setQty = useCallback((id, qty) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }, []);

  const handleAdd = useCallback(
    (id) => {
      setQty(id, 1);
      setPulseId(id);
      clearTimeout(pulseTimer.current);
      pulseTimer.current = setTimeout(() => setPulseId(null), 600);
    },
    [setQty]
  );

  const cartEntries = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ item: ALL_ITEMS.find((i) => i.id === id), qty }))
        .filter((e) => e.item),
    [cart]
  );
  const cartCount = cartEntries.reduce((n, e) => n + e.qty, 0);
  const cartTotal = cartEntries.reduce((n, e) => n + e.qty * e.item.price, 0);

  /* bump the cart bar whenever the count changes */
  useEffect(() => {
    if (prevCount.current !== undefined && cartCount !== prevCount.current && cartCount > 0) {
      setCartBump(true);
      const t = setTimeout(() => setCartBump(false), 450);
      prevCount.current = cartCount;
      return () => clearTimeout(t);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        size: 2 + ((i * 13) % 5),
        duration: 6 + ((i * 7) % 7),
        delay: (i * 0.6) % 8,
      })),
    []
  );

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const waLink = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const genericWaLink = waLink("Hi House of Cravora! I'd like to place an order.");

  const orderWaLink = useMemo(() => {
    if (cartEntries.length === 0) return genericWaLink;
    const lines = cartEntries.map(
      (e) => `• ${e.item.name} x${e.qty} — ${rs(e.item.price * e.qty)}`
    );
    const msg =
      `Hi House of Cravora! I'd like to order:\n\n` +
      lines.join("\n") +
      `\n\nTotal: ${rs(cartTotal)}\n\nName: \nAddress/Delivery: `;
    return waLink(msg);
  }, [cartEntries, cartTotal, genericWaLink]);

  const parallax = Math.min(scrollY, 700) * 0.18;
  const heroFade = Math.max(1 - scrollY / 480, 0);

  return (
    <div className="cravora-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;900&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Poppins:wght@300;400;500;600;700&display=swap');

        :root{
          /* warm cream + chocolate palette (no black) */
          --bg:#7b4028;
          --bg-alt:#e9d7b2;
          --panel:#f7e8d4;
          --panel-2: #2f1b18;
          --brown-dark:#3c2415;
          --brown:#6a4527;
          --brown-deep:#2c1a10;
          --warm-brown:#ba7045;
          --warm-brown-deep:#8d4f35;
          --gold:#b78727;
          --gold-light:#dba75c;
          --gold-deep:#8a6428;
          --cream:#f7e8d4;
          --muted:#8a6c4d;
          --ribbon:#8a4324;
          --ribbon-light:#b0592e;
          --whatsapp:#25d366;
          --whatsapp-dark:#128c4a;
        }
        *{box-sizing:border-box;}
        .cravora-root{
          background-color:var(--bg);
          background-image:
            radial-gradient(ellipse 900px 560px at 12% -8%, rgba(182,128,47,0.14), transparent 60%),
            radial-gradient(ellipse 700px 480px at 100% 12%, rgba(138,67,36,0.10), transparent 55%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Ccircle cx='8' cy='8' r='2' fill='%23b6802f' fill-opacity='0.13'/%3E%3Ccircle cx='40' cy='28' r='1.4' fill='%236a4527' fill-opacity='0.10'/%3E%3Ccircle cx='22' cy='48' r='1.2' fill='%23b6802f' fill-opacity='0.10'/%3E%3Ccircle cx='54' cy='54' r='1.6' fill='%238a4324' fill-opacity='0.08'/%3E%3C/svg%3E");
          background-repeat:no-repeat, no-repeat, repeat;
          background-size:auto, auto, 64px 64px;
          color:var(--brown-dark);
          font-family:'Poppins', sans-serif;
          min-height:100vh;
          position:relative;
          overflow-x:hidden;
          padding-bottom:2px;
        }
        h1,h2,h3{margin:0;}
        img{display:block;max-width:100%;}
        a{color:inherit;text-decoration:none;}
        button{font-family:inherit;cursor:pointer;}
        button:focus-visible, a:focus-visible{outline:2px solid var(--gold);outline-offset:3px;}
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important; transition-duration:0.01ms !important;}
        }

        /* ---------- scroll progress ---------- */
        .scroll-progress{
          position:fixed; top:0; left:0; height:3px; z-index:80;
          background:linear-gradient(90deg, var(--gold-deep), var(--gold-light));
          box-shadow:0 0 10px rgba(219,167,92,0.6);
        }

        /* ---------- nav ---------- */
        .nav{
          position:sticky; top:0; z-index:60;
          display:flex; align-items:center; justify-content:space-between;
          padding:14px 20px;
          background: #d8ba9d;
          backdrop-filter:blur(10px);
          border-bottom:1px solid rgba(182,128,47,0.25);
          transition:padding .3s ease, box-shadow .3s ease;
        }
        .nav.scrolled{padding:9px 20px; box-shadow:0 10px 26px rgba(60,36,21,0.15);}
        .brand{display:flex; align-items:center; gap:10px;}
        .brand-mark{
          width:36px;height:36px;border-radius:50%;
          border:1.5px solid var(--gold);
          display:flex;align-items:center;justify-content:center;
          font-family:'Cinzel',serif; color:var(--brown-dark); font-size:15px;
          background:radial-gradient(circle at 35% 30%, rgba(182,128,47,0.22), transparent 70%);
          transition:transform .3s ease;
        }
        .nav.scrolled .brand-mark{transform:scale(0.9);}
        .brand-name{font-family:'Cinzel',serif; letter-spacing:0.14em; font-size:14px; color:var(--brown-dark);}
        .nav-links{display:none; gap:24px; font-size:13px; letter-spacing:0.06em; color:var(--brown);}
        .nav-links a{position:relative; padding-bottom:5px; transition:color .2s ease;}
        .nav-links a::after{
          content:""; position:absolute; left:0; right:0; bottom:-1px; height:1px;
          background:var(--gold); transform:scaleX(0); transform-origin:left;
          transition:transform .3s ease;
        }
        .nav-links a:hover{color:var(--brown-dark);}
        .nav-links a.active{color:var(--brown-dark); font-weight:600;}
        .nav-links a.active::after{transform:scaleX(1);}
        fu(min-width:760px){.nav-links{display:flex;}}
        .nav-wa{
          display:flex; align-items:center; gap:6px;
          background:var(--whatsapp); color:#0b2412; font-weight:600; font-size:12.5px;
          padding:8px 14px; border-radius:999px; border:none;
          transition:transform .2s ease, background .2s ease;
        }
        .nav-wa:hover{background:#2be374; transform:translateY(-2px);}

        /* ---------- hero ---------- */
        .hero{
          position:relative; height:88vh; min-height:520px; max-height:820px;
          display:flex; align-items:center; justify-content:center;
          overflow:hidden;
        }
        .hero-parallax{position:absolute; inset:-8% 0 -8% 0;}
        .hero-slide{
          position:absolute; inset:0; opacity:0;
          transition:opacity 1.2s ease;
        }
        .hero-slide.active{opacity:1;}
        .hero-slide img{
          width:100%; height:100%; object-fit:cover;
          animation:kenburns 9s ease-in-out infinite alternate;
        }
        @keyframes kenburns{from{transform:scale(1);}to{transform:scale(1.09);}}
        .hero-overlay{
          position:absolute; inset:0;
          background:
            linear-gradient(180deg, rgba(107,66,38,0.5) 0%, rgba(107,66,38,0.38) 40%, rgba(90,56,32,0.82) 100%),
            radial-gradient(ellipse 700px 500px at 50% 40%, rgba(90,56,32,0.1), rgba(90,56,32,0.62) 75%);
        }
        .particle{
          position:absolute; bottom:6%; border-radius:50%;
          background:radial-gradient(circle, var(--gold-light), var(--gold) 70%);
          z-index:1; opacity:0; pointer-events:none;
          animation-name:floatUp; animation-timing-function:ease-in; animation-iteration-count:infinite;
        }
        @keyframes floatUp{
          0%{transform:translateY(0) scale(0.6); opacity:0;}
          12%{opacity:.9;}
          85%{opacity:.35;}
          100%{transform:translateY(-380px) scale(1); opacity:0;}
        }
        .hero-content{position:relative; z-index:2; text-align:center; padding:0 20px; max-width:720px;}
        .hero-eyebrow{
          font-family:'Cormorant Garamond', serif; font-style:italic; font-size:16px;
          color:var(--cream); letter-spacing:0.08em; display:block; margin-bottom:10px;
          opacity:0; animation:fadeUp .8s ease .45s forwards;
        }
        .hero-title{
          font-family:'Cinzel', serif; font-weight:900;
          font-size:clamp(2.6rem, 9vw, 5rem); line-height:1.02;
          letter-spacing:0.02em;
        }
        .reveal-word{
          display:inline-block; opacity:0;
          background:linear-gradient(180deg, #fbe6b3 0%, var(--gold-light) 55%, #c99a4f 100%);
          -webkit-background-clip:text; background-clip:text; color:transparent;
          text-shadow:0 2px 24px rgba(0,0,0,0.3);
          animation:heroReveal .8s cubic-bezier(.2,.8,.2,1) forwards;
        }
        @keyframes heroReveal{from{opacity:0; transform:translateY(24px);}to{opacity:1; transform:translateY(0);}}
        @keyframes fadeUp{from{opacity:0; transform:translateY(16px);}to{opacity:1; transform:translateY(0);}}
        .hero-tagline{
          margin-top:14px; font-size:13px; letter-spacing:0.32em; color:var(--cream); opacity:0;
          animation:fadeUp .8s ease .9s forwards;
        }
        .hero-ctas{display:flex; gap:14px; justify-content:center; margin-top:34px; flex-wrap:wrap;
          opacity:0; animation:fadeUp .8s ease 1.1s forwards;
        }
        .btn-gold{
          position:relative; overflow:hidden;
          background:linear-gradient(180deg, var(--gold-light), var(--gold));
          color:#2c1a10; font-weight:600; font-size:14px;
          padding:13px 26px; border-radius:999px; border:none;
          box-shadow:0 8px 20px rgba(182,128,47,0.3);
          transition:transform .2s ease, box-shadow .2s ease;
        }
        .btn-gold::after{
          content:""; position:absolute; inset:0;
          background:linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%);
          transform:translateX(-130%);
        }
        .btn-gold:hover{transform:translateY(-2px); box-shadow:0 12px 26px rgba(182,128,47,0.4);}
        .btn-gold:hover::after{transform:translateX(130%); transition:transform .7s ease;}
        .btn-outline{
          display:flex; align-items:center; gap:8px;
          background:transparent; color:var(--cream); font-weight:500; font-size:14px;
          padding:12px 24px; border-radius:999px; border:1.4px solid rgba(251,243,227,0.55);
          transition:border-color .2s ease, transform .2s ease;
        }
        .btn-outline:hover{border-color:var(--gold-light); transform:translateY(-2px);}
        .scroll-cue{
          position:absolute; bottom:22px; left:50%; transform:translateX(-50%); z-index:2;
          color:var(--cream); opacity:0.85; animation:bob 2.2s ease-in-out infinite;
        }
        @keyframes bob{0%,100%{transform:translate(-50%,0);}50%{transform:translate(-50%,8px);}}

        /* ---------- marquee ---------- */
        .marquee{
          overflow:hidden; white-space:nowrap; border-top:1px solid rgba(182,128,47,0.25);
          border-bottom:1px solid rgba(182,128,47,0.25); padding:14px 0; background:var(--bg-alt);
        }
        .marquee-track{display:inline-flex; animation:marquee 26s linear infinite;}
        .marquee-track span{
          font-family:'Cinzel', serif; font-size:12.5px; letter-spacing:0.24em; color:var(--brown-dark);
          padding:0 22px; display:inline-flex; align-items:center; gap:22px;
        }
        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}

        /* ---------- reveal-on-scroll ---------- */
        .reveal{
          opacity:0; transform:translateY(28px);
          transition:opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
          transition-delay:var(--d,0s);
        }
        .reveal.in{opacity:1; transform:translateY(0);}

        /* ---------- sections ---------- */
        .section{max-width:1080px; margin:0 auto; padding:20px 20px 64px;}
        .section-heading{text-align:center; margin-bottom:36px;}
        .section-eyebrow{
          font-size:11.5px; letter-spacing:0.28em; color:var(--gold); text-transform:uppercase;
        }
        .section-title{
          font-family:'Cinzel', serif; font-weight:700; color:var(--brown-dark);
          font-size:clamp(1.5rem, 4vw, 2.1rem); letter-spacing:0.05em; margin-top:8px;
        }
        .section-heading.on-dark .section-title{color:var(--cream);}
        .section-heading.on-dark .section-eyebrow{color:var(--gold-light);}
        .title-rule{display:flex; align-items:center; justify-content:center; gap:10px; margin-top:14px;}
        .title-rule span{width:38px; height:1px; background:linear-gradient(90deg, transparent, var(--gold-deep));}
        .title-rule span:last-child{background:linear-gradient(90deg, var(--gold-deep), transparent);}
        .title-dot{width:5px; height:5px; border-radius:50%; background:var(--gold);}

        /* ---------- features ---------- */
        .feature-grid{display:grid; grid-template-columns:1fr; gap:18px;}
        @media(min-width:640px){.feature-grid{grid-template-columns:1fr 1fr;}}
        @media(min-width:920px){.feature-grid{grid-template-columns:repeat(4,1fr);}}
        .feature-card{
          background:var(--panel);
          border:1px solid rgba(182,128,47,0.22); border-radius:16px;
          padding:24px 18px; text-align:center;
          box-shadow:0 4px 14px rgba(60,36,21,0.06);
          transition:transform .3s ease, border-color .3s ease, box-shadow .3s ease;
        }
        .feature-card:hover{transform:translateY(-5px); border-color:rgba(182,128,47,0.5); box-shadow:0 16px 30px rgba(60,36,21,0.14);}
        .feature-icon{
          width:48px; height:48px; margin:0 auto 14px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          background:radial-gradient(circle at 35% 30%, rgba(182,128,47,0.2), transparent 70%);
          border:1.4px solid var(--gold-deep); color:var(--gold-deep);
        }
        .feature-title{font-family:'Cinzel', serif; font-size:14px; color:var(--brown-dark); letter-spacing:0.03em; margin-bottom:8px;}
        .feature-desc{font-size:12.5px; color:var(--muted); line-height:1.55;}

        /* ---------- menu cards ---------- */
        .menu-grid{display:grid; grid-template-columns:1fr; gap:22px;}
        @media(min-width:640px){.menu-grid.two{grid-template-columns:1fr 1fr;}}
        @media(min-width:640px){.menu-grid.three{grid-template-columns:1fr 1fr;}}
        @media(min-width:920px){.menu-grid.three{grid-template-columns:1fr 1fr 1fr;}}

        .menu-card{
          background:var(--panel);
          border:1px solid rgba(182,128,47,0.22);
          border-radius:18px; overflow:hidden;
          display:flex; flex-direction:column;
          transform-style:preserve-3d;
          box-shadow:0 6px 16px rgba(60,36,21,0.08);
          transition:box-shadow .25s ease, border-color .25s ease;
        }
        .menu-card:hover{
          box-shadow:0 22px 38px rgba(60,36,21,0.18);
          border-color:rgba(182,128,47,0.5);
        }
        .menu-card.pulsing{animation:cardPulse .6s ease-out;}
        @keyframes cardPulse{0%{box-shadow:0 0 0 0 rgba(182,128,47,0.45);}100%{box-shadow:0 0 0 20px rgba(182,128,47,0);}}
        .card-media{position:relative; aspect-ratio:4/3; overflow:hidden;}
        .card-media img{width:100%; height:100%; object-fit:cover; transition:transform .5s ease;}
        .menu-card:hover .card-media img{transform:scale(1.08);}
        .card-media::after{
          content:""; position:absolute; inset:0; z-index:1;
          background:linear-gradient(180deg, transparent 60%, rgba(107,66,38,0.6));
        }
        .card-media::before{
          content:""; position:absolute; inset:0; z-index:2;
          background:linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.28) 50%, transparent 58%);
          transform:translateX(-130%);
        }
        .menu-card:hover .card-media::before{transform:translateX(130%); transition:transform .8s ease;}
        .card-tag{
          position:absolute; top:10px; left:10px; z-index:3;
          background:var(--ribbon); color:var(--cream); font-size:10.5px; font-weight:600;
          letter-spacing:0.06em; padding:4px 10px; border-radius:999px;
        }
        .card-body{padding:20px 18px 18px; display:flex; flex-direction:column; gap:8px; flex:1;}
        .card-title{font-family:'Cinzel', serif; font-size:15.5px; color:var(--brown-dark); letter-spacing:0.02em; font-weight:600;}
        .card-desc{font-size:12.8px; color:var(--muted); line-height:1.55; flex:1;}
        .card-footer{position:relative; display:flex; align-items:center; justify-content:space-between; gap:10px; margin-top:12px;}

        .card-price{display:flex; flex-direction:column; line-height:1.1;}
        .card-price b{font-family:'Cinzel', serif; font-size:15px; color:var(--gold-deep);}
        .card-price small{font-size:9.5px; color:var(--muted); letter-spacing:0.07em; text-transform:uppercase; margin-top:2px;}

        .float-plus{
          position:absolute; right:6px; top:-16px; z-index:4;
          color:var(--gold-deep); font-weight:700; font-size:12px; opacity:0; pointer-events:none;
        }
        .float-plus.show{animation:floatPlus .6s ease forwards;}
        @keyframes floatPlus{0%{opacity:0; transform:translateY(6px);}30%{opacity:1;}100%{opacity:0; transform:translateY(-24px);}}

        .add-btn{
          background:transparent; border:1.3px solid var(--gold); color:var(--gold-deep);
          font-size:12.5px; font-weight:600; letter-spacing:0.04em;
          padding:8px 16px; border-radius:999px; display:flex; align-items:center; gap:6px;
          transition:background .2s ease, color .2s ease, transform .15s ease;
          white-space:nowrap;
        }
        .add-btn:hover{background:var(--gold); color:var(--cream); transform:translateY(-1px);}
        .add-btn:active{transform:scale(0.94);}
        .stepper{display:flex; align-items:center; gap:12px; background:rgba(182,128,47,0.12); border-radius:999px; padding:5px 6px;}
        .stepper button{
          width:26px; height:26px; border-radius:50%; border:1px solid var(--gold-deep);
          background:var(--panel); color:var(--gold-deep); display:flex; align-items:center; justify-content:center;
          transition:background .15s ease, color .15s ease, transform .15s ease;
        }
        .stepper button:hover{background:var(--gold); color:var(--cream);}
        .stepper button:active{transform:scale(0.88);}
        .stepper span{min-width:16px; text-align:center; font-weight:600; font-size:13px; color:var(--brown-dark);}

        /* ---------- addons ---------- */
        .addon-grid{
          display:grid; grid-template-columns:repeat(2,1fr); gap:16px;
        }
        @media(min-width:640px){.addon-grid{grid-template-columns:repeat(3,1fr);}}
        @media(min-width:920px){.addon-grid{grid-template-columns:repeat(6,1fr);}}
        .addon-card{
          background:var(--panel); border:1px solid rgba(182,128,47,0.22); border-radius:16px;
          padding:14px 10px 16px; text-align:center;
          display:flex; flex-direction:column; align-items:center; gap:8px;
          transition:transform .2s ease, border-color .2s ease;
        }
        .addon-card:hover{transform:translateY(-3px); border-color:rgba(182,128,47,0.5);}
        .addon-card.pulsing{animation:bounceScale .4s ease;}
        @keyframes bounceScale{0%{transform:scale(1);}40%{transform:scale(1.08);}100%{transform:scale(1);}}
        .addon-avatar{
          width:64px; height:64px; border-radius:50%; overflow:hidden;
          border:2px solid var(--gold-deep);
        }
        .addon-avatar img{width:100%; height:100%; object-fit:cover; transition:transform .4s ease;}
        .addon-card:hover .addon-avatar img{transform:scale(1.12);}
        .addon-name{font-size:11.8px; color:var(--brown-dark); line-height:1.3; min-height:28px;}
        .addon-price{font-size:12.5px; color:var(--gold-deep); font-weight:700;}


        .ordering-notice {
          padding: 70px 20px;
          background: #f3eadf;
          margin-left: 90px;
          margin-right:90px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 60px;
        }

        .ordering-notice-content {
          max-width: 850px;
          margin: 0 auto;
          text-align: center;
        }

        .ordering-notice-label {
          display: inline-block;
          margin-bottom: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .ordering-notice-content h2 {
          margin: 0 0 16px;
        }

        .ordering-notice-content p {
          margin: 8px auto;
          max-width: 700px;
          line-height: 1.7;
        }

        /* ---------- gallery ---------- */
        .gallery-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:16px;}
        @media(min-width:720px){.gallery-grid{grid-template-columns:repeat(4,1fr);}}
        .gallery-item{
          position:relative; border-radius:16px; overflow:hidden; aspect-ratio:1;
          border:1px solid rgba(182,128,47,0.25);
        }
        .gallery-item img{width:100%; height:100%; object-fit:cover; transition:transform .6s ease;}
        .gallery-item:hover img{transform:scale(1.1);}
        .gallery-caption{
          position:absolute; left:0; right:0; bottom:0; padding:12px;
          background:linear-gradient(180deg, transparent, rgba(107,66,38,0.85));
          font-family:'Cinzel', serif; font-size:11.5px; letter-spacing:0.08em; color:var(--cream);
        }

        /* ---------- reviews ---------- */
        .review-grid{display:grid; grid-template-columns:1fr; gap:18px;}
        @media(min-width:640px){.review-grid{grid-template-columns:1fr 1fr;}}
        .review-card{
          background:var(--panel); border:1px solid rgba(182,128,47,0.22); border-radius:16px;
          padding:22px; box-shadow:0 4px 14px rgba(60,36,21,0.06);
          transition:transform .25s ease, box-shadow .25s ease;
        }
        .review-card:hover{transform:translateY(-4px); box-shadow:0 16px 30px rgba(60,36,21,0.14);}
        .review-stars{display:flex; gap:2px; color:var(--gold); margin-bottom:10px;}
        .review-text{font-family:'Cormorant Garamond', serif; font-style:italic; font-size:16px; color:var(--brown-dark); line-height:1.5;}
        .review-meta{margin-top:12px; font-size:12px; color:var(--muted); letter-spacing:0.04em;}
        .review-meta b{color:var(--brown-dark);}

        /* ---------- visit us ---------- */
        .visit-panel{
          background:linear-gradient(180deg, var(--warm-brown), var(--warm-brown-deep));
          border-radius:22px; padding:32px;
          display:grid; grid-template-columns:1fr; gap:26px;
          box-shadow:0 16px 34px rgba(87,53,29,0.3);
        }
        @media(min-width:760px){.visit-panel{grid-template-columns:1fr 1fr; align-items:center; text-align:left;}}
        .visit-info{display:flex; flex-direction:column; gap:18px; align-items:center; text-align:center;}
        @media(min-width:760px){.visit-info{align-items:flex-start; text-align:left;}}
        .visit-map{
          border-radius:16px; overflow:hidden; border:1.5px solid rgba(251,243,227,0.3);
          box-shadow:0 10px 26px rgba(44,26,16,0.3);
          aspect-ratio:4/3; background:var(--panel-2);
        }
        .visit-map iframe{width:100%; height:100%; border:0; display:block; filter:saturate(0.9) sepia(0.12);}
        .visit-row{display:flex; align-items:flex-start; gap:10px; color:var(--cream); max-width:440px; text-align:left; font-size:16px; line-height:1.6;}
        .visit-row svg{flex-shrink:0; margin-top:2px; color:var(--gold-light);}
        .visit-row b{color:var(--gold-light); display:block; font-family:'Cinzel',serif; font-size:18px; letter-spacing:0.08em; margin-bottom:2px;}
        .map-btn{
          display:flex; align-items:center; gap:8px;
          background:linear-gradient(180deg, var(--gold-light), var(--gold));
          color:#2c1a10; font-weight:600; font-size:13.5px;
          padding:11px 22px; border-radius:999px; border:none;
          transition:transform .2s ease, box-shadow .2s ease;
        }
        .map-btn:hover{transform:translateY(-2px); box-shadow:0 10px 22px rgba(182,128,47,0.35);}

        /* ---------- footer ---------- */
        .footer{
          background:linear-gradient(180deg, var(--warm-brown-deep), var(--warm-brown));
          border-top:1px solid rgba(182,128,47,0.25);
          padding:44px 20px 100px; text-align:center;
          margin-top:8px;
        }
        .footer-tagline{font-family:'Cinzel', serif; letter-spacing:0.2em; color:var(--gold-light); font-size:15px;}
        .socials{display:flex; justify-content:center; gap:22px; margin-top:18px; flex-wrap:wrap;}
        .social-link{
          display:flex; align-items:center; gap:8px; font-size:13px; color:var(--cream);
          border:1px solid rgba(219,167,92,0.35); padding:9px 16px; border-radius:999px ;
          transition:border-color .2s ease, color .2s ease, transform .2s ease;
        }
        .social-link:hover{border-color:var(--gold-light); color:var(--gold-light); transform:translateY(-2px);}       
        .footer-note{margin-top:26px; font-size:11px; color:rgba(251,243,227,0.55);}

        /* ---------- cart bar ---------- */
        .fab-whatsapp{
          position:fixed; right:18px; bottom:18px; z-index:50;
          width:56px; height:58px; border-radius:50%;
          background:var(--whatsapp); color:#0b2412;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 10px 22px rgba(124,79,40,0.35);
          animation:fabPulse 2.6s ease-in-out infinite;
          transition:background .2s ease, transform .2s ease;
        }
        @keyframes fabPulse{0%,100%{box-shadow:0 10px 22px rgba(124,79,40,0.35), 0 0 0 0 rgba(37,211,102,0.5);}50%{box-shadow:0 10px 22px rgba(124,79,40,0.35), 0 0 0 10px rgba(37,211,102,0);}}
        .fab-whatsapp:hover{background:#2be374; transform:scale(1.06);}
        .cart-bar{
          position:fixed; left:0; right:0; bottom:0; z-index:50;
          background:rgba(124,79,40,0.97); backdrop-filter:blur(10px);
          border-top:1px solid rgba(219,167,92,0.35);
          animation:slideUpBar .35s cubic-bezier(.2,.8,.2,1);
        }
        @keyframes slideUpBar{from{transform:translateY(100%);}to{transform:translateY(0);}}
        .cart-bar.bump .cart-summary-bar{animation:bump .4s cubic-bezier(.34,1.56,.64,1);}
        @keyframes bump{0%{transform:scale(1);}30%{transform:scale(1.03);}100%{transform:scale(1);}}
        .cart-drawer{
          max-height:46vh; overflow-y:auto;
          padding:10px 16px 0; border-bottom:1px solid rgba(219,167,92,0.2);
        }
        .cart-row{
          display:flex; align-items:center; justify-content:space-between;
          padding:9px 0; border-bottom:1px solid rgba(251,243,227,0.08); font-size:12.8px;
          animation:fadeUp .35s ease;
        }
        .cart-row:last-child{border-bottom:none;}
        .cart-row-name{color:var(--cream);}
        .cart-row-sub{color:rgba(251,243,227,0.6); font-size:11px;}
        .cart-summary-bar{
          display:flex; align-items:center; justify-content:space-between; gap:12px;
          padding:12px 16px;
        }
        .cart-summary-left{
          display:flex; align-items:center; gap:10px; color:var(--cream); font-size:13px; background:none; border:none; padding:0;
        }
        .cart-summary-left b{color:var(--gold-light);}
        .order-wa-btn{
          display:flex; align-items:center; gap:8px;
          background:var(--whatsapp); color:#0b2412; font-weight:700; font-size:13px;
          padding:11px 18px; border-radius:999px; border:none; white-space:nowrap;
          transition:background .2s ease, transform .2s ease;
        }
        .order-wa-btn:hover{background:#2be374; transform:translateY(-2px);}
        .remove-x{background:none; border:none; color:rgba(251,243,227,0.6); display:flex;}
        .remove-x:hover{color:var(--ribbon-light);}
      `}</style>

      {/* SCROLL PROGRESS */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* NAV */}
      <nav className={`nav${navScrolled ? " scrolled" : ""}`}>
        <div className="brand">
          <div className="brand-mark">C</div>
          <span className="brand-name">HOUSE OF CRAVORA</span>
        </div>
        <div className="nav-links">
          <a href="#menu" className={activeSection === "menu" ? "active" : ""} onClick={(e) => { e.preventDefault(); scrollToId("menu"); }}>Bomboloni</a>
          <a href="#cookies" className={activeSection === "cookies" ? "active" : ""} onClick={(e) => { e.preventDefault(); scrollToId("cookies"); }}>Cookies</a>
          <a href="#addons" className={activeSection === "addons" ? "active" : ""} onClick={(e) => { e.preventDefault(); scrollToId("addons"); }}>Add-ons</a>
          <a href="#gallery" className={activeSection === "gallery" ? "active" : ""} onClick={(e) => { e.preventDefault(); scrollToId("gallery"); }}>Gallery</a>
          <a href="#visit" className={activeSection === "visit" ? "active" : ""} onClick={(e) => { e.preventDefault(); scrollToId("visit"); }}>Visit</a>
        </div>
        <a className="nav-wa" href={genericWaLink} target="_blank" rel="noreferrer">
          <WhatsAppIcon size={15} /> Order
        </a>
      </nav>

      {/* HERO */}
      <header className="hero" ref={heroRef}>
        <div className="hero-parallax" style={{ transform: `translateY(${parallax}px)` }}>
          {HERO_SLIDES.map((src, i) => (
            <div key={src} className={`hero-slide${i === slide ? " active" : ""}`}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
        <div className="hero-overlay" />
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
        <div className="hero-content" style={{ opacity: heroFade, transform: `translateY(${scrollY * 0.08}px)` }}>
          <span className="hero-eyebrow">Freshly fried. Generously filled</span>
          <h1 className="hero-title">
            <span className="reveal-word" style={{ animationDelay: "0.1s" }}>HOUSE</span>{" "}
            <span className="reveal-word" style={{ animationDelay: "0.22s" }}>OF</span>
            <br />
            <span className="reveal-word" style={{ animationDelay: "0.36s" }}>CRAVORA</span>
          </h1>
          <span className="hero-tagline">Bomboloni &nbsp;•&nbsp; Loaded Cookies &nbsp;•&nbsp; Premium Toppings</span>
          <div className="hero-ctas">
            <button className="btn-gold" onClick={() => scrollToId("menu")}>View Full Menu</button>
            <a className="btn-outline" href={genericWaLink} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={16} /> Order on WhatsApp
            </a>
          </div>
        </div>
        <div className="scroll-cue"><ChevronDown size={22} /></div>
      </header>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          <span>FRESH • FRIED TO ORDER • LOADED • HANDMADE DAILY • IRRESISTIBLE •</span>
          <span>FRESH • FRIED TO ORDER • LOADED • HANDMADE DAILY • IRRESISTIBLE •</span>
        </div>
      </div>

      {/* WHY CRAVORA */}
      <section className="section">
        <div className="feature-grid">
          {FEATURES.map((f, i) => (
            <div className="feature-card reveal" style={{ "--d": `${i * 0.1}s` }} key={f.title}>
              <div className="feature-icon"><f.icon size={20} /></div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BOMBOLONI */}
      <section className="section" id="menu">
        <SectionHeading eyebrow="Signature" title="Bomboloni" />
        <div className="menu-grid two">
          {BOMBOLONI.map((item, i) => (
            <div className="reveal" style={{ "--d": `${i * 0.08}s` }} key={item.id}>
              <MenuCard item={item} qty={cart[item.id] || 0} setQty={(q) => setQty(item.id, q)} onAdd={() => handleAdd(item.id)} pulsing={pulseId === item.id} tilt={tilt} />
            </div>
          ))}
        </div>
      </section>

      {/* COOKIES */}
      <section className="section" id="cookies">
        <SectionHeading title="Cookie Collection" />
        <div className="menu-grid three">
          {COOKIES.map((item, i) => (
            <div className="reveal" style={{ "--d": `${i * 0.08}s` }} key={item.id}>
              <MenuCard item={item} qty={cart[item.id] || 0} setQty={(q) => setQty(item.id, q)} onAdd={() => handleAdd(item.id)} pulsing={pulseId === item.id} tilt={tilt} />
            </div>
          ))}
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="section" id="addons">
        <SectionHeading title="Premium Add-Ons" />
        <div className="addon-grid">
          {ADDONS.map((item, i) => {
            const qty = cart[item.id] || 0;
            return (
              <div className={`addon-card ${pulseId === item.id ? " pulsing" : ""}`} style={{ "--d": `${i * 0.05}s` }} key={item.id}>
                <div className="addon-avatar"><img src={item.img} alt="" /></div>
                <div className="addon-name">{item.name}</div>
                <div className="addon-price">+{rs(item.price)}</div>
                {qty === 0 ? (
                  <button className="add-btn" onClick={() => handleAdd(item.id)}><Plus size={12} /> Add</button>
                ) : (
                  <div className="stepper">
                    <button onClick={() => setQty(item.id, qty - 1)}><Minus size={12} /></button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(item.id, qty + 1)}><Plus size={12} /></button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>


       {/* ORDERING NOTICE */}
      <section className="ordering-notice">
        <div className="ordering-notice-content">
          <span className="ordering-notice-label">ORDERING NOTICE</span>

          <h2>Plan Ahead for the Freshest Experience</h2>

          <p>
            For online orders, we recommend placing your order{" "}
            <strong>at least one day in advance</strong> so we can prepare
            everything fresh, especially for you.
          </p>

          <p>
            <strong>Same-day orders are always welcome</strong>, but they are
            subject to stock availability and may not always be guaranteed.
          </p>
        </div>
      </section>


      {/* GALLERY */}
      <section className="section" id="gallery">
        <SectionHeading eyebrow="A Closer Look" title="The Cravora Moment" />
        <div className="gallery-grid">
          {GALLERY.map((g, i) => (
            <div className="gallery-item reveal" style={{ "--d": `${i * 0.08}s` }} key={g.caption}>
              <img src={g.img} alt={g.caption} />
              <div className="gallery-caption">{g.caption}</div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section" id="reviews">
        <SectionHeading eyebrow="From Our Customers" title="Sweet Words" />
        <div className="review-grid">
          {REVIEWS.map((r, i) => (
            <div className="review-card reveal" style={{ "--d": `${i * 0.08}s` }} key={r.handle}>
              <div className="review-stars">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={14} fill="currentColor" />)}
              </div>
              <p className="review-text">"{r.text}"</p>
              <div className="review-meta"><b>{r.name}</b> {r.handle} · via Instagram</div>
            </div>
          ))}
        </div>
      </section>

      {/* VISIT US */}
      <section className="section" id="visit">
        <SectionHeading eyebrow="Come Say Hi" title="Visit the Stall" light />
        <div className="visit-panel reveal">
          <div className="visit-info">
            <div className="visit-row">
              <Clock size={18} />
              <div><b>Hours</b>Thursday – Sunday, 8:30 PM – 12:30 AM</div>
            </div>
            <div className="visit-row">
              <MapPin size={18} />
              <div><b>Location</b>{ADDRESS_TEXT}. Look for the House of Cravora banner.</div>
            </div>
            <a className="map-btn" href={MAPS_LINK} target="_blank" rel="noreferrer">
              <MapPin size={16} /> Open in Google Maps
            </a>
          </div>
          <div className="visit-map">
            <iframe
              title="House of Cravora location"
              loading="lazy"
              src="https://www.google.com/maps?q=CF6C%2BCFG%20North%20East%20gate%2C%20Central%20Secretariat%2C%20Khairtabad%2C%20Hyderabad%2C%20Telangana%20500004%2C%20India&output=embed"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="follow">
        <div className="footer-tagline reveal">FRESH • LOADED • IRRESISTIBLE</div>
        <div className="socials reveal">
          <a className="social-link" href="https://www.instagram.com/basith.journey?igsi=YjlyZDJ1bnFkOWZ0" target="_blank" rel="noreferrer">
            <span>IG</span> basith.journey
          </a>
          <a className="social-link" href="https://www.instagram.com/houseofcravora?igsi=aXlsdHFsaTZ0d2w3" target="_blank" rel="noreferrer">
            <span>IG</span> housofcravora
          </a>
        </div>
        <div className="footer-note">© {new Date().getFullYear()} House of Cravora. Orders placed via WhatsApp.</div>
      </footer>

      {/* CART / ORDER BAR */}
      {cartCount === 0 ? (
        <a className="fab-whatsapp" href={genericWaLink} target="_blank" rel="noreferrer" aria-label="Order on WhatsApp">
          <WhatsAppIcon size={26} />
        </a>
      ) : (
        <div className={`cart-bar${cartBump ? " bump" : ""}`}>
          {cartOpen && (
            <div className="cart-drawer">
              {cartEntries.map((e) => (
                <div className="cart-row" key={e.item.id}>
                  <div>
                    <div className="cart-row-name">{e.item.name}</div>
                    <div className="cart-row-sub">x{e.qty} · {rs(e.item.price * e.qty)}</div>
                  </div>
                  <button className="remove-x" onClick={() => setQty(e.item.id, 0)} aria-label="Remove"><X size={16} /></button>
                </div>
              ))}
            </div>
          )}
          <div className="cart-summary-bar">
            <button className="cart-summary-left" onClick={() => setCartOpen((o) => !o)}>
              <ShoppingBag size={18} />
              <span><b>{cartCount}</b> item{cartCount > 1 ? "s" : ""} · <b>{rs(cartTotal)}</b></span>
              <ChevronDown size={15} style={{ transform: cartOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
            </button>
            <a className="order-wa-btn" href={orderWaLink} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={16} /> Order Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuCard({ item, qty, setQty, onAdd, pulsing, tilt }) {
  return (
    <div className={`menu-card${pulsing ? " pulsing" : ""}`} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}>
      <div className="card-media">
        <img src={item.img} alt={item.name} />
        {item.tag && <span className="card-tag">{item.tag}</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{item.name}</h3>
        <p className="card-desc">{item.desc}</p>
        <div className="card-footer">
          <span className={`float-plus${pulsing ? " show" : ""}`}>+1</span>
          <div className="card-price">
            <b>{rs(item.price)}</b>
            <small>{item.unit}</small>
          </div>
          {qty === 0 ? (
            <button className="add-btn" onClick={onAdd}><Plus size={13} /> Add to Order</button>
          ) : (
            <div className="stepper">
              <button onClick={() => setQty(qty - 1)}><Minus size={13} /></button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}><Plus size={13} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
