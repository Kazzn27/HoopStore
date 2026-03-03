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

const CardIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const CashIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2"/>
    <circle cx="12" cy="12" r="3"/>
    <path d="M6 12h.01M18 12h.01"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);
const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const METHODS = [
  {
    icon: <CardIcon />,
    num: "01",
    title: "Картой",
    sub: "Visa / Mastercard / МИР",
    text: "Безопасная оплата банковской картой. Данные защищены SSL-шифрованием. Списание мгновенное.",
    badges: ["Visa", "MC", "МИР"],
  },
  {
    icon: <PhoneIcon />,
    num: "02",
    title: "Онлайн-банк",
    sub: "Т-Банк / СберПай / СБП",
    text: "Оплата через приложение банка или систему быстрых платежей. Без комиссии, мгновенно.",
    badges: ["Т-Банк", "СберПай", "СБП"],
  },
  {
    icon: <CashIcon />,
    num: "03",
    title: "Наложенный платёж",
    sub: "Оплата при получении",
    text: "Оплачивай заказ при получении в руки. Удобно — сначала проверяешь товар, потом платишь.",
    badges: ["СДЭК", "Boxberry"],
  },
];

const SECURITY = [
  { icon: <ShieldIcon />, title: "SSL-шифрование",   text: "Все данные карты передаются по защищённому каналу." },
  { icon: <LockIcon />,   title: "Без хранения",     text: "Мы не храним данные твоей карты на наших серверах." },
  { icon: <CardIcon />,   title: "3D-Secure",        text: "Дополнительная верификация оплаты через банк." },
];

const Payment = () => {
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
        <div style={s.heroBall}>
          <BallSVG size={500} color="#1c0f00" lines="#3d2000" />
        </div>
        <div style={s.heroInner}>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            style={s.eyebrow}
          >
            HOOPSTORE / ОПЛАТА
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            style={s.heroTitle}
          >
            ОПЛАТА<br /><span style={s.orange}>HOOPSTORE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={s.heroDesc}
          >
            Выбери удобный способ оплаты и получай снаряжение<br />
            без задержек. Всё просто и безопасно.
          </motion.p>

          {/* Security badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={s.heroBadge}
          >
            <LockIcon />
            <span style={s.heroBadgeText}>Защищённая оплата · SSL · 3D-Secure</span>
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={s.divider}
      />

      {/* ── PAYMENT METHODS ── */}
      <section style={s.section}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 48 }}>
            Способы оплаты
          </motion.h2>

          <div style={s.methodsGrid}>
            {METHODS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.13 }}
                style={s.methodCard}
                className="method-card"
              >
                <div style={s.methodTop}>
                  <div style={s.methodIconWrap}>{m.icon}</div>
                  <span style={s.methodNum}>{m.num}</span>
                </div>

                <div style={s.methodInfo}>
                  <h3 style={s.methodTitle}>{m.title}</h3>
                  <p style={s.methodSub}>{m.sub}</p>
                  <p style={s.methodText}>{m.text}</p>
                </div>

                <div style={s.methodBadges}>
                  {m.badges.map(b => (
                    <span key={b} style={s.badge}>{b}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section style={{ ...s.section, background: "#111" }}>
        <div style={s.container}>
          <div style={s.securityGrid}>
            <motion.div {...fadeUp}>
              <p style={s.secEyebrow}>БЕЗОПАСНОСТЬ</p>
              <h2 style={s.sectionTitle}>
                Твои данные<br />под защитой
              </h2>
            </motion.div>

            <div style={s.secCards}>
              {SECURITY.map((sec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  style={s.secCard}
                >
                  <div style={s.secIconWrap}>{sec.icon}</div>
                  <div>
                    <h3 style={s.secTitle}>{sec.title}</h3>
                    <p style={s.secText}>{sec.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO PAY ── */}
      <section style={s.section}>
        <div style={s.container}>
          <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 48 }}>
            Как оплатить заказ
          </motion.h2>

          <div style={s.stepsGrid}>
            {[
              { num: "01", title: "Выбери товары",   text: "Добавь нужное снаряжение в корзину." },
              { num: "02", title: "Оформи заказ",    text: "Укажи адрес доставки и контакты." },
              { num: "03", title: "Выбери оплату",   text: "Карта, онлайн-банк или наложенный платёж." },
              { num: "04", title: "Получи заказ",    text: "Снаряжение придёт — и ты на площадке." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={s.stepCard}
              >
                <span style={s.stepNum}>{step.num}</span>
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepText}>{step.text}</p>
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
            ОПЛАЧИВАЙ И ВЫХОДИ<br />НА ПЛОЩАДКУ
          </h2>
          <p style={s.ctaDesc}>Выбери снаряжение и получи его максимально быстро.</p>
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
    minHeight: "65vh", display: "flex", alignItems: "center",
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
    color: "rgba(255,255,255,0.4)", fontSize: "17px", lineHeight: 1.75, margin: "0 0 28px 0",
  },
  heroBadge: {
    display: "inline-flex", alignItems: "center", gap: 10,
    background: "rgba(255,122,0,0.08)",
    border: "1px solid rgba(255,122,0,0.2)",
    borderRadius: "8px", padding: "10px 18px",
  },
  heroBadgeText: {
    color: "rgba(255,255,255,0.5)", fontSize: "13px", letterSpacing: "0.5px",
  },

  divider: { height: 3, background: "rgba(255,122,0,0.55)", transformOrigin: "left" },
  section: { padding: "96px 0", background: "#0a0a0a" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 48px" },
  sectionTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 900,
    textTransform: "uppercase", letterSpacing: "2px", color: "#fff", margin: 0,
  },

  // METHODS
  methodsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  methodCard: {
    background: "#0f0f0f",
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "16px", padding: "32px 28px",
    display: "flex", flexDirection: "column", gap: 20,
    transition: "border-color 0.2s",
  },
  methodTop: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
  },
  methodIconWrap: {
    width: 60, height: 60, borderRadius: "14px",
    background: "rgba(255,122,0,0.08)",
    border: "1px solid rgba(255,122,0,0.2)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  methodNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "13px", fontWeight: 700, letterSpacing: "3px",
    color: "rgba(255,255,255,0.2)",
  },
  methodInfo: { flex: 1 },
  methodTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "26px", fontWeight: 900, textTransform: "uppercase",
    letterSpacing: "1px", margin: "0 0 4px 0", color: "#fff",
  },
  methodSub: {
    color: "#ff7a00", fontSize: "12px", fontWeight: 600,
    letterSpacing: "0.5px", margin: "0 0 12px 0",
  },
  methodText: {
    color: "rgba(255,255,255,0.35)", fontSize: "14px", lineHeight: 1.7, margin: 0,
  },
  methodBadges: {
    display: "flex", flexWrap: "wrap", gap: 8,
    borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16,
  },
  badge: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "6px", padding: "4px 12px",
    fontSize: "11px", fontWeight: 700, letterSpacing: "1px",
    color: "rgba(255,255,255,0.45)",
  },

  // SECURITY
  securityGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center",
  },
  secEyebrow: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "12px", fontWeight: 700, letterSpacing: "5px",
    color: "#ff7a00", marginBottom: 16,
  },
  secCards: { display: "flex", flexDirection: "column", gap: 16 },
  secCard: {
    display: "flex", alignItems: "center", gap: 20,
    background: "#0a0a0a",
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "12px", padding: "20px 24px",
  },
  secIconWrap: {
    width: 48, height: 48, borderRadius: "10px",
    background: "rgba(255,122,0,0.08)",
    border: "1px solid rgba(255,122,0,0.18)",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  secTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "17px", fontWeight: 800, textTransform: "uppercase",
    letterSpacing: "0.5px", margin: "0 0 4px 0", color: "#fff",
  },
  secText: {
    color: "rgba(255,255,255,0.3)", fontSize: "13px", lineHeight: 1.5, margin: 0,
  },

  // HOW TO PAY STEPS
  stepsGrid: {
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
  },
  stepCard: {
    padding: "32px 28px 32px 0",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  stepNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "12px", fontWeight: 700, letterSpacing: "3px",
    color: "#ff7a00", display: "block", marginBottom: 14,
  },
  stepTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "20px", fontWeight: 900, textTransform: "uppercase",
    letterSpacing: "0.5px", margin: "0 0 10px 0", color: "#fff",
  },
  stepText: {
    color: "rgba(255,255,255,0.35)", fontSize: "14px", lineHeight: 1.7, margin: 0,
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
    fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900,
    textTransform: "uppercase", letterSpacing: "2px",
    color: "#000", margin: "0 0 16px 0", lineHeight: 1.0,
  },
  ctaDesc: {
    color: "rgba(0,0,0,0.5)", fontSize: "16px", margin: "0 0 32px 0", fontWeight: 500,
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

  .method-card:hover { border-color: #ff7a00 !important; }
  .btn-cta:hover  { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,0,0,0.35) !important; }
  .btn-cta:active { transform: translateY(0); }
`;

export default Payment;