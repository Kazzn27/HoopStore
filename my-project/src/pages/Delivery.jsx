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

/* ── Step icons ── */
const IconCart = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const IconTruck = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 5v4h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const IconBox = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IconCheck = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const STEPS = [
  {
    num: "01",
    icon: <IconCart />,
    title: "Оформление заказа",
    text: "Добавь товары в корзину и оформи заказ — быстро и удобно прямо на сайте.",
  },
  {
    num: "02",
    icon: <IconTruck />,
    title: "Доставка по стране",
    text: "Используем надёжные курьерские службы для безопасной доставки в любой город.",
  },
  {
    num: "03",
    icon: <IconBox />,
    title: "Упаковка",
    text: "Каждый товар надёжно упакован — мячи, обувь и форма приедут в идеальном состоянии.",
  },
  {
    num: "04",
    icon: <IconCheck />,
    title: "Получение заказа",
    text: "Заказ приходит вовремя — бери снаряжение и сразу выходи на площадку.",
  },
];

const SERVICES = [
  { name: "СДЭК",       time: "2–5 дней",   price: "Бесплатно от 3 000 ₽", tag: "Популярно" },
  { name: "Boxberry",   time: "3–7 дней",   price: "Бесплатно от 5 000 ₽", tag: null },
  { name: "Курьер",     time: "1–2 дня",    price: "от 350 ₽",             tag: "Быстро" },
  { name: "Самовывоз",  time: "Сегодня",    price: "Бесплатно",            tag: "Бесплатно" },
];

const FAQ = [
  { q: "Сколько стоит доставка?",         a: "Бесплатно при заказе от 3 000 ₽ через СДЭК и Boxberry. Курьером — от 350 ₽." },
  { q: "Как долго идёт посылка?",          a: "СДЭК и Boxberry — 2–7 дней в зависимости от региона. Курьер по городу — 1–2 дня." },
  { q: "Можно ли отследить заказ?",        a: "Да. После отправки ты получишь трек-номер на email и в личном кабинете." },
  { q: "Что если товар пришёл с браком?",  a: "Сообщи нам в течение 7 дней — бесплатно заменим или вернём деньги." },
];

const Delivery = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = React.useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.margin = "0";
  }, []);

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroBall}>
          <BallSVG size={500} color="#1c0f00" lines="#3d2000" />
        </div>
        <div style={s.heroInner}>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            style={s.eyebrow}
          >
            HOOPSTORE / ДОСТАВКА
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            style={s.heroTitle}
          >
            ДОСТАВКА<br /><span style={s.orange}>HOOPSTORE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={s.heroDesc}
          >
            Быстро. Надёжно. Прямо на площадку.<br />
            Доставляем снаряжение по всей стране.
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={s.heroStats}
          >
            {[
              ["48 ч",    "Среднее время доставки"],
              ["Бесплатно", "От 3 000 ₽ заказа"],
              ["100+",    "Городов России"],
            ].map(([val, label]) => (
              <div key={label} style={s.heroStat}>
                <span style={s.heroStatVal}>{val}</span>
                <span style={s.heroStatLabel}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={s.divider}
      />

      {/* ── STEPS ── */}
      <section style={s.section}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 52 }}>
            Как мы доставляем
          </motion.h2>

          <div style={s.stepsGrid}>
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                style={s.stepCard}
              >
                {/* connector line */}
                {i < STEPS.length - 1 && <div style={s.connector} />}

                <div style={s.stepIconWrap}>{step.icon}</div>
                <span style={s.stepNum}>{step.num}</span>
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepText}>{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ ...s.section, background: "#111" }}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 40 }}>
            Способы доставки
          </motion.h2>

          <div style={s.servicesGrid}>
            {SERVICES.map((srv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={s.serviceCard}
              >
                {srv.tag && <span style={s.serviceTag}>{srv.tag}</span>}
                <h3 style={s.serviceName}>{srv.name}</h3>
                <div style={s.serviceMeta}>
                  <div style={s.serviceMetaItem}>
                    <span style={s.serviceMetaKey}>Срок</span>
                    <span style={s.serviceMetaVal}>{srv.time}</span>
                  </div>
                  <div style={s.serviceMetaItem}>
                    <span style={s.serviceMetaKey}>Стоимость</span>
                    <span style={{ ...s.serviceMetaVal, color: "#ff7a00" }}>{srv.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={s.section}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 40 }}>
            Частые вопросы
          </motion.h2>

          <div style={s.faqList}>
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={s.faqItem}
              >
                <button
                  className="faq-btn"
                  style={s.faqBtn}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span style={s.faqQ}>{item.q}</span>
                  <span style={{
                    ...s.faqArrow,
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    color: openFaq === i ? "#ff7a00" : "rgba(255,255,255,0.3)",
                  }}>+</span>
                </button>

                {openFaq === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={s.faqA}
                  >
                    {item.a}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.cta}>
        <div style={s.ctaBall}>
          <BallSVG size={380} color="#e06800" lines="#c85e00" />
        </div>
        <motion.div {...fadeUp} style={s.ctaInner}>
          <p style={s.ctaEyebrow}>HOOPSTORE</p>
          <h2 style={s.ctaTitle}>
            ГОТОВ ПОЛУЧИТЬ<br />СВОЁ СНАРЯЖЕНИЕ?
          </h2>
          <p style={s.ctaDesc}>
            Выбери товары, оформляй заказ и получай их прямо на площадку.
          </p>
          <button className="btn-cta" style={s.ctaBtn} onClick={() => navigate("/catalog")}>
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
    width: "100%", minHeight: "100vh",
    background: "#0a0a0a", color: "#fff",
    fontFamily: "'Barlow', sans-serif", overflowX: "hidden",
  },
  orange: { color: "#ff7a00" },

  hero: {
    minHeight: "70vh", display: "flex", alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    position: "relative", overflow: "hidden",
  },
  heroBall: {
    position: "absolute", right: "-60px", top: "50%",
    transform: "translateY(-50%)", pointerEvents: "none", zIndex: 0,
  },
  heroInner: {
    maxWidth: 1200, margin: "0 auto", padding: "0 48px",
    width: "100%", position: "relative", zIndex: 1,
  },
  eyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "12px", fontWeight: 700, letterSpacing: "5px",
    color: "#ff7a00", marginBottom: 20,
  },
  heroTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 900,
    lineHeight: 1.0, letterSpacing: "2px", textTransform: "uppercase",
    margin: "0 0 24px 0", color: "#fff",
  },
  heroDesc: {
    color: "rgba(255,255,255,0.4)", fontSize: "17px", lineHeight: 1.75, margin: "0 0 40px 0",
  },
  heroStats: {
    display: "flex", gap: 40,
    borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 32,
  },
  heroStat: { display: "flex", flexDirection: "column", gap: 4 },
  heroStatVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "28px", fontWeight: 900, color: "#ff7a00", letterSpacing: "1px",
  },
  heroStatLabel: {
    fontSize: "12px", color: "rgba(255,255,255,0.3)",
    letterSpacing: "1px", textTransform: "uppercase",
  },

  divider: { height: 3, background: "rgba(255,122,0,0.55)", transformOrigin: "left" },
  section: { padding: "96px 0", background: "#0a0a0a" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 48px" },
  sectionTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 900,
    textTransform: "uppercase", letterSpacing: "2px", color: "#fff", margin: 0,
  },

  // STEPS
  stepsGrid: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative",
  },
  stepCard: {
    padding: "32px 28px 32px 0",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    position: "relative",
  },
  connector: {
    position: "absolute", top: -1, right: 0,
    width: 1, height: 1,
  },
  stepIconWrap: {
    width: 60, height: 60, borderRadius: "12px",
    background: "rgba(255,122,0,0.08)",
    border: "1px solid rgba(255,122,0,0.2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: 20,
  },
  stepNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "12px", fontWeight: 700, letterSpacing: "3px",
    color: "#ff7a00", display: "block", marginBottom: 10,
  },
  stepTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "20px", fontWeight: 900, textTransform: "uppercase",
    letterSpacing: "0.5px", margin: "0 0 10px 0", color: "#fff",
  },
  stepText: {
    color: "rgba(255,255,255,0.35)", fontSize: "14px", lineHeight: 1.7, margin: 0,
  },

  // SERVICES
  servicesGrid: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
  },
  serviceCard: {
    background: "#0a0a0a",
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "14px", padding: "28px 24px",
    position: "relative", overflow: "hidden",
  },
  serviceTag: {
    display: "inline-block",
    background: "rgba(255,122,0,0.15)",
    border: "1px solid rgba(255,122,0,0.3)",
    borderRadius: "6px", padding: "3px 10px",
    fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px",
    color: "#ff7a00", textTransform: "uppercase",
    marginBottom: 12,
  },
  serviceName: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "24px", fontWeight: 900, textTransform: "uppercase",
    letterSpacing: "1px", margin: "0 0 20px 0", color: "#fff",
  },
  serviceMeta: { display: "flex", flexDirection: "column", gap: 12 },
  serviceMetaItem: { display: "flex", flexDirection: "column", gap: 3 },
  serviceMetaKey: {
    fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
    color: "rgba(255,255,255,0.25)",
  },
  serviceMetaVal: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "16px", fontWeight: 700, color: "#fff",
  },

  // FAQ
  faqList: { display: "flex", flexDirection: "column", gap: 0 },
  faqItem: { borderTop: "1px solid rgba(255,255,255,0.07)" },
  faqBtn: {
    width: "100%", display: "flex", alignItems: "center",
    justifyContent: "space-between", gap: 16,
    padding: "22px 0", background: "none", border: "none",
    cursor: "pointer", textAlign: "left",
  },
  faqQ: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "20px", fontWeight: 800, textTransform: "uppercase",
    letterSpacing: "0.5px", color: "#fff",
  },
  faqArrow: {
    fontSize: "28px", fontWeight: 300, flexShrink: 0,
    transition: "transform 0.2s, color 0.2s", lineHeight: 1,
    display: "block",
  },
  faqA: {
    color: "rgba(255,255,255,0.4)", fontSize: "15px",
    lineHeight: 1.75, margin: "0 0 22px 0", maxWidth: 640,
  },

  // CTA
  cta: { background: "#ff7a00", padding: "96px 0", position: "relative", overflow: "hidden" },
  ctaBall: {
    position: "absolute", right: "-60px", top: "50%",
    transform: "translateY(-50%)", opacity: 0.22, pointerEvents: "none",
  },
  ctaInner: { maxWidth: 1200, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 },
  ctaEyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "13px", fontWeight: 700, letterSpacing: "5px",
    color: "rgba(0,0,0,0.4)", marginBottom: 12,
  },
  ctaTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(38px, 5.5vw, 64px)", fontWeight: 900,
    textTransform: "uppercase", letterSpacing: "2px",
    color: "#000", margin: "0 0 16px 0", lineHeight: 1.0,
  },
  ctaDesc: {
    color: "rgba(0,0,0,0.5)", fontSize: "16px",
    margin: "0 0 32px 0", fontWeight: 500,
  },
  ctaBtn: {
    background: "#000", border: "none", borderRadius: "10px", color: "#fff",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "16px", fontWeight: 900, letterSpacing: "3px", textTransform: "uppercase",
    padding: "15px 48px", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  .faq-btn:hover span:first-child { color: #ff7a00 !important; }

  .btn-cta:hover  { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,0,0,0.35) !important; }
  .btn-cta:active { transform: translateY(0); }
`;

export default Delivery;