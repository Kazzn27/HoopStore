import React, { useEffect, useState } from "react";
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

/* ── Contact icons ── */
const PhoneIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const TgIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.75a2.25 2.25 0 0 0 .126 4.237l3.984 1.29 1.545 4.9a1.125 1.125 0 0 0 1.89.454l2.353-2.353 4.032 2.968a2.25 2.25 0 0 0 3.456-1.384l2.754-15.75a2.25 2.25 0 0 0-2.618-2.327z"/>
  </svg>
);
const VkIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h4l2 4 2-4h4v12h-3v-7l-2 4h-2l-2-4v7H3V6z" />
    <path d="M17 6h4c0 0-1 6-4 8" />
  </svg>
);
const InstIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r=".5" fill="#ff7a00"/>
  </svg>
);

const CONTACTS = [
  { icon: <PhoneIcon />, title: "Телефон",  value: "+7 (999) 123-45-67",  sub: "Пн–Пт, 10:00–20:00" },
  { icon: <MailIcon />,  title: "E-mail",   value: "contact@hoopstore.ru", sub: "Ответим в течение часа" },
  { icon: <TgIcon />,   title: "Telegram",  value: "@NumberON27", sub: "Быстрее всего здесь", link: "https://t.me/NumberON27" },
];

const SOCIALS = [
  { icon: <InstIcon />, label: "Instagram", handle: "@hoopstore.ru" },
  { icon: <VkIcon />,   label: "ВКонтакте",  handle: "vk.com/hoopstore" },
  { icon: <TgIcon />,   label: "Telegram",   handle: "@NumberON27", link: "https://t.me/NumberON27" },
];

const Contacts = () => {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.margin = "0";
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1800);
  };

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
            HOOPSTORE / КОНТАКТЫ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            style={s.heroTitle}
          >
            СВЯЗАТЬСЯ<br />С <span style={s.orange}>HOOPSTORE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={s.heroDesc}
          >
            Есть вопросы или предложения?<br />
            Напиши нам — мы на связи 24/7.
          </motion.p>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={s.divider}
      />

      {/* ── CONTACT CARDS + FORM ── */}
      <section style={s.section}>
        <div style={s.container}>
          <div style={s.mainGrid}>

            {/* LEFT — contacts + socials */}
            <div style={s.leftCol}>
              <motion.h2 {...fadeUp} style={{ ...s.sectionTitle, marginBottom: 32 }}>
                Наши контакты
              </motion.h2>

              <div style={s.contactCards}>
                {CONTACTS.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    style={{ ...s.contactCard, cursor: c.link ? "pointer" : "default" }}
                    className="contact-card"
                    onClick={() => c.link && window.open(c.link, "_blank")}
                  >
                    <div style={s.contactIconWrap}>{c.icon}</div>
                    <div>
                      <p style={s.contactTitle}>{c.title}</p>
                      <p style={s.contactValue}>{c.value}</p>
                      <p style={s.contactSub}>{c.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Socials */}
              <div style={s.socialsWrap}>
                <p style={s.socialsLabel}>МЫ В СОЦСЕТЯХ</p>
                <div style={s.socialCards}>
                  {SOCIALS.map((soc, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      style={{ ...s.socialCard, cursor: soc.link ? "pointer" : "pointer" }}
                      className="social-card"
                      onClick={() => soc.link && window.open(soc.link, "_blank")}
                    >
                      <div style={s.socialIconWrap}>{soc.icon}</div>
                      <div>
                        <p style={s.socialLabel}>{soc.label}</p>
                        <p style={s.socialHandle}>{soc.handle}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — form */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={s.formBox}
            >
              {!sent ? (
                <>
                  <h2 style={s.formTitle}>НАПИСАТЬ НАМ</h2>
                  <p style={s.formSub}>Ответим в течение часа в рабочее время.</p>

                  <div style={s.formFields}>
                    {[
                      { name: "name",    placeholder: "Имя",     type: "text" },
                      { name: "email",   placeholder: "E-mail",  type: "email" },
                    ].map(field => (
                      <div key={field.name} style={s.fieldWrap}>
                        <label style={s.fieldLabel}>{field.placeholder}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={form[field.name]}
                          onChange={handleChange}
                          onFocus={() => setFocused(field.name)}
                          onBlur={() => setFocused(null)}
                          style={{
                            ...s.input,
                            borderColor: focused === field.name ? "#ff7a00" : "rgba(255,255,255,0.08)",
                            boxShadow: focused === field.name ? "0 0 0 3px rgba(255,122,0,0.15)" : "none",
                          }}
                        />
                      </div>
                    ))}

                    <div style={s.fieldWrap}>
                      <label style={s.fieldLabel}>Сообщение</label>
                      <textarea
                        name="message"
                        placeholder="Ваш вопрос или предложение..."
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        rows={5}
                        style={{
                          ...s.input,
                          resize: "none",
                          borderColor: focused === "message" ? "#ff7a00" : "rgba(255,255,255,0.08)",
                          boxShadow: focused === "message" ? "0 0 0 3px rgba(255,122,0,0.15)" : "none",
                        }}
                      />
                    </div>

                    <button
                      className="btn-primary"
                      style={{
                        ...s.btnPrimary,
                        opacity: (form.name && form.email && form.message) ? 1 : 0.4,
                        cursor: (form.name && form.email && form.message) ? "pointer" : "default",
                      }}
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? <span className="spin">●</span> : "Отправить"}
                    </button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={s.successBox}
                >
                  <div style={s.successIcon}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="9 12 11 14 15 10"/>
                    </svg>
                  </div>
                  <h3 style={s.successTitle}>СООБЩЕНИЕ ОТПРАВЛЕНО!</h3>
                  <p style={s.successText}>Ответим в течение часа. Пока — загляни в каталог.</p>
                  <button
                    className="btn-primary"
                    style={s.btnPrimary}
                    onClick={() => navigate("/catalog")}
                  >
                    В каталог
                  </button>
                </motion.div>
              )}
            </motion.div>
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
            БУДЬ НА СВЯЗИ<br />С <span style={{ textDecoration: "underline", textDecorationColor: "rgba(0,0,0,0.3)" }}>УЛИЦЕЙ</span>
          </h2>
          <p style={s.ctaDesc}>Подписывайся на соцсети и не пропусти новые коллекции.</p>
          <div style={s.ctaSocials}>
            {SOCIALS.map((soc, i) => (
              <button key={i} className="cta-social-btn" style={s.ctaSocialBtn}
                onClick={() => soc.link && window.open(soc.link, "_blank")}
              >
                {soc.label}
              </button>
            ))}
          </div>
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
    minHeight: "60vh", display: "flex", alignItems: "center",
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
    fontSize: "clamp(52px, 7.5vw, 88px)", fontWeight: 900,
    lineHeight: 1.0, letterSpacing: "2px", textTransform: "uppercase",
    margin: "0 0 24px 0", color: "#fff",
  },
  heroDesc: {
    color: "rgba(255,255,255,0.4)", fontSize: "17px", lineHeight: 1.75, margin: 0,
  },

  divider: { height: 3, background: "rgba(255,122,0,0.55)", transformOrigin: "left" },
  section: { padding: "96px 0", background: "#0a0a0a" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 48px" },
  sectionTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 900,
    textTransform: "uppercase", letterSpacing: "2px", color: "#fff", margin: 0,
  },

  // MAIN GRID
  mainGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start",
  },
  leftCol: { display: "flex", flexDirection: "column", gap: 48 },

  // CONTACT CARDS
  contactCards: { display: "flex", flexDirection: "column", gap: 14 },
  contactCard: {
    display: "flex", alignItems: "center", gap: 20,
    background: "#0f0f0f", border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "14px", padding: "20px 24px",
    transition: "border-color 0.2s",
  },
  contactIconWrap: {
    width: 56, height: 56, borderRadius: "12px",
    background: "rgba(255,122,0,0.08)",
    border: "1px solid rgba(255,122,0,0.2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  contactTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "11px", fontWeight: 700, letterSpacing: "3px",
    color: "rgba(255,255,255,0.3)", textTransform: "uppercase", margin: "0 0 4px 0",
  },
  contactValue: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "18px", fontWeight: 800, color: "#fff",
    textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 2px 0",
  },
  contactSub: {
    color: "rgba(255,255,255,0.25)", fontSize: "12px", margin: 0,
  },

  // SOCIALS
  socialsWrap: {},
  socialsLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "11px", fontWeight: 700, letterSpacing: "4px",
    color: "#ff7a00", marginBottom: 14,
  },
  socialCards: { display: "flex", flexDirection: "column", gap: 10 },
  socialCard: {
    display: "flex", alignItems: "center", gap: 16,
    background: "#0f0f0f", border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "12px", padding: "16px 20px",
    cursor: "pointer", transition: "border-color 0.2s",
  },
  socialIconWrap: {
    width: 44, height: 44, borderRadius: "10px",
    background: "rgba(255,122,0,0.08)",
    border: "1px solid rgba(255,122,0,0.15)",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  socialLabel: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "16px", fontWeight: 800, textTransform: "uppercase",
    letterSpacing: "0.5px", margin: "0 0 2px 0", color: "#fff",
  },
  socialHandle: {
    color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0,
  },

  // FORM
  formBox: {
    background: "#111", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px", padding: "40px",
  },
  formTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "28px", fontWeight: 900, letterSpacing: "3px",
    textTransform: "uppercase", margin: "0 0 6px 0",
  },
  formSub: {
    color: "rgba(255,255,255,0.3)", fontSize: "13px", margin: "0 0 28px 0",
  },
  formFields: { display: "flex", flexDirection: "column", gap: 16 },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 7 },
  fieldLabel: {
    fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
  },
  input: {
    width: "100%", background: "#0a0a0a",
    border: "1.5px solid", borderRadius: "10px",
    padding: "13px 16px", color: "#fff", fontSize: "15px",
    outline: "none", fontFamily: "'Barlow', sans-serif",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  },
  btnPrimary: {
    width: "100%", padding: "14px",
    background: "#ff7a00", border: "none", borderRadius: "10px",
    color: "#000",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "15px", fontWeight: 900, letterSpacing: "3px",
    textTransform: "uppercase",
    transition: "transform 0.15s, box-shadow 0.15s",
    marginTop: 4,
  },

  // SUCCESS
  successBox: {
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: 16, padding: "24px 0", textAlign: "center",
  },
  successIcon: {
    width: 72, height: 72, borderRadius: "50%",
    background: "rgba(255,122,0,0.1)",
    border: "1px solid rgba(255,122,0,0.2)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  successTitle: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "26px", fontWeight: 900, letterSpacing: "2px",
    textTransform: "uppercase", margin: 0,
  },
  successText: {
    color: "rgba(255,255,255,0.35)", fontSize: "14px", margin: "0 0 8px 0",
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
    color: "rgba(0,0,0,0.5)", fontSize: "16px", margin: "0 0 28px 0", fontWeight: 500,
  },
  ctaSocials: { display: "flex", gap: 12 },
  ctaSocialBtn: {
    background: "#000", border: "none", borderRadius: "8px",
    color: "#fff",
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "14px", fontWeight: 900, letterSpacing: "2px", textTransform: "uppercase",
    padding: "12px 28px", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.18); }

  .contact-card:hover { border-color: #ff7a00 !important; }
  .social-card:hover  { border-color: #ff7a00 !important; }

  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(255,122,0,0.38) !important; }
  .btn-primary:active { transform: translateY(0); }

  .cta-social-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.3); }
  .cta-social-btn:active { transform: translateY(0); }

  .spin { display: inline-block; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

export default Contacts;