import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const BallSVG = ({ size = 100, color = "#ff7a00", lines = "#000", opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
    <circle cx="50" cy="50" r="48" fill={color} />
    <path d="M50 2 Q78 50 50 98" fill="none" stroke={lines} strokeWidth="5.5" />
    <path d="M50 2 Q22 50 50 98" fill="none" stroke={lines} strokeWidth="5.5" />
    <path d="M2 50 Q50 74 98 50" fill="none" stroke={lines} strokeWidth="5.5" />
    <path d="M2 50 Q50 26 98 50" fill="none" stroke={lines} strokeWidth="5.5" />
    <circle cx="50" cy="50" r="48" fill="none" stroke={lines} strokeWidth="5" />
  </svg>
);

/* ── Category data ── */
const MAIN_CATS = [
  {
    title: "Мячи",
    desc: "Контроль. Звук. Улица.",
    tag: "от 1 200 ₽",
    path: "/balls",
    accent: "#ff7a00",
    icon: <BallSVG size={56} color="#ff7a00" lines="#000" />,
  },
  {
    title: "Кроссовки",
    desc: "Сцепление и скорость.",
    tag: "от 4 900 ₽",
    path: "/shoes",
    accent: "#fff",
    icon: (
      <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="32" fill="#1a1a1a" />
        <path d="M8 40 Q20 28 32 34 Q44 40 56 30" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M12 44 Q28 36 44 42 L56 36 L56 44 Q40 50 20 48 Z" fill="#fff" opacity=".15"/>
        <circle cx="20" cy="42" r="2" fill="#ff7a00"/>
        <circle cx="32" cy="38" r="2" fill="#ff7a00"/>
        <circle cx="44" cy="40" r="2" fill="#ff7a00"/>
      </svg>
    ),
  },
  {
    title: "Форма",
    desc: "Дышит. Держит. Живёт.",
    tag: "от 2 400 ₽",
    path: "/apparel",
    accent: "#fff",
    icon: (
      <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="32" fill="#1a1a1a" />
        <path d="M20 14 L12 26 L20 28 L20 50 L44 50 L44 28 L52 26 L44 14 Q38 18 32 18 Q26 18 20 14Z" fill="#fff" opacity=".12" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="32" y1="18" x2="32" y2="50" stroke="#ff7a00" strokeWidth="1.5" strokeDasharray="3 3"/>
      </svg>
    ),
  },
];

const EXTRA_CATS = [
  {
    title: "Аксессуары",
    desc: "Насосы, сетки, конусы, стойки — всё для площадки.",
    tag: "от 300 ₽",
    path: "/accessories",
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1.5"/>
        <circle cx="32" cy="32" r="12" fill="none" stroke="#ff7a00" strokeWidth="2.5"/>
        <line x1="32" y1="8" x2="32" y2="20" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".5"/>
        <line x1="32" y1="44" x2="32" y2="56" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".5"/>
        <line x1="8" y1="32" x2="20" y2="32" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".5"/>
        <line x1="44" y1="32" x2="56" y2="32" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".5"/>
      </svg>
    ),
  },
  {
    title: "Защита",
    desc: "Наколенники, налокотники, скобы — игра без травм.",
    tag: "от 800 ₽",
    path: "/protection",
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1.5"/>
        <path d="M32 14 L46 20 L46 36 Q46 48 32 54 Q18 48 18 36 L18 20 Z" fill="#ff7a00" opacity=".15" stroke="#ff7a00" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M26 32 L30 36 L38 28" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Тренировки",
    desc: "Конусы, лестницы, утяжелители — прокачай игру.",
    tag: "от 500 ₽",
    path: "/training",
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1.5"/>
        <rect x="14" y="28" width="36" height="8" rx="4" fill="#ff7a00" opacity=".2" stroke="#ff7a00" strokeWidth="1.5"/>
        <rect x="8" y="24" width="8" height="16" rx="4" fill="#fff" opacity=".25"/>
        <rect x="48" y="24" width="8" height="16" rx="4" fill="#fff" opacity=".25"/>
      </svg>
    ),
  },
  {
    title: "Стойки",
    desc: "Мобильные и стационарные кольца для дома и улицы.",
    tag: "от 6 000 ₽",
    path: "/hoops",
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1.5"/>
        <line x1="32" y1="52" x2="32" y2="28" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".4"/>
        <line x1="32" y1="28" x2="42" y2="22" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".4"/>
        <ellipse cx="44" cy="21" rx="8" ry="3" fill="none" stroke="#ff7a00" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    title: "Сумки",
    desc: "Рюкзаки и баулы — для тех, кто берёт с собой всё.",
    tag: "от 1 800 ₽",
    path: "/bags",
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1.5"/>
        <rect x="16" y="26" width="32" height="22" rx="4" fill="#ff7a00" opacity=".12" stroke="#ff7a00" strokeWidth="1.5"/>
        <path d="M24 26 Q24 18 32 18 Q40 18 40 26" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".4"/>
        <line x1="16" y1="34" x2="48" y2="34" stroke="#fff" strokeWidth="1" opacity=".2"/>
      </svg>
    ),
  },
  {
    title: "Бренды",
    desc: "Nike, Jordan, Under Armour, Spalding и другие.",
    tag: "топ-20",
    path: "/brands",
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1.5"/>
        <polygon points="32,14 36,26 50,26 39,34 43,46 32,38 21,46 25,34 14,26 28,26" fill="#ff7a00" opacity=".25" stroke="#ff7a00" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

const Catalog = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.margin = "0";
  }, []);

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section style={s.hero}>
        {/* ghost ball */}
        <div style={s.heroBall}>
          <BallSVG size={500} color="#1c0f00" lines="#3d2000" opacity={1} />
        </div>

        <div style={s.heroInner}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={s.heroEyebrow}
          >
            HOOPSTORE / КАТАЛОГ
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={s.heroTitle}
          >
            КАТАЛОГ<br />
            <span style={s.orange}>УЛИЦЫ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={s.heroDesc}
          >
            Снаряжение для асфальта, ночных матчей<br />
            и бросков до последнего.
          </motion.p>
        </div>
      </section>

      {/* ── ORANGE DIVIDER ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={s.divider}
      />

      {/* ── MAIN CATEGORIES ── */}
      <section style={s.section}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 40 }}>
            Категории
          </motion.h2>

          <div style={s.mainGrid}>
            {MAIN_CATS.map((cat, i) => (
              <motion.div
                key={i}
                onClick={() => navigate(cat.path)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.13 }}
                className="main-card"
                style={s.mainCard}
              >
                <div style={s.mainCardIcon}>{cat.icon}</div>
                <div style={s.mainCardBody}>
                  <h3 style={s.mainCardTitle}>{cat.title}</h3>
                  <p style={s.mainCardDesc}>{cat.desc}</p>
                </div>
                <div style={s.mainCardFooter}>
                  <span style={s.mainCardTag}>{cat.tag}</span>
                  <span style={s.mainCardArrow} className="card-arrow">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATEMENT ── */}
      <section style={{ ...s.section, background: "#111", padding: "80px 0" }}>
        <div style={s.container}>
          <div style={s.statementGrid}>
            <motion.h2 {...fadeUp} style={s.sectionTitle}>
              Не для<br />витрин
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={s.statementText}
            >
              Мы не гонимся за глянцем. Наш выбор — это бетон,
              кольцо без сетки и игра, которая начинается после захода солнца.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── EXTRA CATEGORIES ── */}
      <section style={s.section}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 40 }}>
            Ещё снаряжение
          </motion.h2>

          <div style={s.extraGrid}>
            {EXTRA_CATS.map((cat, i) => (
              <motion.div
                key={i}
                onClick={() => navigate(cat.path)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="extra-card"
                style={s.extraCard}
              >
                <div style={s.extraIcon}>{cat.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={s.extraTitle}>{cat.title}</h3>
                  <p style={s.extraDesc}>{cat.desc}</p>
                </div>
                <div style={s.extraRight}>
                  <span style={s.extraTag}>{cat.tag}</span>
                  <span className="extra-arrow" style={s.extraArrow}>→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.cta}>
        <div style={s.ctaBall}>
          <BallSVG size={380} color="#e06800" lines="#c85e00" opacity={1} />
        </div>
        <motion.div {...fadeUp} style={s.ctaInner}>
          <p style={s.ctaEyebrow}>HOOPSTORE</p>
          <h2 style={s.ctaTitle}>
            ГОТОВ ВЫЙТИ<br />НА ПЛОЩАДКУ?
          </h2>
          <button
            className="btn-cta"
            style={s.ctaBtn}
            onClick={() => navigate("/")}
          >
            На главную
          </button>
        </motion.div>
      </section>
    </div>
  );
};

/* ── STYLES ── */
const s = {
  root: {
    width: "100%",
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#fff",
    fontFamily: "'Barlow', sans-serif",
    overflowX: "hidden",
  },

  hero: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    position: "relative",
    overflow: "hidden",
  },
  heroBall: {
    position: "absolute",
    right: "-60px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  heroInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 48px",
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
  heroEyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "5px",
    color: "#ff7a00",
    marginBottom: 20,
  },
  heroTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(60px, 9vw, 96px)",
    fontWeight: 900,
    lineHeight: 1.0,
    letterSpacing: "2px",
    textTransform: "uppercase",
    margin: "0 0 24px 0",
    color: "#fff",
  },
  orange: { color: "#ff7a00" },
  heroDesc: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "17px",
    lineHeight: 1.75,
    margin: 0,
  },

  divider: {
    height: 3,
    background: "rgba(255,122,0,0.55)",
    transformOrigin: "left",
  },

  section: {
    padding: "96px 0",
    background: "#0a0a0a",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 48px",
  },
  sectionTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(30px, 4vw, 46px)",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "#fff",
    margin: 0,
  },

  // MAIN CARDS
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
  },
  mainCard: {
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "36px 28px 28px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    background: "#0f0f0f",
    transition: "border-color 0.2s",
    position: "relative",
    overflow: "hidden",
  },
  mainCardIcon: { marginBottom: 4 },
  mainCardBody: { flex: 1 },
  mainCardTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "26px",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: "0 0 8px 0",
    color: "#fff",
  },
  mainCardDesc: {
    color: "rgba(255,255,255,0.38)",
    fontSize: "14px",
    lineHeight: 1.6,
    margin: 0,
  },
  mainCardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    paddingTop: 16,
    marginTop: 4,
  },
  mainCardTag: {
    color: "#ff7a00",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.5px",
  },
  mainCardArrow: {
    color: "rgba(255,255,255,0.2)",
    fontSize: "20px",
    transition: "color 0.2s, transform 0.2s",
  },

  // STATEMENT
  statementGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 64,
    alignItems: "start",
  },
  statementText: {
    color: "rgba(255,255,255,0.38)",
    fontSize: "17px",
    lineHeight: 1.8,
    margin: 0,
  },

  // EXTRA CARDS
  extraGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
  },
  extraCard: {
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "24px 22px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 16,
    background: "#0f0f0f",
    transition: "border-color 0.2s",
  },
  extraIcon: { flexShrink: 0 },
  extraTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "18px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: "0 0 4px 0",
    color: "#fff",
  },
  extraDesc: {
    color: "rgba(255,255,255,0.3)",
    fontSize: "12px",
    lineHeight: 1.5,
    margin: 0,
  },
  extraRight: {
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 6,
  },
  extraTag: {
    color: "#ff7a00",
    fontSize: "12px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  extraArrow: {
    color: "rgba(255,255,255,0.2)",
    fontSize: "18px",
    transition: "color 0.2s, transform 0.2s",
  },

  // CTA
  cta: {
    background: "#ff7a00",
    padding: "96px 0",
    position: "relative",
    overflow: "hidden",
  },
  ctaBall: {
    position: "absolute",
    right: "-60px",
    top: "50%",
    transform: "translateY(-50%)",
    opacity: 0.22,
    pointerEvents: "none",
  },
  ctaInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 48px",
    position: "relative",
    zIndex: 1,
  },
  ctaEyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "5px",
    color: "rgba(0,0,0,0.4)",
    marginBottom: 12,
  },
  ctaTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(38px, 5.5vw, 64px)",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "#000",
    margin: "0 0 32px 0",
    lineHeight: 1.0,
  },
  ctaBtn: {
    background: "#000",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "16px",
    fontWeight: 900,
    letterSpacing: "3px",
    textTransform: "uppercase",
    padding: "15px 48px",
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  .main-card:hover { border-color: #ff7a00 !important; }
  .main-card:hover .card-arrow { color: #ff7a00 !important; transform: translateX(4px); }
  .main-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,122,0,0.04);
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }
  .main-card:hover::after { opacity: 1; }

  .extra-card:hover { border-color: #ff7a00 !important; }
  .extra-card:hover .extra-arrow { color: #ff7a00 !important; transform: translateX(3px); }

  .btn-cta:hover  { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,0,0,0.35); }
  .btn-cta:active { transform: translateY(0); }
`;

export default Catalog;