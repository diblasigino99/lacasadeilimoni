"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const CAPRI = "#A8C4D4";
const LEMON = "#F4D03F";

// ─── Lemon SVG Watermark ──────────────────────────────────────────────────
const LemonWatermark = () => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="200" cy="195" rx="155" ry="115" fill={CAPRI} fillOpacity="0.07" />
    <ellipse cx="200" cy="200" rx="120" ry="80" fill={LEMON} fillOpacity="0.08" />
    <ellipse cx="200" cy="200" rx="120" ry="80" stroke={LEMON} strokeOpacity="0.2" strokeWidth="1" />
    <ellipse cx="200" cy="200" rx="90" ry="58" stroke={LEMON} strokeOpacity="0.12" strokeWidth="0.5" />
    <line x1="80" y1="200" x2="320" y2="200" stroke={CAPRI} strokeOpacity="0.22" strokeWidth="0.6" />
    {[30, 60, 120, 150].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 200 + 120 * Math.cos(rad);
      const y1 = 200 + 80 * Math.sin(rad);
      const x2 = 200 - 120 * Math.cos(rad);
      const y2 = 200 - 80 * Math.sin(rad);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 2 === 0 ? CAPRI : LEMON} strokeOpacity="0.1" strokeWidth="0.5" />;
    })}
    <path d="M320 200 Q340 170 350 150" stroke="#1A1A1A" strokeOpacity="0.1" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M350 150 Q370 130 360 110 Q340 125 350 150Z" fill={CAPRI} fillOpacity="0.14" />
    <ellipse cx="200" cy="200" rx="145" ry="100" stroke={CAPRI} strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 6" />
  </svg>
);

// ─── Lemon Icon ───────────────────────────────────────────────────────────
const LemonIcon = () => (
  <svg width="52" height="52" viewBox="0 0 60 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="38" rx="22" ry="16" fill={LEMON} />
    <ellipse cx="23" cy="31" rx="6" ry="3.5" fill="#FAE07A" fillOpacity="0.55" transform="rotate(-25 23 31)" />
    <path d="M30 22 Q32 15 38 12" stroke="#4A7C59" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M38 12 Q49 6 43 17 Q38 22 30 22 Q34 16 38 12Z" fill="#4A7C59" />
    <path d="M38 12 Q35 16 32 20" stroke="#3A6B49" strokeWidth="0.7" strokeLinecap="round" />
  </svg>
);

// ─── Custom Cursor ────────────────────────────────────────────────────────
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top  = `${e.clientY}px`;
    };
    const hover   = () => cursor.classList.add("hovering");
    const unhover = () => cursor.classList.remove("hovering");
    window.addEventListener("mousemove", move);
    const targets = document.querySelectorAll("a, button, input, [role='button']");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", hover);
      el.addEventListener("mouseleave", unhover);
    });
    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", hover);
        el.removeEventListener("mouseleave", unhover);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

// ─── Grain ────────────────────────────────────────────────────────────────
const GrainOverlay = () => (
  <svg className="fixed inset-0 w-full h-full pointer-events-none z-50 opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

// ─── Nav ──────────────────────────────────────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
        scrolled ? "bg-[#F9F9F7]/90 backdrop-blur-sm border-b border-[#1A1A1A]/5" : ""
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-8 flex items-center justify-between">
        <span className="font-['Montserrat'] text-[9px] tracking-[0.35em] text-[#1A1A1A]/40 uppercase">
          Est. MMXXVI
        </span>
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="font-['Cormorant_Garamond'] italic text-[#1A1A1A] text-lg tracking-wide">
            La Casa dei Limoni
          </span>
        </div>
        <span className="font-['Montserrat'] text-[9px] tracking-[0.4em] text-[#1A1A1A]/40 uppercase hidden md:block">
          Archive
        </span>
      </div>
    </motion.nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#F9F9F7]">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${CAPRI}18 0%, transparent 55%)` }} />
      <div className="absolute -top-20 right-[10%] w-[420px] h-[320px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `${CAPRI}1A` }} />

      <motion.div style={{ y, opacity }} className="absolute inset-0 flex items-center justify-center">
        <div className="w-[min(85vw,680px)] aspect-square opacity-60">
          <LemonWatermark />
        </div>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="absolute top-[22%] left-[8%] right-[8%] h-px bg-[#1A1A1A]/8 origin-left"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        className="relative z-10 text-center px-8"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.42em" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="font-['Montserrat'] text-[9px] text-[#1A1A1A]/50 uppercase mb-10 tracking-[0.42em]"
        >
          The Italian Summer in the American Mind
        </motion.p>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }} animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            className="font-['Cormorant_Garamond'] italic text-[#1A1A1A] leading-[0.9]"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
          >
            La Casa
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }} animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
            className="font-['Cormorant_Garamond'] text-[#F4D03F] leading-[0.9]"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
          >
            dei Limoni
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-20 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-[#1A1A1A]/45 to-transparent"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="absolute bottom-[22%] left-[8%] right-[8%] h-px bg-[#1A1A1A]/8 origin-right"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-10 right-10 text-right">
        <p className="font-['Montserrat'] text-[8px] tracking-[0.35em] text-[#1A1A1A]/40 uppercase">Amalfi · New York</p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-10 left-10">
        <p className="font-['Montserrat'] text-[8px] tracking-[0.35em] text-[#1A1A1A]/40 uppercase">SS · 2026</p>
      </motion.div>
    </section>
  );
};

// ─── Manifesto Card ───────────────────────────────────────────────────────
const ManifestoCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-32 px-6 bg-[#F9F9F7] flex items-center justify-center">
      <div className="w-full max-w-[500px]">
        <motion.div
          layout
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center overflow-hidden"
          style={{ background: "#FCFCFA", border: "0.5px solid #E5E7EB" }}
        >
          {/* Closed state — always visible */}
          <motion.div layout className="px-12 py-14">
            <h2
              className="font-['Cormorant_Garamond'] italic text-[#1A1A1A]"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
            >
              il dolce far niente
            </h2>

            <AnimatePresence>
              {!open && (
                <motion.button
                  key="read-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setOpen(true)}
                  className="mt-8 font-['Montserrat'] text-[10px] tracking-[0.45em] text-[#1A1A1A]/70 uppercase border-b border-[#1A1A1A]/40 pb-1 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors duration-300"
                >
                  Read
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Revealed content */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="revealed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="px-12 pb-14"
              >
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex justify-center mb-10"
                >
                  <LemonIcon />
                </motion.div>

                <div className="w-6 h-px bg-[#E5E7EB] mx-auto mb-10" />

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.75 }}
                  className="font-['Montserrat'] text-[9px] tracking-[0.32em] text-[#1A1A1A]/55 uppercase leading-[2.8] mb-10 max-w-[360px] mx-auto"
                >
                  The American Amalfi is a study in stillness. We celebrate the sweet art of doing nothing.
                  Each piece in our archive is a quiet argument for slowness —
                  captured in the heat of the light.
                </motion.p>

                <div className="w-6 h-px bg-[#E5E7EB] mx-auto mb-10" />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="font-['Montserrat'] text-[8px] tracking-[0.45em] text-[#1A1A1A]/30 uppercase"
                >
                  Est. MMXXVI — Long Island
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Trilogy Grid ─────────────────────────────────────────────────────────
const TRILOGY = [
  { fig: "I",   title: "La Torre",    sub: "Pisa",           src: "/images/fig-i-pisa.png" },
  { fig: "II",  title: "Il Colosseo", sub: "Rome",           src: "/images/fig-ii-colosseum.png" },
  { fig: "III", title: "La Fontana",  sub: "Trevi Fountain", src: "/images/fig-iii-trevi.png" },
];

const TrilogyGrid = () => (
  <section className="py-24 md:py-40 px-8 bg-[#F9F9F7]">
    <div className="max-w-screen-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-20"
      >
        <p className="font-['Montserrat'] text-[9px] tracking-[0.45em] text-[#1A1A1A]/50 uppercase mb-4">
          The Italian Series
        </p>
        <h2
          className="font-['Cormorant_Garamond'] italic text-[#1A1A1A]"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
        >
          Vol. I
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {TRILOGY.map(({ fig, title, sub, src }) => (
          <div key={fig}>
            <div
              className="border border-[#1A1A1A]/8 shadow-[0_4px_24px_rgba(26,26,26,0.05)] overflow-hidden bg-[#F0EDE4] group"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={src}
                alt={`Fig. ${fig} — ${title}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-4 px-1">
              <p className="font-['Montserrat'] text-[8px] tracking-[0.4em] text-[#1A1A1A]/55 uppercase mb-1">
                Fig. {fig} — {title}
              </p>
              <p className="font-['Cormorant_Garamond'] italic text-[#1A1A1A]/40 text-sm">
                {sub} · Watercolour, 2026
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Archive Access ───────────────────────────────────────────────────────
const ArchiveAccess = () => (
  <section className="py-32 md:py-48 px-8 bg-[#F9F9F7]">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-xl mx-auto text-center"
    >
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-8 h-px bg-[#F4D03F] mx-auto mb-16 origin-center"
      />
      <p className="font-['Montserrat'] text-[9px] tracking-[0.45em] text-[#1A1A1A]/50 uppercase mb-8">
        Digital Archive
      </p>
      <h3 className="font-['Cormorant_Garamond'] italic text-[#1A1A1A] mb-6"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
        Acquire the Trilogy.
      </h3>
      <p className="font-['Montserrat'] text-[10px] leading-[2.2] tracking-[0.06em] text-[#1A1A1A]/55 mb-6 max-w-sm mx-auto">
        The Digital Archive Vol. I includes high-resolution master files of the complete series for personal curation.
      </p>
      <p className="font-['Cormorant_Garamond'] text-[#1A1A1A]/75 mb-12"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
        $60
      </p>
      <a
        href="#"
        className="inline-flex items-center gap-3 font-['Montserrat'] text-[9px] tracking-[0.35em] text-[#1A1A1A]/60 uppercase border-b border-[#1A1A1A]/20 pb-1 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/60 transition-all duration-300"
      >
        Acquire <ArrowRight size={10} strokeWidth={1.5} />
      </a>
    </motion.div>
  </section>
);

// ─── Waitlist ─────────────────────────────────────────────────────────────
const Waitlist = () => {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]     = useState(false);

  const handleSubmit = async () => {
    if (!email.includes("@")) return;
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) setSubmitted(true);
  };

  return (
    <section className="relative py-48 md:py-64 px-8 bg-[#F9F9F7] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-2xl h-64">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl"
            style={{ background: `${LEMON}09` }} />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl"
            style={{ background: `${CAPRI}14` }} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl mx-auto text-center relative"
      >
        <p className="font-['Montserrat'] text-[9px] tracking-[0.45em] text-[#1A1A1A]/50 uppercase mb-10">
          The Portal
        </p>
        <h3
          className="font-['Cormorant_Garamond'] italic text-[#1A1A1A] mb-6"
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
        >
          Enter the house.
        </h3>
        <p className="font-['Montserrat'] text-[10px] leading-[2.2] tracking-[0.06em] text-[#1A1A1A]/55 mb-16">
          Be among the first to receive our inaugural collection.<br />
          No noise. Only light.
        </p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="relative">
              <div className={`relative border-b transition-all duration-500 ${focused ? "border-[#1A1A1A]/40" : "border-[#1A1A1A]/12"}`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="your@address.com"
                  className="w-full bg-transparent font-['Montserrat'] text-[11px] tracking-[0.15em] text-[#1A1A1A] placeholder-[#1A1A1A]/35 py-4 pr-12 outline-none"
                />
                <button onClick={handleSubmit} className="absolute right-0 top-1/2 -translate-y-1/2 p-1 group" aria-label="Submit">
                  <ArrowRight size={14} className="text-[#1A1A1A]/45 group-hover:text-[#1A1A1A]/70 transition-colors duration-300" strokeWidth={1.5} />
                </button>
              </div>
              <motion.div
                animate={{ scaleX: focused ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-px origin-left mt-px"
                style={{ background: `${CAPRI}90` }}
              />
              <p className="mt-6 font-['Montserrat'] text-[8px] tracking-[0.3em] text-[#1A1A1A]/35 uppercase">
                We write infrequently. We write well.
              </p>
            </motion.div>
          ) : (
            <motion.div key="thanks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="py-8">
              <p className="font-['Cormorant_Garamond'] italic text-[#1A1A1A]/75 text-xl mb-3">You are inside.</p>
              <p className="font-['Montserrat'] text-[9px] tracking-[0.3em] text-[#1A1A1A]/40 uppercase">A letter will find you.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="py-16 px-8 md:px-16 bg-[#F9F9F7]" style={{ borderTop: `1px solid ${CAPRI}30` }}>
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <span className="font-['Cormorant_Garamond'] italic text-[#1A1A1A]/45 text-sm">La Casa dei Limoni</span>
      <span className="font-['Montserrat'] text-[8px] tracking-[0.35em] text-[#1A1A1A]/35 uppercase">© MMXXVI — All Rights Reserved</span>
      <span className="font-['Montserrat'] text-[8px] tracking-[0.35em] text-[#1A1A1A]/35 uppercase">Long Island · Amalfi</span>
    </div>
  </footer>
);

// ─── Page ─────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <main className="bg-[#F9F9F7] min-h-screen">
      <CustomCursor />
      <GrainOverlay />
      <Nav />
      <Hero />
      <ManifestoCard />
      <TrilogyGrid />
      <ArchiveAccess />
      <Waitlist />
      <Footer />
    </main>
  );
}
