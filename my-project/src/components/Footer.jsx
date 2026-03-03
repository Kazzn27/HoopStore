import React from "react";
import { useNavigate } from "react-router-dom";

const BallSVG = () => (
  <svg width="28" height="28" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#ff7a00" />
    <path d="M50 2 Q78 50 50 98" fill="none" stroke="#000" strokeWidth="6" />
    <path d="M50 2 Q22 50 50 98" fill="none" stroke="#000" strokeWidth="6" />
    <path d="M2 50 Q50 74 98 50" fill="none" stroke="#000" strokeWidth="6" />
    <path d="M2 50 Q50 26 98 50" fill="none" stroke="#000" strokeWidth="6" />
    <circle cx="50" cy="50" r="48" fill="none" stroke="#000" strokeWidth="5" />
  </svg>
);

const TgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.75a2.25 2.25 0 0 0 .126 4.237l3.984 1.29 1.545 4.9a1.125 1.125 0 0 0 1.89.454l2.353-2.353 4.032 2.968a2.25 2.25 0 0 0 3.456-1.384l2.754-15.75a2.25 2.25 0 0 0-2.618-2.327z"/>
  </svg>
);
const InstIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/>
  </svg>
);
const VkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h4l2 4 2-4h4v12h-3v-7l-2 4h-2l-2-4v7H3V6z" />
    <path d="M17 6h4c0 0-1 6-4 8" />
  </svg>
);

const NAV = {
  shop: [
    { label: "Мячи",        path: "/balls" },
    { label: "Кроссовки",   path: "/shoes" },
    { label: "Форма",       path: "/apparel" },
    { label: "Аксессуары",  path: "/accessories" },
    { label: "Каталог",     path: "/catalog" },
  ],
  info: [
    { label: "О проекте",   path: "/about" },
    { label: "Доставка",    path: "/delivery" },
    { label: "Оплата",      path: "/payment" },
    { label: "Контакты",    path: "/contacts" },
  ],
};

const SOCIALS = [
  { icon: <InstIcon />, label: "Instagram",  link: null },
  { icon: <VkIcon />,   label: "ВКонтакте",  link: null },
  { icon: <TgIcon />,   label: "Telegram",   link: "https://t.me/NumberON27" },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer style={s.root}>
      <style>{css}</style>

      {/* ── TOP ACCENT ── */}
      <div style={s.topLine} />

      <div style={s.inner}>

        {/* BRAND */}
        <div style={s.brand}>
          <div style={s.logoRow} onClick={() => navigate("/")} className="logo-link">
            <BallSVG />
            <span style={s.logoText}>HoopStore</span>
          </div>

          <p style={s.brandDesc}>
            Всё для баскетбола. Улица, асфальт, игра до последнего броска.
            Мы про культуру, а не про витрины.
          </p>

          <span style={s.brandTagline}>STREETBALL SINCE DAY ONE</span>

          {/* Socials */}
          <div style={s.socialsRow}>
            {SOCIALS.map((soc, i) => (
              <button
                key={i}
                className="social-btn"
                style={s.socialBtn}
                title={soc.label}
                onClick={() => soc.link && window.open(soc.link, "_blank")}
              >
                {soc.icon}
              </button>
            ))}
          </div>
        </div>

        {/* SHOP */}
        <div style={s.col}>
          <p style={s.colTitle}>Магазин</p>
          <ul style={s.navList}>
            {NAV.shop.map(item => (
              <li
                key={item.path}
                className="nav-link"
                style={s.navItem}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* INFO */}
        <div style={s.col}>
          <p style={s.colTitle}>Информация</p>
          <ul style={s.navList}>
            {NAV.info.map(item => (
              <li
                key={item.path}
                className="nav-link"
                style={s.navItem}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div style={s.col}>
          <p style={s.colTitle}>Контакты</p>
          <div style={s.contactList}>
            {[
              { label: "Телефон",   val: "+7 (999) 123-45-67" },
              { label: "E-mail",    val: "contact@hoopstore.ru" },
              { label: "Telegram",  val: "@NumberON27", link: "https://t.me/NumberON27" },
            ].map(c => (
              <div key={c.label} style={s.contactItem}>
                <span style={s.contactKey}>{c.label}</span>
                <span
                  style={{ ...s.contactVal, cursor: c.link ? "pointer" : "default" }}
                  className={c.link ? "contact-link" : ""}
                  onClick={() => c.link && window.open(c.link, "_blank")}
                >
                  {c.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM ── */}
      <div style={s.bottom}>
        <div style={s.bottomInner}>
          <span style={s.copyright}>
            © {new Date().getFullYear()} HoopStore — Street Basketball Culture
          </span>
          <span style={s.bottomRight}>
            Сделано с ❤️ для улицы
          </span>
        </div>
      </div>
    </footer>
  );
};

/* ── STYLES ── */
const s = {
  root: {
    width: "100%",
    background: "#0a0a0a",
    color: "#fff",
    fontFamily: "'Barlow', sans-serif",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    marginTop: 0,
  },

  topLine: {
    height: 3,
    background: "rgba(255,122,0,0.55)",
    width: "100%",
  },

  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "64px 48px 56px",
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr 1fr 1.3fr",
    gap: 48,
  },

  // BRAND
  brand: { display: "flex", flexDirection: "column", gap: 16 },
  logoRow: {
    display: "flex", alignItems: "center", gap: 10,
    cursor: "pointer", width: "fit-content",
  },
  logoText: {
    fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
    fontSize: "22px", fontWeight: 900,
    textTransform: "uppercase", letterSpacing: "2px", color: "#fff",
  },
  brandDesc: {
    color: "rgba(255,255,255,0.35)", fontSize: "13px",
    lineHeight: 1.75, maxWidth: 260, margin: 0,
  },
  brandTagline: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "10px", fontWeight: 700, letterSpacing: "4px",
    color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
  },
  socialsRow: { display: "flex", gap: 8, marginTop: 4 },
  socialBtn: {
    width: 36, height: 36,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", color: "rgba(255,255,255,0.4)",
    transition: "border-color 0.2s, color 0.2s, background 0.2s",
  },

  // COLUMNS
  col: {},
  colTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "11px", fontWeight: 700, letterSpacing: "4px",
    color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
    margin: "0 0 18px 0",
  },
  navList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 },
  navItem: {
    color: "rgba(255,255,255,0.45)", fontSize: "14px",
    cursor: "pointer", transition: "color 0.15s",
    fontWeight: 500,
  },

  // CONTACTS
  contactList: { display: "flex", flexDirection: "column", gap: 14 },
  contactItem: { display: "flex", flexDirection: "column", gap: 3 },
  contactKey: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "10px", fontWeight: 700, letterSpacing: "3px",
    color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
  },
  contactVal: {
    color: "rgba(255,255,255,0.55)", fontSize: "14px", fontWeight: 500,
    transition: "color 0.15s",
  },

  // BOTTOM
  bottom: {
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  bottomInner: {
    maxWidth: 1200, margin: "0 auto", padding: "20px 48px",
    display: "flex", justifyContent: "space-between", alignItems: "center",
  },
  copyright: {
    color: "rgba(255,255,255,0.2)", fontSize: "12px", letterSpacing: "0.5px",
  },
  bottomRight: {
    color: "rgba(255,255,255,0.15)", fontSize: "12px",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  .logo-link:hover span { color: #ff7a00 !important; }
  .nav-link:hover { color: #ff7a00 !important; }
  .contact-link:hover { color: #ff7a00 !important; }
  .social-btn:hover {
    border-color: #ff7a00 !important;
    color: #ff7a00 !important;
    background: rgba(255,122,0,0.08) !important;
  }
`;

export default Footer;