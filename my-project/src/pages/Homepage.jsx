import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

// Reusable basketball SVG
const BallSVG = ({ size = 100, opacity = 1, color = "#ff7a00", lines = "#000" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
    <circle cx="50" cy="50" r="48" fill={color} />
    <path d="M50 2 Q78 50 50 98" fill="none" stroke={lines} strokeWidth="5.5" />
    <path d="M50 2 Q22 50 50 98" fill="none" stroke={lines} strokeWidth="5.5" />
    <path d="M2 50 Q50 74 98 50" fill="none" stroke={lines} strokeWidth="5.5" />
    <path d="M2 50 Q50 26 98 50" fill="none" stroke={lines} strokeWidth="5.5" />
    <circle cx="50" cy="50" r="48" fill="none" stroke={lines} strokeWidth="5" />
  </svg>
);

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.margin = "0";
  }, []);

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* ─── HERO ─── */}
      <section style={s.hero}>
        {/* Ghost ball background */}
        <div style={s.heroBgBall}>
          <BallSVG size={560} opacity={1} color="#1c0f00" lines="#3d2000" />
        </div>

        <div style={s.heroInner}>
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={s.heroLeft}
          >
            <div style={{ marginBottom: 28 }}>
              <BallSVG size={52} color="#ff7a00" lines="#000" />
            </div>

            <h1 style={s.heroTitle}>
              STREET<br />
              BASKETBALL<br />
              <span style={s.orange}>CULTURE</span>
            </h1>

            <p style={s.heroDesc}>
              Экипировка для тех, кто вырос на площадке.<br />
              Не для витрин — для игры.
            </p>

            <div style={s.btnRow}>
              <button
                className="btn-primary"
                style={s.btnPrimary}
                onClick={() => navigate("/catalog")}
              >
                Войти в игру
              </button>
              <button
                className="btn-secondary"
                style={s.btnSecondary}
                onClick={() => navigate("/about")}
              >
                Каталог
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── ORANGE DIVIDER ─── */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={s.divider}
      />

      {/* ─── ABOUT ─── */}
      <section style={s.section}>
        <div style={s.container}>
          <div style={s.aboutGrid}>
            <motion.h2 {...fadeUp} style={s.sectionTitle}>
              Это не просто<br />магазин
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={s.aboutText}
            >
              Мы про асфальт, кольцо без сетки и звук мяча,
              который слышно за квартал.
              Здесь только то, что реально используют на улице.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section style={{ ...s.section, background: "#111" }}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 48 }}>
            Снаряжение
          </motion.h2>

          <div style={s.catGrid}>
            {[
              { title: "Мячи",      icon: <BallSVG size={48} color="#ff7a00" lines="#000" />, path: "/balls" },
              { title: "Кроссовки", icon: <BallSVG size={48} color="#222"    lines="#444" />, path: "/shoes" },
              { title: "Форма",     icon: <BallSVG size={48} color="#1a1a1a" lines="#333" />, path: "/apparel" },
            ].map((item, i) => (
              <motion.div
                key={i}
                onClick={() => navigate(item.path)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.13 }}
                className="cat-card"
                style={s.catCard}
              >
                <div style={s.catIcon}>{item.icon}</div>
                <div style={s.catTitle}>{item.title}</div>
                <div style={s.catArrow}>→</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section style={s.section}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 52 }}>
            Наш код
          </motion.h2>

          <div style={s.valuesGrid}>
            {[
              { tag: "01", title: "Улица",  text: "Проверено реальными играми" },
              { tag: "02", title: "Честно", text: "Без глянца и пафоса" },
              { tag: "03", title: "Движ",   text: "Быстро. Жёстко. По делу." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18 }}
                style={s.valueCard}
              >
                <span style={s.valueTag}>{item.tag}</span>
                <div style={s.valueLine} />
                <h3 style={s.valueTitle}>{item.title}</h3>
                <p style={s.valueText}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={s.ctaSection}>
        <div style={s.ctaBgBall}>
          <BallSVG size={420} opacity={1} color="#e06800" lines="#c85e00" />
        </div>
        <motion.div {...fadeUp} style={s.ctaInner}>
          <p style={s.ctaEyebrow}>HOOPSTORE</p>
          <h2 style={s.ctaTitle}>
            ГОТОВ ВЫЙТИ<br />НА ПЛОЩАДКУ?
          </h2>
          <button
            className="btn-cta"
            style={s.ctaBtn}
            onClick={() => navigate("/catalog")}
          >
            Начать
          </button>
        </motion.div>
      </section>
    </div>
  );
};

/* ─── STYLES ─── */
const s = {
  root: {
    width: "100%",
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#fff",
    fontFamily: "'Barlow', sans-serif",
    overflowX: "hidden",
  },

  // HERO
  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroBgBall: {
    position: "absolute",
    right: "-60px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    zIndex: 0,
    opacity: 0.9,
  },
  heroInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 48px",
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
  heroLeft: {
    maxWidth: 600,
    display: "flex",
    flexDirection: "column",
  },
  heroTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(56px, 8vw, 88px)",
    fontWeight: 900,
    lineHeight: 1.0,
    letterSpacing: "2px",
    textTransform: "uppercase",
    margin: "0 0 24px 0",
    color: "#fff",
  },
  orange: { color: "#ff7a00" },
  heroDesc: {
    color: "rgba(255,255,255,0.45)",
    fontSize: "17px",
    lineHeight: 1.75,
    margin: "0 0 36px 0",
    fontWeight: 400,
  },
  btnRow: { display: "flex", gap: 14, flexWrap: "wrap" },
  btnPrimary: {
    background: "#ff7a00",
    border: "none",
    borderRadius: "10px",
    color: "#000",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "16px",
    fontWeight: 900,
    letterSpacing: "2px",
    textTransform: "uppercase",
    padding: "15px 36px",
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  btnSecondary: {
    background: "transparent",
    border: "1.5px solid rgba(255,255,255,0.18)",
    borderRadius: "10px",
    color: "rgba(255,255,255,0.7)",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "16px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    padding: "15px 36px",
    cursor: "pointer",
    transition: "border-color 0.2s, color 0.2s",
  },

  // DIVIDER
  divider: {
    height: 3,
    background: "rgba(255,122,0,0.55)",
    transformOrigin: "left",
  },

  // SECTIONS
  section: {
    padding: "100px 0",
    background: "#0a0a0a",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 48px",
  },
  sectionTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(32px, 4vw, 48px)",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "#fff",
    margin: 0,
  },

  // ABOUT
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 64,
    alignItems: "start",
  },
  aboutText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "17px",
    lineHeight: 1.8,
    margin: 0,
  },

  // CATEGORIES
  catGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
  },
  catCard: {
    border: "1.5px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    padding: "32px 28px",
    display: "flex",
    alignItems: "center",
    gap: 20,
    cursor: "pointer",
    transition: "border-color 0.2s",
    background: "#0a0a0a",
    position: "relative",
  },
  catIcon: { flexShrink: 0 },
  catTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "24px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1px",
    flex: 1,
  },
  catArrow: {
    color: "rgba(255,255,255,0.2)",
    fontSize: "20px",
    transition: "color 0.2s, transform 0.2s",
  },

  // VALUES
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 40,
  },
  valueCard: {
    padding: "32px 0",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  valueTag: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "3px",
    color: "#ff7a00",
    display: "block",
    marginBottom: 14,
  },
  valueLine: {
    display: "none",
  },
  valueTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "28px",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: "0 0 10px 0",
    color: "#fff",
  },
  valueText: {
    color: "rgba(255,255,255,0.38)",
    fontSize: "15px",
    lineHeight: 1.65,
    margin: 0,
  },

  // CTA
  ctaSection: {
    background: "#ff7a00",
    padding: "100px 0",
    position: "relative",
    overflow: "hidden",
  },
  ctaBgBall: {
    position: "absolute",
    right: "-80px",
    top: "50%",
    transform: "translateY(-50%)",
    opacity: 0.25,
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
    color: "rgba(0,0,0,0.45)",
    marginBottom: 12,
  },
  ctaTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(40px, 6vw, 68px)",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "#000",
    margin: "0 0 36px 0",
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

  .btn-primary:hover  { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(255,122,0,0.42) !important; }
  .btn-primary:active { transform: translateY(0); }

  .btn-secondary:hover { border-color: rgba(255,255,255,0.4) !important; color: #fff !important; }

  .btn-cta:hover  { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,0,0,0.35) !important; }
  .btn-cta:active { transform: translateY(0); }

  .cat-card:hover { border-color: #ff7a00 !important; }
  .cat-card:hover .cat-arrow { color: #ff7a00 !important; transform: translateX(4px); }

  @media (max-width: 768px) {
    .about-grid  { grid-template-columns: 1fr !important; }
    .cat-grid    { grid-template-columns: 1fr !important; }
    .values-grid { grid-template-columns: 1fr !important; }
  }
`;

export default Homepage;