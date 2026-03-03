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

const STORY_BLOCKS = [
  {
    num: "01",
    title: "Моя история",
    text: "Всё началось с маленькой площадки во дворе. Играл каждый день, пока не решил собрать всё необходимое для уличного баскетбола в одном месте.",
  },
  {
    num: "02",
    title: "Идея проекта",
    text: "Сделать сайт, который будет живым, дерзким и честным. Без глянца, только реальная уличная культура баскетбола.",
  },
  {
    num: "03",
    title: "Цель",
    text: "Передать атмосферу настоящей игры. Каждый посетитель должен почувствовать, что он на уличной площадке, а не в обычном интернет-магазине.",
  },
];

const About = () => {
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
          <BallSVG size={500} color="#1c0f00" lines="#3d2000" />
        </div>

        <div style={s.heroInner}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={s.eyebrow}
          >
            HOOPSTORE / О ПРОЕКТЕ
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={s.heroTitle}
          >
            ПРИВЕТ,<br />Я{" "}
            <span style={s.orange}>СОЗДАТЕЛЬ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={s.heroDesc}
          >
            Я увлечён стритболом и решил создать этот проект,<br />
            чтобы собрать всё необходимое для настоящей<br />
            игры на улице в одном месте.
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

      {/* ── PHOTO + BIO ── */}
      <section style={s.section}>
        <div style={s.container}>
          <div style={s.bioGrid}>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={s.photoWrap}
            >
              <div style={s.photoRing}>
                <img
                  src="https://via.placeholder.com/300"
                  alt="Creator"
                  style={s.photo}
                />
              </div>
              {/* decorative ball */}
              <div style={s.photoBallDeco}>
                <BallSVG size={64} color="#ff7a00" lines="#000" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div {...fadeUp} style={s.bioText}>
              <p style={s.bioEyebrow}>МОЯ ИСТОРИЯ</p>
              <p style={s.bioParagraph}>
                Этот сайт — результат моей идеи сделать пространство для настоящих стритбольных игроков.
                От мячей до обуви и формы — всё проверено мной лично на площадке.
              </p>
              <p style={s.bioParagraph}>
                Стиль, качество и атмосфера улицы — вот что я хотел передать каждому посетителю.
                Не витрина. Не глянец. Только то, что работает.
              </p>

              <div style={s.bioStats}>
                {[
                  ["10+", "лет на площадке"],
                  ["150+", "брендов в каталоге"],
                  ["2 400+", "товаров"],
                ].map(([num, label]) => (
                  <div key={label} style={s.bioStat}>
                    <span style={s.bioStatNum}>{num}</span>
                    <span style={s.bioStatLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STORY BLOCKS ── */}
      <section style={{ ...s.section, background: "#111" }}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 52 }}>
            За этим проектом
          </motion.h2>

          <div style={s.storyGrid}>
            {STORY_BLOCKS.map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={s.storyCard}
              >
                <span style={s.storyNum}>{block.num}</span>
                <div style={s.storyLine} />
                <h3 style={s.storyTitle}>{block.title}</h3>
                <p style={s.storyText}>{block.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section style={s.section}>
        <div style={s.container}>
          <div style={s.manifestoInner}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={s.manifestoLeft}
            >
              <BallSVG size={96} color="#ff7a00" lines="#000" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={s.manifestoRight}
            >
              <p style={s.manifestoEyebrow}>МАНИФЕСТ</p>
              <h2 style={{ ...s.sectionTitle, marginBottom: 20, fontSize: "clamp(28px,4vw,44px)" }}>
                МЫ ЗА АСФАЛЬТ,<br />
                А НЕ ЗА ВИТРИНУ
              </h2>
              <p style={s.manifestoText}>
                Баскетбол — это не про паркет. Это про звук мяча об бетон в 23:00,
                кольцо без сетки и пять человек, которые играют просто потому что
                иначе не могут.
              </p>
            </motion.div>
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
            ХОЧЕШЬ СТАТЬ<br />
            ЧАСТЬЮ{" "}
            <span style={{ color: "#000", textDecoration: "underline", textDecorationColor: "rgba(0,0,0,0.3)" }}>
              УЛИЦЫ?
            </span>
          </h2>
          <p style={s.ctaDesc}>
            Заходи в каталог, выбирай снаряжение и выходи на площадку.
          </p>
          <button
            className="btn-cta"
            style={s.ctaBtn}
            onClick={() => navigate("/catalog")}
          >
            В каталог
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

  // HERO
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
  eyebrow: {
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

  // BIO
  bioGrid: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: 72,
    alignItems: "center",
  },
  photoWrap: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  photoRing: {
    width: 240,
    height: 240,
    borderRadius: "50%",
    overflow: "hidden",
    border: "3px solid #ff7a00",
    boxShadow: "0 0 40px rgba(255,122,0,0.2)",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  photoBallDeco: {
    position: "absolute",
    bottom: -12,
    right: 12,
  },
  bioText: { display: "flex", flexDirection: "column", gap: 16 },
  bioEyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "5px",
    color: "#ff7a00",
    margin: 0,
  },
  bioParagraph: {
    color: "rgba(255,255,255,0.45)",
    fontSize: "16px",
    lineHeight: 1.8,
    margin: 0,
  },
  bioStats: {
    display: "flex",
    gap: 40,
    paddingTop: 12,
    borderTop: "1px solid rgba(255,255,255,0.07)",
    marginTop: 8,
  },
  bioStat: { display: "flex", flexDirection: "column", gap: 3 },
  bioStatNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "28px",
    fontWeight: 900,
    color: "#ff7a00",
    letterSpacing: "1px",
  },
  bioStatLabel: {
    color: "rgba(255,255,255,0.3)",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
  },

  // STORY
  storyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 40,
  },
  storyCard: {
    padding: "32px 0",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  storyNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "3px",
    color: "#ff7a00",
    display: "block",
    marginBottom: 14,
  },
  storyLine: { display: "none" },
  storyTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "24px",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: "0 0 12px 0",
    color: "#fff",
  },
  storyText: {
    color: "rgba(255,255,255,0.38)",
    fontSize: "15px",
    lineHeight: 1.7,
    margin: 0,
  },

  // MANIFESTO
  manifestoInner: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: 64,
    alignItems: "center",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    padding: "64px 0",
  },
  manifestoLeft: { flexShrink: 0 },
  manifestoRight: {},
  manifestoEyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "5px",
    color: "#ff7a00",
    marginBottom: 16,
  },
  manifestoText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "17px",
    lineHeight: 1.8,
    margin: 0,
    maxWidth: 560,
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
    margin: "0 0 16px 0",
    lineHeight: 1.0,
  },
  ctaDesc: {
    color: "rgba(0,0,0,0.5)",
    fontSize: "16px",
    margin: "0 0 32px 0",
    fontWeight: 500,
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

  .btn-cta:hover  { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,0,0,0.35); }
  .btn-cta:active { transform: translateY(0); }
`;

export default About;