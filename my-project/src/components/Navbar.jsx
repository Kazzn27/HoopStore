import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BallSVG = () => (
  <svg width="26" height="26" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#ff7a00" />
    <path d="M50 2 Q78 50 50 98" fill="none" stroke="#000" strokeWidth="6" />
    <path d="M50 2 Q22 50 50 98" fill="none" stroke="#000" strokeWidth="6" />
    <path d="M2 50 Q50 74 98 50" fill="none" stroke="#000" strokeWidth="6" />
    <path d="M2 50 Q50 26 98 50" fill="none" stroke="#000" strokeWidth="6" />
    <circle cx="50" cy="50" r="48" fill="none" stroke="#000" strokeWidth="5" />
  </svg>
);

const SearchIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
    stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CartIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
    stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const LINKS = [
  { label: "Главная",   path: "/" },
  { label: "Магазин",   path: "/catalog" },
  { label: "Мячи",      path: "/balls" },
  { label: "Кроссовки", path: "/shoes" },
  { label: "Форма",     path: "/apparel" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <style>{css}</style>

      <nav style={s.nav}>

        {/* Logo */}
        <div style={s.logo} onClick={() => navigate("/")}>
          <BallSVG />
          <span style={s.logoText}>HoopStore</span>
        </div>

        {/* Links */}
        <ul style={s.links}>
          {LINKS.map(({ label, path }) => {
            const active = location.pathname === path;
            return (
              <li
                key={path}
                onClick={() => navigate(path)}
                style={s.linkItem}
                className="nav-link"
              >
                <span style={{
                  ...s.linkText,
                  color: active ? "#ff7a00" : "rgba(255,255,255,0.6)",
                }}>
                  {label}
                </span>
                {active && <div style={s.activeDot} />}
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div style={s.actions}>
          <button className="icon-btn" style={s.iconBtn} aria-label="Поиск">
            <SearchIcon />
          </button>
          <button
            className="icon-btn"
            style={s.iconBtn}
            onClick={() => navigate("/cart")}
            aria-label="Корзина"
          >
            <CartIcon />
          </button>
          <button
            className="btn-login"
            style={s.btnLogin}
            onClick={() => navigate("/login")}
          >
            Войти
          </button>
        </div>
      </nav>
    </>
  );
};

const s = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 48px",
    height: "64px",
    background: "#0a0a0a",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    fontFamily: "'Barlow', sans-serif",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    userSelect: "none",
  },
  logoText: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "0.4px",
  },

  links: {
    display: "flex",
    gap: 6,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  linkItem: {
    position: "relative",
    padding: "6px 14px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
  },
  linkText: {
    fontSize: "15px",
    fontWeight: 500,
    transition: "color 0.2s",
    whiteSpace: "nowrap",
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: "#ff7a00",
    position: "absolute",
    bottom: -1,
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
  btnLogin: {
    background: "#ff7a00",
    border: "none",
    borderRadius: "8px",
    color: "#000",
    fontFamily: "'Barlow', sans-serif",
    fontSize: "14px",
    fontWeight: 800,
    letterSpacing: "0.5px",
    padding: "9px 22px",
    cursor: "pointer",
    marginLeft: 6,
    transition: "transform 0.15s, box-shadow 0.15s",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@700;800;900&display=swap');

  .nav-link:hover span { color: #fff !important; }

  .icon-btn:hover { background: rgba(255,255,255,0.07) !important; }
  .icon-btn:hover svg { stroke: rgba(255,255,255,0.9) !important; }

  .btn-login:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(255,122,0,0.38);
  }
  .btn-login:active { transform: translateY(0); }
`;

export default Navbar;